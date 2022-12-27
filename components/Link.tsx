import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { far } from '../data';
import {
  ACS,
  ArbitraryID,
  ChildProp,
  Data,
  makeAnchorId,
  objectHasProperty,
  referenceNames,
  referenceURIs,
  uri,
  useAIM,
} from '../lib';
import { AppContext } from './context';
import { Emphasize, Tooltip } from './Typography';

type CommonLinkProps = Partial<{
  bold: boolean;
  className: string;
  color: string | null;
  newTab: boolean;
}>;

type ApproachLinkProps = ArbitraryID & {
  type: string;
  rwy?: number | string;
  circling?: string;
  name: string;
  icao?: string;
};

type ReferenceLinkProps = CommonLinkProps & {
  reference: LinkableReference;
  text?: React.ReactNode;
  title?: string;
};

type AIMProps = CommonLinkProps & { bold?: boolean; paragraph: Data.AIM.Reference };
type FARProps = CommonLinkProps & {
  appendix?: [number, string];
  bold?: boolean;
  section?: Data.FAR.Section;
  paragraph?: Data.FAR.Paragraph;
};

type TaskLinkProps = { section?: ACS.Section.Number; task?: ACS.Task.Letter; id: ACS.Item.ID };
export type LinkProps = NextLinkProps & ChildProp & CommonLinkProps & { noUnderline?: boolean };
type LinkToSelfProps = Omit<LinkProps, 'href'> & ArbitraryID;
type LinkableReference = keyof typeof referenceURIs;

export const Link = Object.assign(
  function Link(props: LinkProps) {
    const {
      bold,
      children,
      className,
      color,
      href,
      newTab = false,
      noUnderline = false,
      ...rest
    } = props;

    const isLocalLink = '/#'.includes(href.toString()[0]);
    const target = newTab || !isLocalLink ? '_blank' : undefined;
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
            Section {section}, Task {taskLetter}
          </Link>
        </Tooltip>
      );
    },

    ToSelf({ id, ...rest }: LinkToSelfProps) {
      return (
        <span id={id}>
          <Link {...rest} href={'#' + id} />{' '}
        </span>
      );
    },
  }
);

export function AIM({ bold = true, paragraph, ...rest }: AIMProps) {
  const [chapter, section, subsection, ...components] = paragraph;
  const name = useAIM(paragraph);

  let aimURI = uri.aim(chapter, section, subsection);
  const subsectionID = components.length ? ' ' + components.map((id) => `(${id})`).join('') : '';
  return (
    <Tooltip message={name}>
      <Link bold={bold} href={aimURI} {...rest}>
        AIM{' '}
        <span className="whitespace-nowrap">
          {chapter}-{section}
          {typeof subsection === 'number' && `-` + subsection}
          {subsectionID ? ' ' + subsectionID : null}
        </span>
      </Link>
    </Tooltip>
  );
}

export function FAR({ appendix, bold = true, section, paragraph = [], ...rest }: FARProps) {
  const paragraphArr = Array.isArray(paragraph) ? paragraph : [paragraph];
  const [farURI, linkText, tooltipText] = React.useMemo(() => {
    if (section) {
      let farURI = uri.far(section, ...paragraphArr);
      let linkText = `14 CFR §${section}`;
      if (paragraphArr.length) linkText += ' ' + paragraphArr.map((t) => `(${t})`).join('');
      return [farURI, linkText, getSectionDescription(section)];
    } else if (appendix) {
      const [part, letter] = appendix;
      const farURI = uri.farAppendix(part, letter);
      return [farURI, `14 CFR §${part} Appendix ${letter}`];
    } else {
      throw Error('FAR component must be provided with `appendix` or `section` prop!');
    }
  }, [appendix, section, paragraph]);

  return (
    <Tooltip message={tooltipText}>
      <Link bold={bold} href={farURI} {...rest}>
        {linkText}
      </Link>
    </Tooltip>
  );

  function getSectionDescription(section: Data.FAR.Section) {
    const identifiers = far.sections[section];
    let descriptors: string[] = [...far.sections[section]];

    // Add subpart if appropriate
    if (identifiers.length > 1) {
      const part = section.split('.')[0];
      const subpartId = (part + '.' + identifiers[0]) as Data.FAR.Subpart;
      descriptors[0] = far.subparts[subpartId];
    }

    // Add subject group if appropriate
    if (identifiers.length === 3) descriptors[1] = far.subject_groups[identifiers[1]];

    // Drop the descriptor if it's just "General"...
    return descriptors.filter((desc) => desc !== 'General').join(' - ');
  }
}
