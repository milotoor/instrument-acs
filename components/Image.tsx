import cn from 'classnames';
import NextImage from 'next/image';
import * as React from 'react';
import { getChildByType, removeChildren } from 'react-nanny';

import { useDimensions } from '../lib/hooks';
import { ChildProp } from '../lib/types';
import { AppContext } from './context';
import { Link } from './Link';

type License = 'CC BY-SA 4.0';

type AttributionProps = {
  author: string;
  className?: string;
  license?: License;
  source: string;
  title?: string;
};

type ImageProps = Partial<ChildProp> & {
  src: string;
  noMargin?: boolean;
};

type ImageElement = React.ReactElement<ImageProps>;
type ImageRowProps = ChildProp<[ImageElement, ImageElement]>;

const licenseHrefs = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

function Attribution({ author, license, source, className, title }: AttributionProps) {
  const sourceText = title ? `"${title}"` : 'Image';
  const licenseElement = license ? (
    <span>
      is licensed under <Link href={licenseHrefs[license]}>{license}</Link>
    </span>
  ) : null;

  return (
    <span className={className}>
      <Link href={source}>{sourceText}</Link> by {author} {licenseElement}
    </span>
  );
}

export const Image = Object.assign(
  function Image({ children, src, noMargin = false }: ImageProps) {
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
          <div className="max-w-image shadow-lg shadow-slate-500 leading-[0] relative overflow-hidden">
            <NextImage
              src={`/img/${fullSrc}.webp`}
              layout="intrinsic"
              width={dimensions.width}
              height={dimensions.height}
            />
            {attribution && (
              <div className="text-xs text-white absolute bottom-0 left-0 px-2 py-1 bg-black/5 backdrop-blur-sm rounded-tr-lg">
                {attribution}
              </div>
            )}
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
