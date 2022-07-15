import React from 'react';
import { Link } from './Link';

import { farURI } from '../lib/references';

type ChildProp<C = string> = { children: C };
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

export function Quote({ children }: ChildProp) {
  return <span className="italic text-slate-500">“{children.trim()}”</span>;
}
