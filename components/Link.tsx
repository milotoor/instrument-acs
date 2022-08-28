import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { referenceNames, referenceURIs, uri } from '../lib/references';
import { ChildProp, Item, Section, Task } from '../lib/types';
import { makeAnchorId, objectHasProperty } from '../lib/util';

import { AppContext } from './context';
import { Emphasize, Tooltip } from './Typography';

type CommonLinkProps = { bold?: boolean; className?: string | null };
type ReferenceLinkProps = CommonLinkProps & {
  reference: LinkableReference;
  text?: React.ReactNode;
  title?: string;
};

type AIMReference = [number, number, number, ...(string | number)[]];
type AIMProps = CommonLinkProps & { bold?: boolean; paragraph: AIMReference };
type FARReference = [number, number, ...(string | number)[]];
type FARProps = CommonLinkProps & {
  appendix?: [number, string];
  bold?: boolean;
  section?: FARReference;
};

type TaskLinkProps = { section: Section.Number; task: Task.Letter; id: Item.ID };

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

    Task({ section, task, id }: TaskLinkProps) {
      const { sections } = React.useContext(AppContext).structure;
      const taskData = sections[section - 1].tasks.find(({ letter }) => letter === task);
      if (!taskData) return null;

      const dataSection = id[0].toLowerCase();
      const itemId = id.slice(1);
      const heading =
        dataSection === 'k' ? 'Knowledge' : dataSection === 'r' ? 'Risk Management' : 'Skills';

      return (
        <Tooltip message={taskData.name}>
          <Link href={`${taskData.uri}#${makeAnchorId(heading, itemId)}`}>
            <span>
              Section {section}, Task {task}
            </span>
          </Link>
        </Tooltip>
      );
    },
  }
);

export function AIM({ bold = true, paragraph, ...rest }: AIMProps) {
  const [chapter, section, subsection, ...components] = paragraph;

  let aimURI = uri.aim(chapter, section, subsection);
  const subsectionID = components.length ? ' ' + components.map((id) => `(${id})`).join('') : '';
  return (
    <Link bold={bold} href={aimURI} {...rest}>
      AIM{' '}
      <span className="whitespace-nowrap">
        {chapter}-{section}-{subsection}
        {subsectionID ? ' ' + subsectionID : null}
      </span>
    </Link>
  );
}

export function FAR({ appendix, bold = true, section: fullSection, ...rest }: FARProps) {
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
          14 CFR §{part}.{section}
          {paraText}
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
    <Link bold={bold} href={farURI} {...rest}>
      {linkText}
    </Link>
  );
}
