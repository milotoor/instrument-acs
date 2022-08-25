import cn from 'classnames';
import * as React from 'react';

import { ChildProp } from '../lib/types';

type TabsProps = ChildProp<React.ReactElement<TabProps>[]>;
type TabProps = ChildProp & { active?: boolean; heading: string };

export function Tabs({ children }: TabsProps) {
  const [active, setActive] = React.useState(0);
  const [activeTabEl, setActiveTabEl] = React.useState<HTMLDivElement | null>(null);
  return (
    <div className="rounded-md overflow-hidden border border-slate-400">
      <div className="flex items-stretch justify-start border-b border-slate-400">
        {children.map((tab, i) => {
          const isActive = active === i;
          return (
            <div
              className={cn('text-md cursor-pointer p-2 flex items-center', {
                'hover:bg-indigo-500/30': !isActive,
                'bg-indigo-500 text-white': isActive,
              })}
              key={i}
              onClick={() => setActive(i)}
            >
              {tab.props.heading}
            </div>
          );
        })}
      </div>
      <div
        className="transition-height ease-in-out duration-500"
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
    <div className={cn('overflow-hidden', { 'max-h-0': !active })} ref={ref}>
      <div className="p-4 ">{children}</div>
    </div>
  );
});
