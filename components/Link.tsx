import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { referenceNames, referenceURIs, uri } from '../lib/references';
import { ChildProp } from '../lib/types';
import { objectHasProperty } from '../lib/util';

import { Bold, Emphasize, Tooltip } from './Typography';

type ReferenceLinkProps = {
  bold?: boolean;
  color?: string | null;
  reference: LinkableReference;
  text?: React.ReactNode;
  title?: string;
};

type AIMParagraphProps = { paragraph: [number, number, number, ...(string | number)[]] };
type FARSectionProps = { section: [number, number, ...(string | number)[]] };
type LinkProps = NextLinkProps & ChildProp & Omit<ReferenceLinkProps, 'reference' | 'text'>;
type LinkableReference = keyof typeof referenceURIs;

export const Link = Object.assign(
  function Link({ bold, children, color = 'text-fuchsia-500', href, ...rest }: LinkProps) {
    return (
      <span className={cn('hover:underline', color, { 'text-inherit': color === null })}>
        <Emphasize bold={bold}>
          {href.toString().startsWith('/') ? (
            <NextLink href={href} {...rest}>
              <span className="cursor-pointer">{children}</span>
            </NextLink>
          ) : (
            <a target="_blank" href={href.toString()} {...rest}>
              {children}
            </a>
          )}
        </Emphasize>
      </span>
    );
  },
  {
    Reference({ reference, text, ...rest }: ReferenceLinkProps) {
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
          <Link href={referenceURIs[reference]} {...rest}>
            {linkContent}
          </Link>
        </Tooltip>
      );
    },
  }
);

export function AIM({ paragraph: fullParagraph }: AIMParagraphProps) {
  const [chapter, section, paragraph, ...rest] = fullParagraph;

  let aimURI = uri.aim(chapter, section, paragraph);
  const subsectionID = rest.length ? ' ' + rest.map((id) => `(${id})`).join('') : '';
  return (
    <Bold>
      <Link href={aimURI}>
        AIM{' '}
        <span className="whitespace-nowrap">
          {chapter}-{section}-{paragraph}
          {subsectionID ? ' ' + subsectionID : null}
        </span>
      </Link>
    </Bold>
  );
}

export function FAR({ section: fullSection }: FARSectionProps) {
  const [part, section, ...paragraph] = fullSection;

  let farURI = uri.far(part, section);
  if (paragraph && paragraph.length) {
    farURI += `#${paragraph.join('_')}`;
  }

  const paraText = paragraph.length ? ' ' + paragraph.map((t) => `(${t})`).join('') : null;
  return (
    <Bold>
      <Link href={farURI}>
        14 CFR §{part}.{section}
        {paraText}
      </Link>
    </Bold>
  );
}
