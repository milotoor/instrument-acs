import cn from 'classnames';
import NextImage from 'next/image';
import * as React from 'react';
import { getChildByType, removeChildren } from 'react-nanny';

import { useDimensions } from '../lib/hooks';
import { ChildProp } from '../lib/types';
import { AppContext } from './context';
import { Link } from './Link';

type License = 'CC BY-SA 4.0';

type VerticalPosition = 'bottom' | 'top';
type HorizontalPosition = 'left' | 'right';
type AttributionPosition = `${VerticalPosition}-${HorizontalPosition}`;
type AttributionProps = {
  author: string;
  className?: string;
  license?: License;
  link: string;
  linkOn?: 'title' | 'author';
  position?: AttributionPosition;
  title?: string;
  titleAuthorConnection?: string;
};

type ImageProps = Partial<ChildProp> & {
  noMargin?: boolean;
  noShadow?: boolean;
  src: string;
};

type ImageElement = React.ReactElement<ImageProps>;
type ImageRowProps = ChildProp<[ImageElement, ImageElement]>;

const licenseHrefs = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

function Attribution({
  author,
  className,
  license,
  link,
  linkOn = 'title',
  position = 'bottom-left',
  title,
  titleAuthorConnection = 'by',
}: AttributionProps) {
  const titleText = title ? `"${title}"` : 'Image';
  const licenseElement = license ? (
    <span>
      is licensed under <Link href={licenseHrefs[license]}>{license}</Link>
    </span>
  ) : null;

  const [titleNode, authorNode] = (() => {
    if (linkOn === 'title') return [<Link href={link}>{titleText}</Link>, author];
    return [titleText, <Link href={link}>{author}</Link>];
  })();

  const [vPosition, hPosition] = position.split('-') as [VerticalPosition, HorizontalPosition];
  return (
    <div
      className={cn(
        className,
        'absolute px-2 py-1 bg-black/5 backdrop-blur-sm text-xs text-white',
        {
          'bottom-0': vPosition === 'bottom',
          'left-0': hPosition === 'left',
          'top-0': vPosition === 'top',
          'right-0': hPosition === 'right',
          'rounded-tr-lg': position === 'bottom-left',
          'rounded-tl-lg': position === 'bottom-right',
          'rounded-br-lg': position === 'top-left',
          'rounded-bl-lg': position === 'top-right',
        }
      )}
    >
      {titleNode} {titleAuthorConnection} {authorNode} {licenseElement}
    </div>
  );
}

export const Image = Object.assign(
  function Image({ children, src, noMargin = false, noShadow = false }: ImageProps) {
    const { section, structure } = React.useContext(AppContext);
    const { images } = structure;
    const fullSrc = [section, src].join('/');
    const dimensions = images && images[fullSrc];
    const attribution = getChildByType(children, Attribution);
    const caption = removeChildren(children, (child) => {
      if (React.isValidElement(child)) return child.type === Attribution;
      return false;
    });
    const hasCaption = caption.length > 0;

    return (
      <div
        className={cn({
          'mb-10': !noMargin && !hasCaption,
          'mb-5': !noMargin && hasCaption,
          'mb-2': noMargin,
        })}
      >
        <div className="flex flex-col items-center w-full">
          <div
            className={cn('max-w-image leading-[0] relative overflow-hidden', {
              'shadow-lg shadow-slate-500': !noShadow,
            })}
          >
            <NextImage
              src={`/img/${fullSrc}.webp`}
              layout="intrinsic"
              width={dimensions.width}
              height={dimensions.height}
            />
            {attribution}
          </div>
          {hasCaption && <div className="max-w-image px-3 text-xs mt-4">{caption}</div>}
        </div>
      </div>
    );
  },
  {
    Attribution,
    Row: ImageRow,
  }
);

function ImageRow({ children }: ImageRowProps) {
  const { breakpoints } = useDimensions();
  return (
    <div className="flex flex-wrap justify-center">
      <div className="md:flex-half">
        {React.cloneElement(children[0], { noMargin: breakpoints.isMedium })}
      </div>
      <div className="md:flex-half">
        {React.cloneElement(children[1], { noMargin: breakpoints.isMedium })}
      </div>
    </div>
  );
}
