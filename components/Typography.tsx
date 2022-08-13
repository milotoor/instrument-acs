import cn from 'classnames';
import katex from 'katex';
import React from 'react';

import { ChildProp, Colors } from '../lib/types';

type DetailListProps = ChildProp<React.ReactNode[]> & {
  bullet?: 'alpha' | 'decimal' | 'disc';
  delimeter?: string;
  logic?: 'and' | 'or' | null;
  type: 'bullet' | 'inline';
};

type EmphasizeProps = ChildProp & {
  bold?: boolean;
  className?: string;
  color?: Colors.TextColor;
  gray?: boolean;
  italic?: boolean;
};

type KatexProps = ChildProp<string> & { block?: boolean } & React.HTMLAttributes<HTMLDivElement>;
type TooltipProps = ChildProp & { message?: string };

export function Bold(props: Omit<EmphasizeProps, 'bold'>) {
  return <Emphasize bold {...props} />;
}

export function Danger(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="danger" {...props} />;
}

export function DetailList(props: DetailListProps) {
  const { bullet = 'decimal', children, delimeter = ',', logic = 'and', type } = props;
  if (type === 'inline')
    return (
      <>
        {children.flatMap((child, i) => (
          <span key={i}>
            {i > 0 ? ' ' : ''}
            <Gray italic>{child}</Gray>
            {i >= children.length - 2 ? '' : delimeter}
            {logic && i === children.length - 2 ? ` ${logic}` : ''}
          </span>
        ))}
      </>
    );

  return (
    <ol
      className={cn('ml-12 mt-2', {
        'list-decimal': bullet === 'decimal',
        'list-alpha': bullet === 'alpha',
        'list-disc': bullet === 'disc',
      })}
    >
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ol>
  );
}

export function Emphasize({
  bold = false,
  children,
  className,
  color,
  gray = false,
  italic = false,
}: EmphasizeProps) {
  return (
    <span
      className={cn(className, {
        'font-bold': bold,
        italic,
        'bg-slate-200 hover:bg-slate-300': gray,
        'text-blue-500': color === 'cold',
        'text-amber-500': color && ['warning', 'warm'].includes(color),
        'text-red-500': color && ['danger', 'hot'].includes(color),
        'text-fuchsia-500': color === 'occluded',
      })}
    >
      {children}
    </span>
  );
}

export function Gray(props: Omit<EmphasizeProps, 'gray'>) {
  return <Emphasize gray {...props} />;
}

export function Italic(props: Omit<EmphasizeProps, 'italic'>) {
  return <Emphasize italic {...props} />;
}

export function Katex({ block = false, children, ...rest }: KatexProps) {
  const tex = children.replaceAll('[', '{').replaceAll(']', '}');
  return React.createElement(block ? 'div' : 'span', {
    ...rest,
    dangerouslySetInnerHTML: { __html: katex.renderToString(tex, { output: 'html' }) },
  });
}

export function ToDo() {
  return <span className="bg-yellow-300">To do</span>;
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="inline-block">
      <div className="relative flex flex-col items-center group">
        <span className={cn({ 'decoration-dotted decoration-fuchsia-500 underline': !!message })}>
          {children}
        </span>
        {message && (
          <div className="absolute bottom-0 hidden mb-6 group-hover:block">
            <div className="py-1 px-2 text-xs text-white rounded-md [width:max-content] shadow-md shadow-slate-700 bg-gray-600 max-w-xl">
              <Bold>{message}</Bold>
            </div>
            <span className="absolute top-[100%] left-1/2 -ml-[6px] border-[6px] border-solid border-transparent border-t-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export function Warning(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="warning" {...props} />;
}
