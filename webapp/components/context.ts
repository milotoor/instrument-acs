import * as React from 'react';
import { Structure } from '../lib/types';

interface AppContextInterface {
  images?: Structure.Images;
}

export const AppContext = React.createContext<AppContextInterface>({});
