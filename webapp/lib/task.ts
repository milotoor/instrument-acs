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

  constructor(task: TaskJSON) {
    this.section = task.section;
    this.letter = task.letter;
    this.json = task.json;
  }

  toJSON(): TaskJSON {
    return {
      section: this.section,
      letter: this.letter,
      json: this.json,
    };
  }
}
