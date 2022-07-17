import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { farURI, referenceNames, referenceURIs } from '../lib/references';
import { objectHasProperty } from '../lib/util';

type ChildProp<C = string> = { children: C };
type DetailListProps = ChildProp<React.ReactNode[]> & {
  delimeter?: string;
  logic?: 'and' | 'or';
  type: 'bullet' | 'inline';
};

type LinkProps = NextLinkProps & { children?: React.ReactNode; color?: string; title?: string };
type LinkableReference = keyof typeof referenceURIs;
type ReferenceLinkProps = { reference: LinkableReference; color?: string; text?: React.ReactNode };
type FARSectionProps = {
  section: [number, number, ...(string | number)[]];
};

export function Bold({ children }: ChildProp) {
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
            {i === children.length - 2 ? ` ${logic}` : ''}
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
    <Link color={color} href={referenceURIs[reference]} title={title}>
      {linkContent}
    </Link>
  );
}
