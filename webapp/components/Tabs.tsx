import cn from 'classnames';
import * as React from 'react';

import { ChildProp } from '../lib/types';

type TabsProps = ChildProp<React.ReactElement<TabProps>[]>;
type TabProps = ChildProp & { active?: boolean; name: string };

export function Tabs({ children }: TabsProps) {
  const [active, setActive] = React.useState(0);
  const [activeTabEl, setActiveTabEl] = React.useState<HTMLDivElement | null>(null);
  return (
    <div className="rounded-md overflow-hidden border border-slate-400">
      <div className="flex items-center justify-start border-b border-slate-400">
        {children.map((tab, i) => {
          const isActive = active === i;
          return (
            <div
              className={cn('text-md cursor-pointer p-2', {
                'hover:bg-indigo-500/30': !isActive,
                'bg-indigo-500 text-white': isActive,
              })}
              key={i}
              onClick={() => setActive(i)}
            >
              {tab.props.name}
            </div>
          );
        })}
      </div>
      <div
        className="transition-height ease-in-out duration-500 overflow-hidden"
        style={{ height: activeTabEl?.scrollHeight ?? 0 }}
      >
        {children.map((tab, i) => {
          const isActive = active === i;
          return (
            <Tab
              {...tab.props}
              active={isActive}
              key={i}
              ref={(ref) => isActive && setActiveTabEl(ref)}
            />
          );
        })}
      </div>
    </div>
  );
}

export const Tab = React.forwardRef<HTMLDivElement, TabProps>(({ active, children }, ref) => {
  return (
    <div className={cn('p-4', { hidden: !active })} ref={ref}>
      {children}
    </div>
  );
});
