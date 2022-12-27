import cn from 'classnames';
import katex from 'katex';
import React from 'react';

import { ChildProp, Colors, logWarning, makeAnchorId, OneOrMore } from '../lib';
import { NoteContext } from './context';
import { Link, LinkProps } from './Link';

type BulletType = 'alpha' | 'decimal' | 'disc' | 'roman' | 'square';
type BulletListProps = ChildProp<React.ReactNode[]> & { type: BulletType };

type EmphasizeProps = ChildProp & {
  bold?: boolean;
  className?: string;
  color?: Colors.TextColor;
  gray?: boolean;
  italic?: boolean;
};

type InlineListProps = ChildProp<React.ReactNode[]> & {
  delimiter?: string;
  logic?: 'and' | 'or' | null;
};

type KatexProps = ChildProp<string> & { block?: boolean } & React.HTMLAttributes<HTMLDivElement>;
type NoteCardProps = {
  className?: string;
  label?: string;
  note: WrapParagraphProps['content'];
  padding?: Padding;
};

type Padding = 'sm' | 'md' | 'lg';
type ParagraphProps = ChildProp & ReferenceListProps & { heading?: string; hr?: boolean };
type QuotationProps = ChildProp & QuotationSourceProps & { inline?: boolean; padded?: boolean };
type QuotationSourceProps = { source?: [string, string] | Reference };
type Reference = React.ReactElement<LinkProps>;
export type ReferenceListProps = { className?: string; references?: OneOrMore<Reference> };
type TooltipProps = ChildProp & { message?: string; noUnderline?: boolean };
type WrapParagraphProps = { content: React.ReactNode };

export function Bold(props: Omit<EmphasizeProps, 'bold'>) {
  return <Emphasize bold {...props} />;
}

export function BulletList({ type, children }: BulletListProps) {
  return (
    <ol
      className={cn('ml-8 mt-2', {
        'list-decimal': type === 'decimal',
        'list-alpha': type === 'alpha',
        'list-disc': type === 'disc',
        'list-roman': type === 'roman',
        'list-square': type === 'square',
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
  const classes = cn(className, {
    'font-bold': bold,
    italic,
    'bg-slate-200 hover:bg-slate-300': gray,
    'text-amber-500': color && ['warning', 'warm'].includes(color),
    'text-blue-500': color && ['cold', 'info'].includes(color),
    'text-fuchsia-500': color === 'occluded',
    'text-green-600': color === 'success',
    'text-red-500': color && ['danger', 'hot'].includes(color),
  });

  if (classes.length) return <span className={classes}>{children}</span>;
  return <>{children}</>;
}

export function Gray(props: Omit<EmphasizeProps, 'gray'>) {
  return <Emphasize gray {...props} />;
}

export function Info(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="info" {...props} />;
}

export function InlineList({ children, delimiter = ',', logic = 'and' }: InlineListProps) {
  return (
    <>
      {children.flatMap((child, i) => (
        <span key={i}>
          {i > 0 ? ' ' : ''}
          <Gray italic>{child}</Gray>
          {i < children.length - 2
            ? delimiter
            : i === children.length - 2
            ? logic
              ? ` ${logic}`
              : delimiter
            : ''}
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

export function NoteCard({ className, label, note, padding = 'md' }: NoteCardProps) {
  if (!note) return null;
  return (
    <div
      className={cn(
        'w-full relative bg-white text-black text-sm rounded-lg shadow-[0px_0px_15px] shadow-yellow-400',
        className,
        {
          'my-2': padding === 'sm',
          'my-5': padding === 'md',
          'my-8': padding === 'lg',
        }
      )}
    >
      {label && (
        <span className="absolute top-0 left-4 -translate-y-1/2 bg-theme-gradient text-white rounded-full px-2 font-bold cursor-default">
          {label}
        </span>
      )}
      <WrapParagraph content={note} />
    </div>
  );
}

export function Paragraph({ children, className, heading, hr, references }: ParagraphProps) {
  const { heading: sectionHeading, item } = React.useContext(NoteContext);

  if (references && !heading) {
    logWarning('References will not be rendered for a Paragraph with no heading');
  }

  const id = heading
    ? makeAnchorId(sectionHeading, item, heading.toLowerCase().split(' ').join('_'))
    : null;

  return (
    <div className={cn('p-3 first:mt-0', className)}>
      {hr ? <hr className="w-4/5 m-auto mb-5" /> : null}
      {id ? (
        <div className="flex flex-row items-center mb-1">
          <Link.ToSelf color={null} id={id}>
            <span className="bg-indigo-500 px-2 py-1 inline-block rounded-xl text-white text-xs">
              <Bold>{heading}</Bold>
            </span>
          </Link.ToSelf>
          <ReferenceList className="ml-4" references={references} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function Quotation({ children, inline = false, padded = false, source }: QuotationProps) {
  if (inline) return <Gray italic>"{children}"</Gray>;
  return (
    <div
      className={cn('border-l-gray-300 border-l-[6px] py-1 pl-3 ml-3 bg-gray-50', {
        'm-3': padded,
      })}
    >
      <Italic>{children}</Italic> <QuotationSource source={source} />
    </div>
  );
}

function QuotationSource({ source }: QuotationSourceProps) {
  if (!source) return null;
  const sourceElement = Array.isArray(source) ? <Link href={source[1]}>{source[0]}</Link> : source;
  return <span className="pl-6 whitespace-nowrap">— {sourceElement}</span>;
}

export function ReferenceList({ className, references }: ReferenceListProps) {
  if (!references) return null;

  const referenceArray = Array.isArray(references) ? references : [references];
  if (referenceArray.length === 0) return null;

  return (
    <div className={cn('inline', className)}>
      {referenceArray.map((reference, i) => {
        const isLast = i === referenceArray.length - 1;
        const textColor = 'text-slate-400';
        return (
          <span className={cn('text-xs', textColor, { 'mr-2': !isLast })} key={i}>
            {React.cloneElement(reference, {
              ...reference.props,
              bold: false,
              className: cn('hover:text-slate-500', textColor),
            })}
            {isLast ? null : ','}
          </span>
        );
      })}
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
          <div className="absolute top-0 hidden mt-[-1.7rem] group-hover:block z-50">
            <div className="py-1 px-2 text-xs text-white font-bold rounded-md [width:max-content] shadow-md shadow-slate-700 bg-gray-600 max-w-xl text-ellipsis overflow-hidden whitespace-nowrap">
              {message}
            </div>
            <span className="absolute top-[100%] left-1/2 -ml-[4px] -rotate-45 -translate-y-[4px] border-[4px] border-solid border-transparent border-l-gray-600 border-b-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export function Warning(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="warning" {...props} />;
}

export function WrapParagraph({ content }: WrapParagraphProps) {
  return (
    <>
      {React.Children.map(content, (child, i) => {
        if (React.isValidElement(child) && child.type === Paragraph) {
          return React.cloneElement(child, { key: i });
        }

        return <Paragraph key={i}>{child}</Paragraph>;
      })}
    </>
  );
}
