import cn from 'classnames';
import NextImage from 'next/image';
import * as React from 'react';

import { useDimensions } from '../lib/hooks';
import { referenceURIs, uri } from '../lib/references';
import { ChildProp } from '../lib/types';
import { AppContext } from './context';
import { Link } from './Link';

type License = 'CC BY-SA 4.0' | 'CC BY-SA 3.0';

type VerticalPosition = 'bottom' | 'top';
type HorizontalPosition = 'left' | 'right' | 'center';
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

type ImageType = 'gif' | 'webp';
type ImageProps = Partial<ChildProp> & {
  noMargin?: boolean;
  noShadow?: boolean;
  src: string;
  type?: ImageType;
};

type ImageElement = React.ReactElement<ImageProps>;
type ImageRowProps = ChildProp<[ImageElement, ImageElement]>;

const licenseHrefs = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
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
          'left-1/2 translate-x-[-50%]': hPosition === 'center',
          'rounded-tr-lg': position === 'bottom-left',
          'rounded-t-lg': position === 'bottom-center',
          'rounded-tl-lg': position === 'bottom-right',
          'rounded-br-lg': position === 'top-left',
          'rounded-b-lg': position === 'top-center',
          'rounded-bl-lg': position === 'top-right',
        }
      )}
    >
      {titleNode} {titleAuthorConnection} {authorNode} {licenseElement}
    </div>
  );
}

export const Image = Object.assign(
  function Image(props: ImageProps) {
    const { children: caption, src, noMargin = false, noShadow = false, type = 'webp' } = props;
    const { section, structure } = React.useContext(AppContext);
    const { images } = structure;
    const fullSrc = [section, src].join('/');
    const dimensions = images && images[fullSrc];
    const hasCaption = !!caption;

    const attribution = (() => {
      if (section && section in attributions) {
        if (src in attributions[section]) {
          return <Attribution {...attributions[section][src]} />;
        }
      }
    })();

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
              src={`/img/${fullSrc}.${type}`}
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
    Row: ImageRow,
  }
);

function ImageRow({ children }: ImageRowProps) {
  const { breakpoints } = useDimensions();
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="md:flex-half">
        {React.cloneElement(children[0], { noMargin: breakpoints.isMedium })}
      </div>
      <div className="md:flex-half">
        {React.cloneElement(children[1], { noMargin: breakpoints.isMedium })}
      </div>
    </div>
  );
}

const references = {
  dma_explainer:
    'https://bruceair.wordpress.com/2020/11/10/redefining-designated-mountainous-areas/',
};

// Contains all attribution information for the images in the application
const attributions: Record<number, Record<string, AttributionProps>> = {
  1: {
    dma_chart: {
      className: 'text-black',
      author: 'BruceAir',
      link: references.dma_explainer,
    },
    lenticular_cloud: {
      title: 'Mayon Volcano with cloudy hat',
      author: 'Patryk Reba',
      license: 'CC BY-SA 4.0',
      link: 'https://commons.wikimedia.org/wiki/File:Mayon_Volcano_with_cloudy_hat.jpg',
    },
  },
  2: {
    ads_b: {
      author: 'Aeronautical Information Manual',
      className: 'text-black',
      linkOn: 'author',
      link: uri.aim(4, 5, 7),
      title: 'Figure 4-5-7',
      titleAuthorConnection: 'from the',
    },
    efd: {
      author: 'Instrument Flying Handbook',
      linkOn: 'author',
      link: referenceURIs['FAA-H-8083-15'],
      title: 'Figure 6-21/6-22',
      titleAuthorConnection: 'from the',
    },
    g1000_vor_id: {
      author: "G1000 Pilot's Guide",
      className: 'text-black',
      linkOn: 'author',
      link: referenceURIs.g1000,
      position: 'bottom-center',
      title: 'Figure 4-21',
      titleAuthorConnection: 'from the',
    },
    vor: {
      author: 'IFH',
      className: 'text-slate-300',
      linkOn: 'author',
      link: referenceURIs['FAA-H-8083-15'],
      position: 'bottom-right',
      title: 'Figure 9-12',
      titleAuthorConnection: 'from the',
    },
    vor_principle: {
      author: 'Orion 8',
      className: 'text-black',
      license: 'CC BY-SA 3.0',
      link: 'https://commons.wikimedia.org/wiki/File:VOR_principle.gif',
      title: 'VOR principle',
    },
    vor_service_volumes_legacy: {
      author: 'AIM',
      className: 'text-black',
      linkOn: 'author',
      link: uri.aim(1, 1, 8),
      position: 'top-left',
      title: 'Figure 1-1-1',
      titleAuthorConnection: 'from the',
    },
    vor_service_volumes_new: {
      author: 'AIM',
      className: 'text-black',
      linkOn: 'author',
      link: uri.aim(1, 1, 8),
      position: 'top-left',
      title: 'Figure 1-1-4',
      titleAuthorConnection: 'from the',
    },
  },
  4: {
    pfd_scan: {
      author: 'Instrument Flying Handbook',
      linkOn: 'author',
      position: 'bottom-right',
      link: referenceURIs['FAA-H-8083-15'],
      title: 'Figure 6-33',
      titleAuthorConnection: 'from the',
    },
  },
};
