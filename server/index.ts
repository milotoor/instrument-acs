import { execSync } from 'child_process';
import dirTree from 'directory-tree';
import imageSize from 'image-size';
import { DateTime } from 'luxon';
import path from 'path';
import toml from 'toml';

import { Section, Structure, Task } from '../lib/types';

const sectionURIs = {
  1: 'preflight-preparation',
  2: 'preflight-procedures',
  3: 'atc-clearances-and-procedures',
  4: 'instrument-flight',
  5: 'navigation-systems',
  6: 'approach-procedures',
  7: 'emergencies',
  8: 'postflight-procedures',
};

const taskURIs = {
  1: { A: 'pilot-qualifications', B: 'weather-information', C: 'xc-flight-planning' },
  2: { A: 'ifr-systems', B: 'instruments', C: 'flight-deck-check' },
  3: { A: 'compliance', B: 'holding' },
  4: { A: 'instrument-flight', B: 'unusual-attitudes' },
  5: { A: 'intercepting-and-tracking', B: 'departure-enroute-arrival' },
  6: { A: 'nonprecision', B: 'precision', C: 'missed', D: 'circling', E: 'landing' },
  7: { A: 'loss-of-comm', B: 'one-engine-inop', C: 'one-engine-inop-approaches', D: 'loss-of-pfd' },
  8: { A: 'checking-equipment' },
} as Record<Section.Number, Record<Task.Letter, string>>;

export function getStructure(pathToRoot: string = '.'): Structure.AppData {
  return {
    images: getImageData(pathToRoot),
    sections: getSectionStructure(pathToRoot),
    lastUpdated: getLastUpdated(),
  };
}

function getLastUpdated() {
  const dateStr = String(execSync('git log -1 --format=%cD'));
  const date = DateTime.fromRFC2822(dateStr);
  return date.toLocaleString(DateTime.DATETIME_FULL);
}

function getSectionStructure(pathToRoot: string = '.'): Structure.Section[] {
  const tree = dirTree(path.join(pathToRoot, 'data/acs'));
  const areas = tree?.children?.filter((child) => child.name.match(/\d\./));
  const makeURI = (...components: string[]) => '/' + components.join('/');

  return areas!.map(({ name, children }) => {
    const sectionName = name.replace(/\d\. /, '');
    const number = parseInt(name.match(/([1-8])/)![1]) as Section.Number;
    const sectionURIComponent = `${number}-${sectionURIs[number]}`;

    return {
      name: sectionName,
      number,
      uri: makeURI(sectionURIComponent),
      tasks: children!.map(({ name, path }) => {
        const letter = name.match(/Task ([A-E])/)![1] as Task.Letter;
        return {
          letter,
          name: name.replace(/Task .\. /, '').replace('.toml', ''),
          path,
          section: number,
          uri: makeURI(sectionURIComponent, `${letter}-${taskURIs[number][letter]}`),
        };
      }),
    };
  });
}

function getTaskFromSectionLetter(section: Section.Number, letter: Task.Letter): Task {
  const fs = require('fs');

  // Load the .toml file
  const sections = getSectionStructure();
  const task = sections[section - 1].tasks.find((t) => t.letter === letter);
  if (!task) throw Error(`Invalid task identifiers (section: ${section}, letter: "${letter}")`);
  const fileContent = fs.readFileSync(task.path).toString();
  return toml.parse(fileContent);
}

function getImageData(pathToRoot: string = '.'): Structure.Images {
  const tree = dirTree(path.join(pathToRoot, 'public/img'), { extensions: /(webp|gif)/ });
  const sections = tree?.children?.filter((child) => child.name.match(/^\d$/)) ?? [];
  return Object.fromEntries(
    sections.flatMap((section) => {
      return (section.children ?? []).map((img) => {
        const { name, path } = img;
        const nameNoSuffix = name.slice(0, name.lastIndexOf('.'));
        return [`${section.name}/${nameNoSuffix}`, imageSize(path) as Structure.Image];
      });
    })
  );
}

export const getStaticPropFns = {
  structure: () => ({ props: { structure: getStructure() } }),
  task: (section: Section.Number, letter: Task.Letter) => () => ({
    props: { structure: getStructure(), task: getTaskFromSectionLetter(section, letter) },
  }),
};
