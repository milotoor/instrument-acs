import * as React from 'react';
import { ACS, Data } from '../lib';

/*************************** AppContext ***************************************/
type AppContext = {
  data: Data;
  section?: ACS.Section.Number;
  task?: ACS.Task.Letter;
};

export const AppContext = React.createContext<AppContext>({
  data: { acs: new ACS([]), images: {} },
});

/*************************** NoteContext **************************************/
type NoteContext = {
  heading: ACS.Section.Heading;
  item: ACS.Item.ID;
};

// Default values are completely arbitrary-- really annoying that React requires this
export const NoteContext = React.createContext<NoteContext>({
  heading: 'Knowledge',
  item: '1',
});

/*************************** DimensionContext *********************************/
type Breakpoints = 'XS' | 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL';
export type BreakpointContext = Record<`is${Breakpoints}`, boolean>;
export const BreakpointContext = React.createContext<BreakpointContext | undefined>(undefined);
