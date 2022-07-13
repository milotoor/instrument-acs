export type TaskLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export type GroupHeading = 'Knowledge' | 'Risk Management' | 'Skills';
export type NoteID = [GroupHeading, string];

export namespace TaskTOML {
  type Section = { numeral: string; name: string };
  type Meta = {
    letter: TaskLetter;
    name: string;
    objective: string;
    references: string[];
    section: Section;
  };

  type Datum = string | { general: string; specific: string[] };
  export type DataList = Record<string, Datum>;
  export type NoteList = Record<string, string>;

  export interface JSON {
    meta: Meta;
    knowledge: DataList;
    risk_management: DataList;
    skills: DataList;
  }

  export interface Notes {
    knowledge: NoteList;
    risk_management: NoteList;
    skills: NoteList;
  }
}

export interface TaskJSON {
  json: TaskTOML.JSON;
  letter: string;
  notes: TaskTOML.Notes | null;
  section: number;
}

export class Task {
  section: number;
  letter: string;
  json: TaskTOML.JSON;
  notes: TaskTOML.Notes | null;

  constructor(task: TaskJSON) {
    this.json = task.json;
    this.letter = task.letter;
    this.notes = task.notes;
    this.section = task.section;
  }

  getGroup(heading: GroupHeading) {
    const { json, notes } = this;
    const getGroup = (h: keyof TaskTOML.Notes) => [json[h], notes && notes[h]] as const;

    switch (heading) {
      case 'Knowledge':
        return getGroup('knowledge');
      case 'Risk Management':
        return getGroup('risk_management');
      case 'Skills':
        return getGroup('skills');
    }
  }

  getNote([groupName, id]: NoteID) {
    const [, notes] = this.getGroup(groupName);
    return notes ? notes[id] : null;
  }

  toJSON(): TaskJSON {
    return {
      json: this.json,
      letter: this.letter,
      notes: this.notes,
      section: this.section,
    };
  }
}
