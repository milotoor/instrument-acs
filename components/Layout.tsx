import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { numeralToNumber, Structure, Task } from '../lib';
import { AppContext } from './context';
import { Link } from './Link';
import { TableOfContents } from './Tasks';
import { Bold } from './Typography';

type StructureProp = { structure: Structure.AppData };
type LayoutProps = StructureProp & {
  centered?: boolean;
  children: React.ReactNode;
  home?: boolean;
  section?: Structure.Section;
  task?: Task;
  title: string;
};

export function Layout({
  centered = false,
  children,
  home = false,
  section,
  structure,
  task,
  title,
}: LayoutProps) {
  const meta = task?.meta;
  const [sectionNumber, letter] = meta
    ? [numeralToNumber(meta.section.numeral), meta.letter]
    : section
    ? [section.number, undefined]
    : [undefined, undefined];

  return (
    <AppContext.Provider value={{ section: sectionNumber, structure, task: letter }}>
      <Head>
        <title>{title}</title>
      </Head>

      {
        // -webkit-fill-available is a weird hack to fix the "iOS viewport scroll bug"
        // See https://css-tricks.com/css-fix-for-100vh-in-mobile-webkit/
        //     https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
      }
      <div className="h-screen h-[-webkit-fill-available] flex flex-col items-center justify-start">
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
          {!home && (
            <div className="w-96 flex-shrink-0 py-4 pl-2 overflow-auto">
              <TableOfContents structure={structure} small />
            </div>
          )}
          <main
            className={cn('p-4 flex flex-col flex-grow overflow-auto', {
              'items-center': centered,
            })}
          >
            {children}
          </main>
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
