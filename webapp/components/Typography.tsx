import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { farURI, referenceNames, referenceURIs } from '../lib/references';
import { objectHasProperty } from '../lib/util';

type ChildProp<C = string> = { children: C };
type DetailListProps = ChildProp<React.ReactNode[]> & {
  delimeter?: string;
  logic?: 'and' | 'or' | null;
  type: 'bullet' | 'inline';
};

type FARSectionProps = { section: [number, number, ...(string | number)[]] };
type LinkProps = NextLinkProps & { children?: React.ReactNode; color?: string; title?: string };
type LinkableReference = keyof typeof referenceURIs;
type ReferenceLinkProps = { reference: LinkableReference; color?: string; text?: React.ReactNode };
type TooltipProps = ChildProp<React.ReactNode> & { message?: string };

export function Bold({ children }: ChildProp<React.ReactNode>) {
  return <span className="font-bold">{children}</span>;
}

export function DetailList({ children, delimeter = ',', logic = 'and', type }: DetailListProps) {
  const bgColor = 'bg-slate-200 hover:bg-slate-300';
  if (type === 'inline')
    return (
      <>
        {children.flatMap((child, i) => (
          <span key={i}>
            {i > 0 ? ' ' : ''}
            <span className={cn('italic', bgColor)}>
              {child}
              {i === children.length - 1 ? '' : delimeter}
            </span>
            {logic && i === children.length - 2 ? ` ${logic}` : ''}
          </span>
        ))}
      </>
    );

  return (
    <ol className="list-decimal ml-12 mt-2">
      {children.map((child, i) => (
        <li key={i}>
          <span className={bgColor}>{child}</span>
        </li>
      ))}
    </ol>
  );
}

export function FAR({ section: fullSection }: FARSectionProps) {
  const [part, section, ...paragraph] = fullSection;
  const paraArray = Array.isArray(paragraph) ? paragraph : [paragraph];

  let uri = farURI(part, section);
  if (paraArray && paraArray.length) {
    uri += `#${paraArray.join('_')}`;
  }

  const paraText = paraArray.length ? ' ' + paraArray.map((t) => `(${t})`).join('') : null;
  return (
    <Link href={uri}>
      §{part}.{section}
      {paraText}
    </Link>
  );
}

export const Link: React.FC<LinkProps> = ({ color = 'text-fuchsia-500', href, ...rest }) => (
  <span className={cn(color, 'hover:underline')}>
    {href.toString().startsWith('/') ? (
      <NextLink href={href} {...rest} />
    ) : (
      <a target="_blank" href={href.toString()} {...rest} />
    )}
  </span>
);

export function ReferenceLink({ reference, color, text }: ReferenceLinkProps) {
  let linkContent: React.ReactNode = reference;
  let title;

  if (text) linkContent = text;
  if (objectHasProperty(referenceNames, reference)) {
    const name = referenceNames[reference];
    if (text) {
      title = name;
    } else {
      linkContent = name;
    }
  }

  return (
    <Tooltip message={title}>
      <Link color={color} href={referenceURIs[reference]}>
        {linkContent}
      </Link>
    </Tooltip>
  );
}

export const Tooltip = ({ message, children }: TooltipProps) => {
  const backgroundColor = 'gray-600';
  return (
    <div className="inline-block">
      <div className="relative flex flex-col items-center group">
        {children}
        {message && (
          <div className="absolute bottom-0 hidden mb-6 group-hover:block">
            <div
              className={`py-1 px-2 text-xs text-white rounded-md [width:max-content] shadow-md shadow-slate-700 bg-${backgroundColor}`}
            >
              {message}
            </div>
            <span
              className={`absolute top-[100%] left-1/2 -ml-[6px] border-[6px] border-solid border-transparent border-t-${backgroundColor}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
1;
