import cn from 'classnames';
import * as React from 'react';

import { ChildProp } from '../lib';
import { ResponsiveResize } from './Collapse';
import { ReferenceList, ReferenceListProps, WrapParagraph } from './Typography';

type TabsProps = ChildProp<React.ReactElement<TabProps>[]>;
type TabProps = ChildProp & ReferenceListProps & { active?: boolean; heading: string };

export function Tabs({ children }: TabsProps) {
  const [active, setActive] = React.useState(0);
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
      <ResponsiveResize>
        {children.map((tab, i) => (
          <Tab {...tab.props} active={active === i} key={i} />
        ))}
      </ResponsiveResize>
    </div>
  );
}

export const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ active, children, references }, ref) => {
    let elements = [children];
    if (references) elements.unshift(<ReferenceList references={references} />);
    return (
      <div className={cn('overflow-hidden', { 'max-h-0': !active })} ref={ref}>
        <WrapParagraph content={elements} />
      </div>
    );
  }
);
