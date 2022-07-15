import React from 'react';
import { Link } from './Link';

import { farURI, referenceNames, referenceURIs } from '../lib/references';
import { objectHasProperty } from '../lib/util';

type ChildProp<C = string> = { children: C };
type LinkableReference = keyof typeof referenceURIs;
type ReferenceLinkProps = { reference: LinkableReference; color?: string; text?: React.ReactNode };
type FARSectionProps = {
  section: [number, number, ...(string | number)[]];
};

export function Bold({ children }: ChildProp) {
  return <span className="font-bold">{children}</span>;
}

export function BulletList({ children }: ChildProp<React.ReactNode[]>) {
  return (
    <ol className="list-decimal ml-10">
      {children.map((child, i) => (
        <li key={i}>{child}</li>
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

export function Quote({ children }: ChildProp) {
  return <span className="italic text-slate-500">“{children.trim()}”</span>;
}
