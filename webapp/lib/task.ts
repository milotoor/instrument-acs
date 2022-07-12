import fs from 'fs';
import toml from 'toml';

import { getSectionStructure } from './acs_data';

export type TaskLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export namespace TaskTOML {
  type Section = { numeral: string; name: string };
  type Meta = {
    letter: TaskLetter;
    name: string;
    objective: string;
    references: string[];
    section: Section;
  };

  type ItemNumber = 1 | 2 | 3;
  export type DataList = Record<ItemNumber, string>;

  export interface JSON {
    meta: Meta;
    knowledge: DataList;
    risk_management: DataList;
    skills: DataList;
  }
}

export interface TaskJSON {
  json: TaskTOML.JSON;
  letter: string;
  section: number;
}

export class Task {
  section: number;
  letter: string;
  json: TaskTOML.JSON;

  constructor(section: number, letter: string) {
    this.section = section;
    this.letter = letter;

    // Load the .toml file
    const sections = getSectionStructure();
    const task = sections[section - 1].tasks.find((t) => t.letter === letter);
    if (!task) throw Error(`Invalid task identifiers (section: ${section}, letter: "${letter}")`);
    const fileContent = fs.readFileSync(task.path).toString();
    this.json = toml.parse(fileContent);
  }

  static fromNames(sectionName: string, taskName: string) {
    const sections = getSectionStructure();
    const section = sections.find((s) => [s.name, s.uriComponent].includes(sectionName));
    if (!section) throw Error(`Invalid section identifier ("${sectionName}")`);

    const task = section.tasks.find((t) => [t.name, t.uriComponent].includes(taskName));
    if (!task) throw Error(`Invalid task identifier ("${taskName}")`);

    return new Task(section.number, task.letter);
  }

  toJSON(): TaskJSON {
    return {
      section: this.section,
      letter: this.letter,
      json: this.json,
    };
  }
}
