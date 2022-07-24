import cn from 'classnames';
import katex from 'katex';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React from 'react';

import { referenceNames, referenceURIs, uri } from '../lib/references';
import { ChildProp, Colors } from '../lib/types';
import { objectHasProperty } from '../lib/util';

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

type ImageProps = Pick<NextImageProps, 'src'> & {
  dimensions: [number, number];
  width?: number;
  height?: number;
  noMargin?: boolean;
};

type ReferenceLinkProps = {
  bold?: boolean;
  color?: string | null;
  reference: LinkableReference;
  text?: React.ReactNode;
  title?: string;
};

type AIMParagraphProps = { paragraph: [number, number, number] };
type FARSectionProps = { section: [number, number, ...(string | number)[]] };
type KatexProps = ChildProp<string> & { block?: boolean } & React.HTMLAttributes<HTMLDivElement>;
type LinkProps = NextLinkProps & ChildProp & Omit<ReferenceLinkProps, 'reference' | 'text'>;
type LinkableReference = keyof typeof referenceURIs;
type TooltipProps = ChildProp & { message?: string };

export function AIM({ paragraph: fullParagraph }: AIMParagraphProps) {
  const [chapter, section, paragraph] = fullParagraph;

  let aimURI = uri.aim(chapter, section, paragraph);
  return (
    <Link href={aimURI}>
      AIM{' '}
      <span className="whitespace-nowrap">
        {chapter}-{section}-{paragraph}
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
            <Gray italic>
              {child}
              {i === children.length - 1 ? '' : delimeter}
            </Gray>
            {logic && i === children.length - 2 ? ` ${logic}` : ''}
          </span>
        ))}
      </>
    );

  return (
    <ol className={`list-${bullet} ml-12 mt-2`}>
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
        'text-blue-500': color === 'cold-front',
        'text-red-500': color && ['danger', 'warm-front'].includes(color),
        'text-fuchsia-500': color === 'occluded-front',
      })}
    >
      {children}
    </span>
  );
}

export function FAR({ section: fullSection }: FARSectionProps) {
  const [part, section, ...paragraph] = fullSection;
  const paraArray = Array.isArray(paragraph) ? paragraph : [paragraph];

  let farURI = uri.far(part, section);
  if (paraArray && paraArray.length) {
    farURI += `#${paraArray.join('_')}`;
  }

  const paraText = paraArray.length ? ' ' + paraArray.map((t) => `(${t})`).join('') : null;
  return (
    <Link href={farURI}>
      §{part}.{section}
      {paraText}
    </Link>
  );
}

export function Gray(props: Omit<EmphasizeProps, 'gray'>) {
  return <Emphasize gray {...props} />;
}

export function Image({ src, dimensions, width, height, noMargin = false }: ImageProps) {
  const [w, h] = (() => {
    if (typeof width === 'number' && typeof height === 'number') return [width, height];
    if (typeof width === 'number') return [width, (width / dimensions[0]) * dimensions[1]];
    if (typeof height === 'number') return [(height / dimensions[1]) * dimensions[0], height];
    return dimensions;
  })();

  return (
    <div
      className={cn(`shadow-lg shadow-slate-500 m-auto relative`, {
        'mb-10': !noMargin,
        'mb-2': noMargin,
      })}
      style={{ width: w, height: h }}
    >
      <NextImage src={`/img/${src}.webp`} layout="fill" />
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

export function Link({ bold, color = 'text-fuchsia-500', href, ...rest }: LinkProps) {
  return (
    <span className={cn('hover:underline', color, { 'text-inherit': color === null })}>
      <Emphasize bold={bold}>
        {href.toString().startsWith('/') ? (
          <NextLink href={href} {...rest} />
        ) : (
          <a target="_blank" href={href.toString()} {...rest} />
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

export const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="inline-block">
      <div className="relative flex flex-col items-center group">
        {children}
        {message && (
          <div className="absolute bottom-0 hidden mb-6 group-hover:block">
            <div className="py-1 px-2 text-xs text-white rounded-md [width:max-content] shadow-md shadow-slate-700 bg-gray-600">
              <Bold>{message}</Bold>
            </div>
            <span className="absolute top-[100%] left-1/2 -ml-[6px] border-[6px] border-solid border-transparent border-t-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};
