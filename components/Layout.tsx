import React from 'react';

import { Structure, Task } from '../lib/types';
import { numeralToNumber } from '../lib/util';
import { AppContext } from './context';
import { Link } from './Link';

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
  section?: Structure.Section;
  structure: Structure.AppData;
  task?: Task;
};

export function Layout({ children, home = false, section, structure, task }: LayoutProps) {
  const meta = task?.meta;
  const [sectionNumber, letter] = meta
    ? [numeralToNumber(meta.section.numeral), meta.letter]
    : section
    ? [section.number, undefined]
    : [undefined, undefined];

  return (
    <AppContext.Provider value={{ section: sectionNumber, structure, task: letter }}>
      <div className="flex h-screen flex-col items-center justify-start">
        {!home && (
          <div className="w-full h-top-bar z-10 flex-shrink-0 shadow-xl shadow-slate-800 flex flex-row justify-center items-center relative bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="font-fancy text-2xl hover:text-glow-gold">
              <Link color={null} href="/">
                The Instrument ACS
              </Link>
            </div>
          </div>
        )}
        <div className="w-full pt-4 pb-2 flex-grow overflow-auto  flex flex-col items-center">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
}
