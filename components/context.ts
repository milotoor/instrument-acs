import * as React from 'react';
import { Item, Section, Structure, Task } from '../lib/types';

type AppContext = {
  section?: Section.Number;
  structure: Structure.AppData;
  task?: Task.Letter;
};

export const AppContext = React.createContext<AppContext>({
  structure: { images: {}, sections: [], lastUpdated: '' },
});

type NoteContext = {
  heading: Section.Headings.List;
  item: Item.ID;
};

// Default values are completely arbitrary-- really annoying that React requires this
export const NoteContext = React.createContext<NoteContext>({
  heading: 'Knowledge',
  item: '1',
});
