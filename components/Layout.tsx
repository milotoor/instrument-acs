import React from 'react';

import { Structure, Task } from '../lib/types';
import { numeralToNumber } from '../lib/util';
import { AppContext } from './context';
import { Link } from './Link';
import { TableOfContents } from './Tasks';
import { Bold } from './Typography';

type StructureProp = { structure: Structure.AppData };
type LayoutProps = StructureProp & {
  children: React.ReactNode;
  home?: boolean;
  section?: Structure.Section;
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
      <div className="h-screen flex flex-col items-center justify-start">
        {!home && (
          <div className="w-full h-top-bar z-10 flex-shrink-0 shadow-xl shadow-slate-800 flex flex-row justify-center items-center relative bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="font-fancy text-2xl hover:text-glow-gold">
              <Link color={null} href="/">
                The Instrument ACS
              </Link>
            </div>
            <LastUpdatedWidget structure={structure} />
          </div>
        )}
        <div className="w-full flex overflow-hidden">
          <div className="w-96 py-4 pl-2 overflow-auto">
            {!home && <TableOfContents structure={structure} small />}
          </div>
          <div className="pt-4 pb-2 pl-4 flex flex-col flex-grow overflow-auto">{children}</div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

function LastUpdatedWidget({ structure }: StructureProp) {
  const { lastUpdated } = structure;
  if (!lastUpdated) return null;
  return (
    <div className="absolute right-5 h-top-bar flex flex-col justify-center items-end text-xs">
      <span>Last updated:</span>
      <Bold>{lastUpdated}</Bold>
    </div>
  );
}
