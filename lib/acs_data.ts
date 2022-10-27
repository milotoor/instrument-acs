import { NextPage } from 'next';

import ACSSection = ACS.Section;
import ACSTask = ACS.Task;
import Raw = ACS.Raw;

export namespace ACS {
  export namespace Item {
    type Content = string | { general: string; specific: string[] };
    export type ID = string;
    export type List = Record<string, Content>;
  }

  export type Image = { width: number; height: number; type?: string };
  export type Images = Record<string, Image>;
  export type LastUpdate = [string, string];
  export type Page = NextPage<TopLevelProps>;
  export type TopLevelProps = { rawData: ACS.Raw };

  export namespace Section {
    export type Heading = 'Knowledge' | 'Risk Management' | 'Skills';
    export type Number = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    export type Numeral = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII';
  }

  export interface Section extends Raw.Section {
    name: string;
    uri: string;
  }

  export namespace Task {
    export type Letter = 'A' | 'B' | 'C' | 'D' | 'E';
    export type Meta = {
      letter: Letter;
      name: string;
      objective: string;
      references: string[];
    };
  }

  export interface Task extends Raw.Task {
    name: string;
    uri: string;
  }

  // Wrapper around the image data and raw ACS data
  export namespace Raw {
    export type Section = {
      updated: LastUpdate;
      name: string;
      number: Section.Number;
      tasks: Task[];
    };

    export type Task = {
      updated: LastUpdate;
      meta: Task.Meta;
      knowledge: Item.List;
      risk_management: Item.List;
      skills: Item.List;
    };
  }

  export interface Raw {
    images: Images;
    sections: Raw.Section[];
  }
}

export class ACS {
  images: ACS.Images;
  sections: Section[];

  constructor(data: ACS.Raw) {
    this.images = data.images;
    this.sections = data.sections.map((s) => new Section(s));
  }

  getSection(num: ACSSection.Number): Section {
    return this.sections.find(({ number }) => number == num)!;
  }

  getTask(num: ACSSection.Number, letter: ACSTask.Letter): Task {
    const section = this.getSection(num);
    return section.getTask(letter);
  }
}

interface Section extends ACSSection {}
class Section {
  tasks: Task[];

  constructor(raw: Raw.Section) {
    this.updated = raw.updated;
    this.name = raw.name;
    this.number = raw.number;
    this.tasks = raw.tasks.map((t) => new Task(t, this));
  }

  /** Returns the section's Roman numeral */
  get numeral(): ACSSection.Numeral {
    const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'] as const;
    return numerals[this.number - 1];
  }

  get uri() {
    return `/${this.number}-${sectionURIs[this.number]}`;
  }

  getTask(letter: ACSTask.Letter) {
    const task = this.tasks.find((t) => t.meta.letter === letter);
    if (task) return task;
    throw `Invalid task letter ${letter} for section ${this.number}`;
  }
}

interface Task extends ACSTask {}
class Task {
  section: Section;

  constructor(raw: Raw.Task, section: Section) {
    this.updated = raw.updated;
    this.meta = raw.meta;
    this.knowledge = raw.knowledge;
    this.risk_management = raw.risk_management;
    this.section = section;
    this.skills = raw.skills;
  }

  get letter() {
    return this.meta.letter;
  }

  get name() {
    return this.meta.name;
  }

  get uri() {
    const { letter, section } = this;
    return section.uri + `/${letter}-${taskURIs[section.number][letter]}`;
  }
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
} as Record<ACSSection.Number, Record<ACSTask.Letter, string>>;
