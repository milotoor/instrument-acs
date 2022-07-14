export namespace Item {
  type Content = string | { general: string; specific: string[] };
  export type ID = string;
  export type List = Record<string, Content>;
}

export namespace Section {
  export type Number = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  export namespace Headings {
    export type NonList = 'Objective' | 'References';
    export type List = 'Knowledge' | 'Risk Management' | 'Skills';
    export type All = NonList | List;
  }
}

export namespace Task {
  export type Letter = 'A' | 'B' | 'C' | 'D' | 'E';
  export type Meta = {
    letter: Letter;
    name: string;
    objective: string;
    references: string[];
    section: { numeral: string; name: string };
  };
}

export interface Task {
  meta: Task.Meta;
  knowledge: Item.List;
  risk_management: Item.List;
  skills: Item.List;
}
