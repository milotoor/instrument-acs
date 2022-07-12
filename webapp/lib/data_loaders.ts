import dirTree from 'directory-tree';
import toml from 'toml';

import { Task, TaskLetter, TaskTOML } from './task';

export interface TaskStructure {
  letter: TaskLetter;
  name: string;
  path: string;
  uri: string;
  uriComponent: string;
}

export interface Section {
  name: string;
  number: number;
  tasks: TaskStructure[];
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

export function getTaskFromNames(sectionName: string, taskName: string) {
  const sections = getSectionStructure();
  const section = sections.find((s) => [s.name, s.uriComponent].includes(sectionName));
  if (!section) throw Error(`Invalid section identifier ("${sectionName}")`);

  const task = section.tasks.find((t) => [t.name, t.uriComponent].includes(taskName));
  if (!task) throw Error(`Invalid task identifier ("${taskName}")`);

  return getTaskFromSectionLetter(section.number, task.letter);
}

export function getTaskFromSectionLetter(section: number, letter: string) {
  const fs = require('fs');

  // Load the .toml file
  const sections = getSectionStructure();
  const task = sections[section - 1].tasks.find((t) => t.letter === letter);
  if (!task) throw Error(`Invalid task identifiers (section: ${section}, letter: "${letter}")`);
  const fileContent = fs.readFileSync(task.path).toString();
  const json: TaskTOML.JSON = toml.parse(fileContent);

  // Load the notes
  const notesPath = task.path.replace('/areas_of_operation', '/areas_of_operation/notes');
  let notes;
  try {
    const notesContent = fs.readFileSync(notesPath).toString();
    notes = toml.parse(notesContent) as TaskTOML.Notes;
  } catch (e: unknown) {
    notes = null;
  }

  return new Task({ section, letter, json, notes });
}
