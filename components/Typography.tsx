import cn from 'classnames';
import katex from 'katex';
import React from 'react';

import { ChildProp, Colors } from '../lib/types';

type BulletListProps = ChildProp<React.ReactNode[]> & { type?: 'alpha' | 'decimal' | 'disc' };
type EmphasizeProps = ChildProp & {
  bold?: boolean;
  className?: string;
  color?: Colors.TextColor;
  gray?: boolean;
  italic?: boolean;
};

type InlineListProps = ChildProp<React.ReactNode[]> & {
  delimeter?: string;
  logic?: 'and' | 'or' | null;
};

type KatexProps = ChildProp<string> & { block?: boolean } & React.HTMLAttributes<HTMLDivElement>;
type QuotationProps = ChildProp & { source?: [string, string] };
type TooltipProps = ChildProp & { message?: string; noUnderline?: boolean };

export function Bold(props: Omit<EmphasizeProps, 'bold'>) {
  return <Emphasize bold {...props} />;
}

export function BulletList({ type = 'decimal', children }: BulletListProps) {
  return (
    <ol
      className={cn('ml-12 mt-2', {
        'list-decimal': type === 'decimal',
        'list-alpha': type === 'alpha',
        'list-disc': type === 'disc',
      })}
    >
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ol>
  );
}

export function Danger(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="danger" {...props} />;
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
        'text-amber-500': color && ['warning', 'warm'].includes(color),
        'text-blue-500': color && ['cold', 'info'].includes(color),
        'text-fuchsia-500': color === 'occluded',
        'text-green-600': color === 'success',
        'text-red-500': color && ['danger', 'hot'].includes(color),
      })}
    >
      {children}
    </span>
  );
}

export function Gray(props: Omit<EmphasizeProps, 'gray'>) {
  return <Emphasize gray {...props} />;
}

export function Info(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="info" {...props} />;
}

export function InlineList({ children, delimeter = ',', logic = 'and' }: InlineListProps) {
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

export function Quotation({ children }: QuotationProps) {
  return (
    <div className="border-l-gray-300 border-l-[6px] my-2 py-1 pl-3 ml-3 bg-gray-50">
      <Italic>{children}</Italic>
    </div>
  );
}

export function Success(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="success" {...props} />;
}

export function Term(props: any) {
  return <Bold {...props} />;
}

export function ToDo() {
  return <span className="bg-yellow-300">To do</span>;
}

export function Tooltip({ message, children, noUnderline = false }: TooltipProps) {
  return (
    <div className="inline-block">
      <div className="relative flex flex-col items-center group">
        <span
          className={cn({
            'decoration-dotted decoration-fuchsia-500 underline': !!message && !noUnderline,
          })}
        >
          {children}
        </span>
        {message && (
          <div className="absolute top-0 hidden mt-[-1.7rem] group-hover:block">
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
