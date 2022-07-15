import React from 'react';
import { Link } from './Link';

import { farURI, referenceNames, referenceURIs } from '../lib/references';
import { objectHasProperty } from '../lib/util';
import classNames from 'classnames';

type ChildProp<C = string> = { children: C };
type DetailListProps = ChildProp<React.ReactNode[]> & {
  delimeter?: string;
  logic?: 'and' | 'or';
  type: 'bullet' | 'inline';
};

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
            <span className={classNames('italic', bgColor)}>
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

export function ReferenceLink({ reference, color, text }: ReferenceLinkProps) {
  let linkContent = text ?? reference;
  if (objectHasProperty(referenceNames, reference)) {
    linkContent = referenceNames[reference];
  }

  return (
    <Link color={color} href={referenceURIs[reference]}>
      {linkContent}
    </Link>
  );
}
