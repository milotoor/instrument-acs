import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import {
  ACS,
  ChildProp,
  makeAnchorId,
  objectHasProperty,
  referenceNames,
  referenceURIs,
  uri,
} from '../lib';
import { AppContext } from './context';
import { Emphasize, Tooltip } from './Typography';

type CommonLinkProps = { bold?: boolean; className?: string; color?: string | null };
type ApproachLinkProps = {
  type: string;
  rwy?: number | string;
  circling?: string;
  name: string;
  icao?: string;
  id: string;
};

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

type TaskLinkProps = { section?: ACS.Section.Number; task?: ACS.Task.Letter; id: ACS.Item.ID };
export type LinkProps = NextLinkProps & ChildProp & CommonLinkProps & { noUnderline?: boolean };
type LinkableReference = keyof typeof referenceURIs;

export const Link = Object.assign(
  function Link(props: LinkProps) {
    const { bold, children, className, color, href, noUnderline = false, ...rest } = props;
    const isLocalLink = '/#'.includes(href.toString()[0]);
    const target = isLocalLink ? undefined : '_blank';
    return (
      <span
        className={cn(className, color, {
          'hover:underline': !noUnderline,
          'text-inherit': color === null,
          'text-fuchsia-500': color === undefined,
        })}
      >
        <Emphasize bold={bold}>
          <NextLink href={href} {...rest}>
            <a target={target}>{children}</a>
          </NextLink>
        </Emphasize>
      </span>
    );
  },
  {
    Approach({ circling, icao, id, name, rwy, type }: ApproachLinkProps) {
      const approachName = (() => {
        if (rwy) return `${type} RWY-${rwy}`;
        if (circling) return `${type}-${circling}`;
      })();

      return (
        <Link href={uri.aeronav_iap(id)}>
          {approachName} approach into {name}
          {icao && ` (${icao})`}
        </Link>
      );
    },
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

    Task({ id, ...props }: TaskLinkProps) {
      const context = React.useContext(AppContext);
      const { acs } = context.data;
      const taskLetter = props.task || context.task;
      const section = props.section || context.section;
      if (!section || !taskLetter) throw Error('Unable to identify task for link');

      const task = acs.getTask(section, taskLetter);
      const dataSection = id[0].toLowerCase();
      const itemId = id.slice(1);
      const heading =
        dataSection === 'k' ? 'Knowledge' : dataSection === 'r' ? 'Risk Management' : 'Skills';

      return (
        <Tooltip message={task.name}>
          <Link href={`${task.uri}#${makeAnchorId(heading, itemId)}`}>
            <span>
              Section {section}, Task {taskLetter}
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
