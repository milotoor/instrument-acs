import cn from 'classnames';
import * as React from 'react';

import { ChildProp } from '../lib/types';

type CollapseProps = ChildProp & { heading: string; startOpen?: boolean };

export function Collapse({ children, heading, startOpen = false }: CollapseProps) {
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(startOpen);
  const transitionClasses = 'ease-in-out duration-500';
  return (
    <div className="shadow-md shadow-slate-500 rounded-lg overflow-hidden border border-slate-400">
      <div
        className="cursor-pointer flex items-center justify-start p-4 hover:bg-slate-100"
        onClick={() => setOpen((state) => !state)}
      >
        <div className={cn('text-2xl transition', { 'rotate-90': open })}>›</div>
        <div className="text-lg ml-3">{heading}</div>
      </div>
      <div
        ref={(ref) => setContentEl(ref)}
        className={cn('transition-height', transitionClasses)}
        style={{ height: open ? contentEl?.scrollHeight : 0 }}
      >
        <div
          className={cn('p-4 border-t transition-border', transitionClasses, {
            'border-slate-400': open,
            'border-white': !open,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
