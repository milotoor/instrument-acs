import cn from 'classnames';
import * as React from 'react';

import { ACS } from '../lib';
import { AppContext } from './context';
import { Link } from './Link';

type TaskListProps = { activeTask?: ACS.Task.Letter; className?: string; tasks: ACS.Task[] };
const activeLinkColor = 'text-glow-gold';

export function TableOfContents() {
  const { acs, section, task } = React.useContext(AppContext);
  return (
    <ol className="list-decimal leading-7 ml-8 mt-4">
      {acs.sections.map(({ name, number, tasks, uri }) => (
        <li key={name} className="my-4">
          <Link
            className={cn('text-subtitle-sm', { [activeLinkColor]: section === number && !task })}
            color={null}
            href={uri}
          >
            {name}
          </Link>
          <div className="text-sm">
            <TaskList
              activeTask={section === number ? task : undefined}
              tasks={tasks}
              className="ml-8"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TaskList({ activeTask, className, tasks }: TaskListProps) {
  return (
    <ol className={cn('list-alpha', className)}>
      {tasks.map((task) => (
        <Link
          color={activeTask === task.meta.letter ? activeLinkColor : undefined}
          href={task.uri}
          key={task.name}
        >
          <li>{task.name}</li>
        </Link>
      ))}
    </ol>
  );
}
