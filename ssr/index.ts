import { execSync } from 'child_process';
import dirTree from 'directory-tree';
import fs from 'fs';
import imageSize from 'image-size';
import { DateTime } from 'luxon';
import path from 'path';
import toml from 'toml';

import { ACS } from '../lib';

export function getStructure(pathToRoot: string = '.') {
  return {
    images: getImageData(pathToRoot),
    sections: getSectionStructure(pathToRoot),
  };
}

function getLastUpdated(path: string) {
  const dateStr = String(execSync(`git log -1 --format=%cD "${path}"`));
  const date = DateTime.fromRFC2822(dateStr);
  return date.toLocaleString(DateTime.DATETIME_FULL);
}

/** Loads the ACS .toml files, returning an array of "section" data */
function getSectionStructure(pathToRoot: string = '.'): ACS.Raw.Section[] {
  const tree = dirTree(path.join(pathToRoot, 'data/acs'));
  const areas = tree!.children!.filter((child) => child.name.match(/\d\./));

  return areas.map(({ name, children, path }) => {
    const sectionName = name.replace(/\d\. /, '');
    const number = parseInt(name.match(/([1-8])/)![1]) as ACS.Section.Number;

    return {
      lastUpdated: '',
      name: sectionName,
      number,
      tasks: children!.map(({ path }) => {
        const fileContent = fs.readFileSync(path).toString();
        return { ...toml.parse(fileContent), lastUpdated: '' };
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
