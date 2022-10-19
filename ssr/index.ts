import dirTree from 'directory-tree';
import fs from 'fs';
import imageSize from 'image-size';
import path from 'path';
import toml from 'toml';

import { ACS } from '../lib';
import { getLastUpdates } from './last_updates';

export function getStructure(pathToRoot: string = '.') {
  return {
    images: getImageData(pathToRoot),
    sections: getSectionStructure(pathToRoot),
  };
}

/** Loads the ACS .toml files, returning an array of "section" data */
function getSectionStructure(pathToRoot: string = '.'): ACS.Raw.Section[] {
  const tree = dirTree(path.join(pathToRoot, 'data/acs'));
  const areas = tree!.children!.filter((child) => child.name.match(/\d\./));
  const updates = getLastUpdates(pathToRoot);

  return areas.map(({ children, name }) => {
    const sectionName = name.replace(/\d\. /, '');
    const number = parseInt(name.match(/([1-8])/)![1]) as ACS.Section.Number;
    const { updated, tasks } = updates[number];

    return {
      updated,
      name: sectionName,
      number,
      tasks: children!.map(({ path }) => {
        const fileContent = fs.readFileSync(path).toString();
        const taskData = toml.parse(fileContent) as Omit<ACS.Raw.Task, 'updated'>;
        return { ...taskData, updated: tasks[taskData.meta.letter] };
      }),
    };
  });
}

function getImageData(pathToRoot: string = '.'): ACS.Images {
  const tree = dirTree(path.join(pathToRoot, 'public/img'), { extensions: /(webp|gif)/ });
  const sections = tree?.children?.filter((child) => child.name.match(/^\d$/)) ?? [];
  return Object.fromEntries(
    sections.flatMap((section) => {
      return (section.children ?? []).map((img) => {
        const { name, path } = img;
        const nameNoSuffix = name.slice(0, name.lastIndexOf('.'));
        return [`${section.name}/${nameNoSuffix}`, imageSize(path) as ACS.Image];
      });
    })
  );
}

export const getStaticPropsFn = () => ({ props: { rawData: getStructure() } });