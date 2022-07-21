import cn from 'classnames';
import React from 'react';

import { Structure } from '../lib/types';
import { Link } from './Typography';
import type { TaskPage } from './TaskPage';

type LayoutProps = { children: React.ReactNode } & Partial<TaskPage.TopLevelProps>;
type MaybeTask = Structure.Task | undefined;

const sectionNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export function Layout({ children, structure, task }: LayoutProps) {
  const tasks = React.useMemo(() => structure?.flatMap((s) => s.tasks), [structure]);
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
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="w-full h-top-bar flex-shrink-0 bg-slate-900 shadow-lg flex flex-row justify-center items-center relative">
        <span className={cn(navLinkClasses, 'left-5')}>
          {prevTask && <Link href={prevTask.uri}>← Previous</Link>}
        </span>
        <div className="font-fancy text-2xl hover:text-title">
          <Link color="white" href="/">
            The Instrument ACS
          </Link>
        </div>
        <span className={cn(navLinkClasses, 'right-5')}>
          {nextTask && <Link href={nextTask.uri}>Next →</Link>}
        </span>
      </div>
      <div className="w-full py-2 flex-grow overflow-auto  flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
