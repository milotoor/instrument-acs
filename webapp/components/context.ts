import * as React from 'react';
import { Section, Structure, Task } from '../lib/types';

type AppContext = {
  section?: Section.Number;
  structure: Structure.AppData;
  task?: Task.Letter;
};

export const AppContext = React.createContext<AppContext>({
  structure: { images: {}, sections: [] },
});
