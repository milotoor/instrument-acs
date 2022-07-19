import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React from 'react';

import { aimURI, farURI, referenceNames, referenceURIs } from '../lib/references';
import { ChildProp } from '../lib/types';
import { objectHasProperty } from '../lib/util';

type DetailListProps = ChildProp<React.ReactNode[]> & {
  bullet?: 'alpha' | 'decimal';
  delimeter?: string;
  logic?: 'and' | 'or' | null;
  type: 'bullet' | 'inline';
};

type AIMParagraphProps = { paragraph: [number, number, number] };
type FARSectionProps = { section: [number, number, ...(string | number)[]] };
type ImageProps = NextImageProps;
type LinkProps = NextLinkProps & ChildProp & { color?: string; title?: string };
type LinkableReference = keyof typeof referenceURIs;
type ReferenceLinkProps = { reference: LinkableReference; color?: string; text?: React.ReactNode };
type TooltipProps = ChildProp & { message?: string };

export function AIM({ paragraph: fullParagraph }: AIMParagraphProps) {
  const [chapter, section, paragraph] = fullParagraph;

  let uri = aimURI(chapter, section, paragraph);
  return (
    <Link href={uri}>
      AIM{' '}
      <span className="whitespace-nowrap">
        {chapter}-{section}-{paragraph}
      </span>
    </Link>
  );
}

export function Bold({ children }: ChildProp) {
  return <span className="font-bold">{children}</span>;
}

export function DetailList(props: DetailListProps) {
  const { bullet = 'decimal', children, delimeter = ',', logic = 'and', type } = props;
  const bgColor = 'bg-slate-200 hover:bg-slate-300';
  if (type === 'inline')
    return (
      <>
        {children.flatMap((child, i) => (
          <span key={i}>
            {i > 0 ? ' ' : ''}
            <span className={cn('italic', bgColor)}>
              {child}
              {i === children.length - 1 ? '' : delimeter}
            </span>
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

export function Image(props: ImageProps) {
  return (
    <div className="w-fit h-fit shadow-lg shadow-slate-900 m-auto mb-10">
      <NextImage {...props} />
    </div>
  );
}

export function Link({ color = 'text-fuchsia-500', href, ...rest }: LinkProps) {
  return (
    <span className={cn(color, 'hover:underline')}>
      {href.toString().startsWith('/') ? (
        <NextLink href={href} {...rest} />
      ) : (
        <a target="_blank" href={href.toString()} {...rest} />
      )}
    </span>
  );
}

export function ReferenceLink({ reference, color, text }: ReferenceLinkProps) {
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
      <Link color={color} href={referenceURIs[reference]}>
        {linkContent}
      </Link>
    </Tooltip>
  );
}

export const Tooltip = ({ message, children }: TooltipProps) => {
  const backgroundColor = 'gray-600';
  return (
    <div className="inline-block">
      <div className="relative flex flex-col items-center group">
        {children}
        {message && (
          <div className="absolute bottom-0 hidden mb-6 group-hover:block">
            <div
              className={`py-1 px-2 text-xs text-white rounded-md [width:max-content] shadow-md shadow-slate-700 bg-${backgroundColor}`}
            >
              {message}
            </div>
            <span
              className={`absolute top-[100%] left-1/2 -ml-[6px] border-[6px] border-solid border-transparent border-t-${backgroundColor}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
