import cn from 'classnames';
import * as React from 'react';

import { ACS } from '../lib';
import { Link } from './Link';

type TableOfContentsProps = { small?: boolean; acs: ACS };
type TaskListProps = { className?: string; tasks: ACS.Task[] };

export function TableOfContents({ small = false, acs }: TableOfContentsProps) {
  return (
    <ol className="list-decimal leading-7 ml-8 mt-4 text-lg">
      {acs.sections.map(({ name, tasks, uri }) => (
        <li key={name} className="my-4">
          <Link
            className={cn({ 'text-subtitle': !small, 'text-subtitle-sm': small })}
            color={null}
            href={uri}
          >
            {name}
          </Link>
          <div className={cn({ 'text-sm': small })}>
            <TaskList tasks={tasks} className="ml-8" />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TaskList({ className, tasks }: TaskListProps) {
  return (
    <ol className={cn('list-alpha', className)}>
      {tasks.map((task) => (
        <Link href={task.uri} key={task.name}>
          <li>{task.name}</li>
        </Link>
      ))}
    </ol>
  );
}
