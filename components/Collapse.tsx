import cn from 'classnames';
import * as React from 'react';

import { useSize } from '../lib/hooks';
import { ChildProp } from '../lib/types';
import { ReferenceList, ReferenceListProps, WrapParagraph } from './TaskPage';

type CollapseProps = ChildProp &
  ReferenceListProps & {
    decoration?: React.ReactElement;
    heading: string;
    startOpen?: boolean;
  };

export function Collapse(props: CollapseProps) {
  const { children, decoration, heading, references, startOpen = false } = props;
  const [open, setOpen] = React.useState(startOpen);
  const elements = references ? [<ReferenceList references={references} />, children] : children;
  return (
    <div className="shadow-md shadow-slate-500 rounded-lg overflow-hidden border border-slate-400">
      <div
        className="cursor-pointer flex items-center justify-start pl-4 py-1 hover:bg-slate-100 w-full"
        onClick={() => setOpen((state) => !state)}
      >
        <div className={cn('text-lg transition', { 'rotate-90': open })}>›</div>
        <div className="text-md ml-3 grow">{heading}</div>
        {decoration ? <div className="justify-self-end mr-2">{decoration}</div> : null}
      </div>
      <ResponsiveResize>
        <div
          className={cn('border-t transition-border ease-in-out duration-500', {
            'h-0': !open,
            'border-slate-400': open,
            'border-white': !open,
          })}
        >
          <WrapParagraph content={elements} />
        </div>
      </ResponsiveResize>
    </div>
  );
}

export function ResponsiveResize({ children }: ChildProp) {
  const resizeTarget = React.useRef(null);
  const size = useSize(resizeTarget);
  return (
    <div
      className="transition-height ease-in-out duration-500"
      style={{ height: size?.height ?? 0 }}
    >
      <div ref={resizeTarget}>{children}</div>
    </div>
  );
}
