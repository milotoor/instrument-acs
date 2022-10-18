import * as React from 'react';
import { ACS } from '../lib';

type AppContext = {
  acs: ACS;
  section?: ACS.Section.Number;
  task?: ACS.Task.Letter;
};

export const AppContext = React.createContext<AppContext>({
  acs: new ACS({ images: {}, sections: [] }),
});

type NoteContext = {
  heading: ACS.Section.Heading;
  item: ACS.Item.ID;
};

// Default values are completely arbitrary-- really annoying that React requires this
export const NoteContext = React.createContext<NoteContext>({
  heading: 'Knowledge',
  item: '1',
});
