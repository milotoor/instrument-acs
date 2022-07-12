import fs from 'fs';
import toml from 'toml';

import { getSectionStructure } from './acs_data';

export type TaskLetter = 'A' | 'B' | 'C' | 'D' | 'E';

namespace TaskTOML {
  type Meta = {
    letter: TaskLetter;
    name: string;
    objective: string;
    references: string[];
  };

  type ItemNumber = 1 | 2 | 3;
  type DataFactory<Letter extends string> = Record<`${Letter}${ItemNumber}`, string>;
  type Knowledge = DataFactory<'k'>;
  type RiskManagement = DataFactory<'r'>;
  type Skills = DataFactory<'s'>;

  export interface Json {
    meta: Meta;
    knowledge: Knowledge;
    risk_management: RiskManagement;
    skills: Skills;
  }
}

export interface TaskJson {
  json: TaskTOML.Json;
  letter: string;
  section: number;
}

export class Task {
  section: number;
  letter: string;
  json: TaskTOML.Json;

  constructor(section: number, letter: string) {
    this.section = section;
    this.letter = letter;

    // Load the .toml file
    const sections = getSectionStructure();
    const task = sections[section - 1].tasks.find((t) => t.letter === letter);
    if (!task) throw Error(`Invalid task identifiers (section: ${section}, letter: "${letter}")`);
    const fileContent = fs.readFileSync(task.path).toString();
    this.json = toml.parse(fileContent);
    console.log(this.json);
  }

  static fromNames(sectionName: string, taskName: string) {
    const sections = getSectionStructure();
    const section = sections.find((s) => [s.name, s.uriComponent].includes(sectionName));
    if (!section) throw Error(`Invalid section identifier ("${sectionName}")`);

    const task = section.tasks.find((t) => [t.name, t.uriComponent].includes(taskName));
    if (!task) throw Error(`Invalid task identifier ("${taskName}")`);

    return new Task(section.number, task.letter);
  }

  toJSON(): TaskJson {
    return {
      section: this.section,
      letter: this.letter,
      json: this.json,
    };
  }
}
