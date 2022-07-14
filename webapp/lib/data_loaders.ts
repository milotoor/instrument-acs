import dirTree from 'directory-tree';
import path from 'path';
import toml from 'toml';

import { Section, Task } from './task';

export interface TaskStructure {
  letter: Task.Letter;
  name: string;
  path: string;
  uri: string;
}

export interface Section {
  name: string;
  number: Section.Number;
  tasks: TaskStructure[];
  uri: string;
}

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

export function getSectionStructure(pathToRoot: string = '..'): Section[] {
  const tree = dirTree(path.join(pathToRoot, 'areas_of_operation'));
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
          uri: makeURI(sectionURIComponent, `${letter}-${taskURIs[number][letter]}`),
        };
      }),
    };
  });
}

export function getTaskFromSectionLetter(section: Section.Number, letter: Task.Letter): Task {
  const fs = require('fs');

  // Load the .toml file
  const sections = getSectionStructure();
  const task = sections[section - 1].tasks.find((t) => t.letter === letter);
  if (!task) throw Error(`Invalid task identifiers (section: ${section}, letter: "${letter}")`);
  const fileContent = fs.readFileSync(task.path).toString();
  return toml.parse(fileContent);
}
