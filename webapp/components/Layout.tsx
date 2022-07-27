import cn from 'classnames';
import React from 'react';

import { Structure, Task } from '../lib/types';
import { AppContext } from './context';
import { Link } from './Typography';

type MaybeTask = Structure.Task | undefined;
type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
  structure: Structure.AppData;
  task?: Task;
};

const sectionNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export function Layout({ children, home = false, structure, task }: LayoutProps) {
  const tasks = React.useMemo(() => structure?.sections?.flatMap((s) => s.tasks), [structure]);
  const meta = task?.meta;
  const [section, letter] = meta
    ? [sectionNumerals.indexOf(meta.section.numeral) + 1, meta.letter]
    : [null, null];

  const taskIndex = React.useMemo(
    () => tasks?.findIndex((t) => t.section === section && t.letter === letter),
    [tasks, task]
  );

  let prevTask: MaybeTask, nextTask: MaybeTask;
  if (typeof taskIndex === 'number') {
    if (taskIndex !== 0) prevTask = tasks?.at(taskIndex - 1);
    if (taskIndex !== tasks!.length - 1) nextTask = tasks?.at(taskIndex + 1);
  }

  const navLinkClasses = 'absolute h-top-bar flex flex-col justify-center';
  return (
    <AppContext.Provider value={structure}>
      <div className="flex h-screen flex-col items-center justify-start">
        {!home && (
          <div className="w-full h-top-bar z-10 flex-shrink-0 shadow-xl shadow-slate-800 flex flex-row justify-center items-center relative bg-gradient-to-r from-cyan-500 to-blue-500">
            <span className={cn(navLinkClasses, 'left-5')}>
              {prevTask && (
                <Link bold color={null} href={prevTask.uri}>
                  ← Previous
                </Link>
              )}
            </span>
            <div className="font-fancy text-2xl hover:text-title">
              <Link color={null} href="/">
                The Instrument ACS
              </Link>
            </div>
            <span className={cn(navLinkClasses, 'right-5')}>
              {nextTask && (
                <Link bold color={null} href={nextTask.uri}>
                  Next →
                </Link>
              )}
            </span>
          </div>
        )}
        <div className="w-full pt-4 pb-2 flex-grow overflow-auto  flex flex-col items-center">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
}
