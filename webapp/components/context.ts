import * as React from 'react';
import { Structure } from '../lib/types';

export const AppContext = React.createContext<Structure.AppData>({ images: {}, sections: [] });
