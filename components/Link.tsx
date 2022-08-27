import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { referenceNames, referenceURIs, uri } from '../lib/references';
import { ChildProp } from '../lib/types';
import { objectHasProperty } from '../lib/util';

import { Bold, Emphasize, Tooltip } from './Typography';

type CommonLinkProps = { bold?: boolean; className?: string | null };
type ReferenceLinkProps = CommonLinkProps & {
  reference: LinkableReference;
  text?: React.ReactNode;
  title?: string;
};

type AIMReference = [number, number, number, ...(string | number)[]];
type FARReference = [number, number, ...(string | number)[]];
export type AIMParagraphProps = { paragraph: AIMReference };
export type FARSectionProps = { appendix?: [number, string]; section?: FARReference };

export type LinkProps = NextLinkProps & ChildProp & CommonLinkProps;
type LinkableReference = keyof typeof referenceURIs;

export const Link = Object.assign(
  function Link({ bold, children, className, href, ...rest }: LinkProps) {
    return (
      <span
        className={cn('hover:underline text-fuchsia-500', className, {
          'text-inherit': className === null,
        })}
      >
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

      const link = (
        <Link href={referenceURIs[reference]} {...rest}>
          {linkContent}
        </Link>
      );

      return title ? <Tooltip message={title}>{link}</Tooltip> : link;
    },
  }
);

export function AIM({ paragraph: fullParagraph }: AIMParagraphProps) {
  const [chapter, section, paragraph, ...rest] = fullParagraph;

  let aimURI = uri.aim(chapter, section, paragraph);
  const subsectionID = rest.length ? ' ' + rest.map((id) => `(${id})`).join('') : '';
  return (
    <Link bold href={aimURI}>
      AIM{' '}
      <span className="whitespace-nowrap">
        {chapter}-{section}-{paragraph}
        {subsectionID ? ' ' + subsectionID : null}
      </span>
    </Link>
  );
}

export function FAR({ appendix, section: fullSection }: FARSectionProps) {
  const [farURI, linkText] = (() => {
    if (fullSection) {
      const [part, section, ...paragraph] = fullSection;

      let farURI = uri.far(part, section);
      if (paragraph && paragraph.length) {
        farURI += `#${paragraph.join('_')}`;
      }

      const paraText = paragraph.length ? ' ' + paragraph.map((t) => `(${t})`).join('') : null;
      return [
        farURI,
        <>
          14 CFR §{part}.{section} {paraText}
        </>,
      ];
    } else if (appendix) {
      const [part, letter] = appendix;
      const farURI = uri.farAppendix(part, letter);
      return [
        farURI,
        <>
          14 CFR §{part} Appendix {letter}
        </>,
      ];
    } else {
      throw Error('FAR component must be provided with `appendix` or `section` prop!');
    }
  })();

  return (
    <Link bold href={farURI}>
      {linkText}
    </Link>
  );
}
