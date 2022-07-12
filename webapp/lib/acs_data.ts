import dirTree from 'directory-tree';
import fs from 'fs';
import toml from 'toml';

import { TaskLetter } from './task';

export interface Task {
  letter: TaskLetter;
  name: string;
  path: string;
  uri: string;
  uriComponent: string;
}

export interface Section {
  name: string;
  number: number;
  tasks: Task[];
  uri: string;
  uriComponent: string;
}

export function getSectionStructure(): Section[] {
  const tree = dirTree('../areas_of_operation');
  const areas = tree?.children?.filter((child) => child.name.match(/\d\./));
  return areas!.map(({ name, children }) => {
    const strippedSectionName = name.replace(/\d\. /, '');
    return {
      name: strippedSectionName,
      number: parseInt(name.match(/([1-8])/)![1]),
      uri: makeURI(strippedSectionName),
      uriComponent: encodeURIComponentACS(strippedSectionName),
      tasks: children!.map(({ name, path }) => {
        const strippedTaskName = name.replace(/Task .\. /, '').replace('.toml', '');
        return {
          letter: name.match(/Task ([A-E])/)![1] as TaskLetter,
          name: strippedTaskName,
          path,
          uri: makeURI(strippedSectionName, strippedTaskName),
          uriComponent: encodeURIComponentACS(strippedTaskName),
        };
      }),
    };
  });
}

function encodeURIComponentACS(component: string) {
  return component.toLowerCase().replaceAll(/\s+/g, '-');
}

function makeURI(...components: string[]) {
  const encoded = components.map(encodeURIComponentACS);
  return '/' + encoded.join('/');
}
