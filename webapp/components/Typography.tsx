import cn from 'classnames';
import katex from 'katex';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import NextImage from 'next/image';
import React from 'react';

import { referenceNames, referenceURIs, uri } from '../lib/references';
import { ChildProp, Colors } from '../lib/types';
import { objectHasProperty } from '../lib/util';
import { AppContext } from './context';

type DetailListProps = ChildProp<React.ReactNode[]> & {
  bullet?: 'alpha' | 'decimal' | 'disc';
  delimeter?: string;
  logic?: 'and' | 'or' | null;
  type: 'bullet' | 'inline';
};

type EmphasizeProps = ChildProp & {
  bold?: boolean;
  color?: Colors.TextColor;
  gray?: boolean;
  italic?: boolean;
};

type ImageProps = Partial<ChildProp> & {
  src: string;
  noMargin?: boolean;
};

type ReferenceLinkProps = {
  bold?: boolean;
  color?: string | null;
  reference: LinkableReference;
  text?: React.ReactNode;
  title?: string;
};

type AIMParagraphProps = { paragraph: [number, number, number, ...(string | number)[]] };
type FARSectionProps = { section: [number, number, ...(string | number)[]] };
type KatexProps = ChildProp<string> & { block?: boolean } & React.HTMLAttributes<HTMLDivElement>;
type LinkProps = NextLinkProps & ChildProp & Omit<ReferenceLinkProps, 'reference' | 'text'>;
type LinkableReference = keyof typeof referenceURIs;
type TooltipProps = ChildProp & { message?: string };

export function AIM({ paragraph: fullParagraph }: AIMParagraphProps) {
  const [chapter, section, paragraph, ...rest] = fullParagraph;

  let aimURI = uri.aim(chapter, section, paragraph);
  const subsectionID = rest.length ? ' ' + rest.map((id) => `(${id})`).join('') : '';
  return (
    <Link href={aimURI}>
      AIM{' '}
      <span className="whitespace-nowrap">
        {chapter}-{section}-{paragraph} {subsectionID}
      </span>
    </Link>
  );
}

export function Bold(props: Omit<EmphasizeProps, 'bold'>) {
  return <Emphasize bold {...props} />;
}

export function Danger(props: Omit<EmphasizeProps, 'bold' | 'color'>) {
  return <Emphasize bold color="danger" {...props} />;
}

export function DetailList(props: DetailListProps) {
  const { bullet = 'decimal', children, delimeter = ',', logic = 'and', type } = props;
  if (type === 'inline')
    return (
      <>
        {children.flatMap((child, i) => (
          <span key={i}>
            {i > 0 ? ' ' : ''}
            <Gray italic>{child}</Gray>
            {i >= children.length - 2 ? '' : delimeter}
            {logic && i === children.length - 2 ? ` ${logic}` : ''}
          </span>
        ))}
      </>
    );

  return (
    <ol
      className={cn('ml-12 mt-2', {
        'list-decimal': bullet === 'decimal',
        'list-alpha': bullet === 'alpha',
        'list-disc': bullet === 'disc',
      })}
    >
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ol>
  );
}

export function Emphasize({
  bold = false,
  children,
  color,
  gray = false,
  italic = false,
}: EmphasizeProps) {
  return (
    <span
      className={cn({
        'font-bold': bold,
        italic,
        'bg-slate-200 hover:bg-slate-300': gray,
        'text-blue-500': color === 'cold',
        'text-amber-500': color && ['warning', 'warm'].includes(color),
        'text-red-500': color && ['danger', 'hot'].includes(color),
        'text-fuchsia-500': color === 'occluded',
      })}
    >
      {children}
    </span>
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
    <Link href={farURI}>
      14 CFR §{part}.{section}
      {paraText}
    </Link>
  );
}

export function Gray(props: Omit<EmphasizeProps, 'gray'>) {
  return <Emphasize gray {...props} />;
}

export function Image({ children: caption, src, noMargin = false }: ImageProps) {
  const { section, structure } = React.useContext(AppContext);
  const { images } = structure;
  const fullSrc = [section, src].join('/');
  const dimensions = images && images[fullSrc];
  const hasCaption = !!caption;

  return (
    <div
      className={cn({
        'mb-10': !noMargin && !hasCaption,
        'mb-5': !noMargin && hasCaption,
        'mb-2': noMargin,
      })}
    >
      <div className="flex flex-col items-center w-full">
        <div className="max-w-image shadow-lg shadow-slate-500 leading-[0]">
          <NextImage
            src={`/img/${fullSrc}.webp`}
            layout="intrinsic"
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
        {hasCaption && <div className="max-w-image px-3 text-xs mt-4">{caption}</div>}
      </div>
    </div>
  );
}

export function Italic(props: Omit<EmphasizeProps, 'italic'>) {
  return <Emphasize italic {...props} />;
}

export function Katex({ block = false, children, ...rest }: KatexProps) {
  const tex = children.replaceAll('[', '{').replaceAll(']', '}');
  return React.createElement(block ? 'div' : 'span', {
    ...rest,
    dangerouslySetInnerHTML: { __html: katex.renderToString(tex, { output: 'html' }) },
  });
}

export function Link({ bold, children, color = 'text-fuchsia-500', href, ...rest }: LinkProps) {
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
}

export function ReferenceLink({ reference, text, ...rest }: ReferenceLinkProps) {
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
}

export function ToDo() {
  return <span className="bg-yellow-300">To do</span>;
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="inline-block">
      <div className="relative flex flex-col items-center group">
        <span className={cn({ 'decoration-dotted decoration-fuchsia-500 underline': !!message })}>
          {children}
        </span>
        {message && (
          <div className="absolute bottom-0 hidden mb-6 group-hover:block">
            <div className="py-1 px-2 text-xs text-white rounded-md [width:max-content] shadow-md shadow-slate-700 bg-gray-600 max-w-xl">
              <Bold>{message}</Bold>
            </div>
            <span className="absolute top-[100%] left-1/2 -ml-[6px] border-[6px] border-solid border-transparent border-t-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}
