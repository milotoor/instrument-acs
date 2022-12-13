import cn from 'classnames';
import NextImage from 'next/image';
import * as React from 'react';

import { ChildProp, referenceURIs, uri } from '../lib';
import { AppContext } from './context';
import { Link } from './Link';

type License = 'CC BY-SA 4.0' | 'CC BY-SA 3.0';

type VerticalPosition = 'bottom' | 'top';
type HorizontalPosition = 'left' | 'right' | 'center';
type AttributionPosition = `${VerticalPosition}-${HorizontalPosition}`;
type AttributionTextColor = 'black' | 'slate' | 'white';
type AttributionProps = {
  author: string;
  color?: AttributionTextColor;
  license?: License;
  link: string;
  position?: AttributionPosition;
  title?: string;
  titleAuthorConnection?: string;
};

type ImageType = 'gif' | 'webp' | 'svg';
type ImageProps = Partial<ChildProp> & {
  directory?: string;
  noShadow?: boolean;
  src: string;
  type?: ImageType;
};

type ImageElement = React.ReactElement<ImageProps>;
type ImageRowAlignment = 'top' | 'center' | 'bottom';
type ImageRowProps = ChildProp<[ImageElement, ImageElement]> & { align?: ImageRowAlignment };

const licenseHrefs = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
};

const worksWithoutAuthors = [
  'Aeronautical Information Manual',
  'AIM',
  "G1000 Pilot's Guide",
  'IFH',
  'Instrument Flying Handbook',
  'TERPS supplement',
];

function Attribution(props: AttributionProps) {
  const { author, color = 'black', license, link, position = 'bottom-left', title } = props;

  const authorlessWork = worksWithoutAuthors.includes(author);
  let { titleAuthorConnection } = props;
  if (!titleAuthorConnection) {
    titleAuthorConnection = authorlessWork ? 'from the' : 'by';
  }

  const titleText = title ? `"${title}"` : 'Image';
  const licenseElement = license ? (
    <span>
      is licensed under <Link href={licenseHrefs[license]}>{license}</Link>
    </span>
  ) : null;

  const [titleNode, authorNode] = (() => {
    if (authorlessWork) return [titleText, <Link href={link}>{author}</Link>];
    return [<Link href={link}>{titleText}</Link>, author];
  })();

  const [vPosition, hPosition] = position.split('-') as [VerticalPosition, HorizontalPosition];
  return (
    <div
      className={cn('absolute px-2 py-1 bg-black/5 backdrop-blur-sm text-xs', {
        // Positioning
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

        // Colors
        'text-black': color === 'black',
        'text-slate-300': color === 'slate',
        'text-white': color === 'white',
      })}
    >
      {titleNode} {titleAuthorConnection} {authorNode} {licenseElement}
    </div>
  );
}

export const Image = Object.assign(
  function Image(props: ImageProps) {
    const { children: caption, directory, noShadow = false, src, type = 'webp' } = props;
    const { section, data } = React.useContext(AppContext);
    const { images } = data;
    const srcWithSection = [section || directory, src].join('/');
    const dimensions = images && images[srcWithSection];
    const hasCaption = !!caption;

    const attribution = (() => {
      if (section && section in attributions) {
        if (src in attributions[section]) {
          return <Attribution {...attributions[section][src]} />;
        }
      }
    })();

    const fullSrc = `/img/${srcWithSection}.${type}`;
    return (
      <div className="flex flex-col items-center w-full">
        <div
          className={cn('max-w-image leading-[0] relative overflow-hidden', {
            'shadow-lg shadow-slate-500': !noShadow,
          })}
        >
          <Link href={fullSrc}>
            <NextImage
              src={fullSrc}
              layout="intrinsic"
              width={dimensions.width}
              height={dimensions.height}
            />
          </Link>
          {attribution}
        </div>
        {hasCaption && <div className="max-w-image px-3 text-xs mt-4">{caption}</div>}
      </div>
    );
  },
  {
    Row: ImageRow,
  }
);

function ImageRow({ align = 'center', children }: ImageRowProps) {
  return (
    <div
      className={cn('flex flex-wrap justify-center', {
        'items-start': align === 'top',
        'items-center': align === 'center',
        'items-end': align === 'bottom',
      })}
    >
      <div className="md:flex-half">{children[0]}</div>
      <div className="md:flex-half">{children[1]}</div>
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
      author: 'BruceAir',
      link: references.dma_explainer,
    },
    lenticular_cloud: {
      author: 'Patryk Reba',
      color: 'white',
      license: 'CC BY-SA 4.0',
      link: 'https://commons.wikimedia.org/wiki/File:Mayon_Volcano_with_cloudy_hat.jpg',
      title: 'Mayon Volcano with cloudy hat',
    },
  },
  2: {
    ads_b: {
      author: 'Aeronautical Information Manual',
      link: uri.aim(4, 5, 7),
      title: 'Figure 4-5-7',
    },
    ads_b_display: {
      author: 'ForeFlight',
      color: 'white',
      link: 'https://support.foreflight.com/hc/en-us/articles/4406036663063-What-traffic-features-does-ForeFlight-Mobile-offer-',
      title: 'ADS-B Traffic Targets',
    },
    efd: {
      author: 'Instrument Flying Handbook',
      color: 'white',
      link: referenceURIs['FAA-H-8083-15'],
      title: 'Figure 6-21/6-22',
    },
    g1000_vor_id: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      position: 'bottom-center',
      title: 'Figure 4-21',
    },
    tis_block_diagram: {
      author: 'AIM',
      link: uri.aim(4, 5, 6),
      title: 'Figure 4-5-6',
    },
    vor: {
      author: 'IFH',
      color: 'slate',
      link: referenceURIs['FAA-H-8083-15'],
      position: 'bottom-right',
      title: 'Figure 9-12',
    },
    vor_principle: {
      author: 'Orion 8',
      license: 'CC BY-SA 3.0',
      link: 'https://commons.wikimedia.org/wiki/File:VOR_principle.gif',
      title: 'VOR principle',
    },
    vor_service_volumes_legacy: {
      author: 'AIM',
      link: uri.aim(1, 1, 8),
      position: 'top-left',
      title: 'Figure 1-1-1',
    },
    vor_service_volumes_new: {
      author: 'AIM',
      link: uri.aim(1, 1, 8),
      position: 'top-left',
      title: 'Figure 1-1-4',
    },
  },
  3: {
    hold_components: {
      author: 'AIM',
      link: uri.aim(5, 3, 8),
      title: 'Figure 5-3-3',
    },
    hold_entries: {
      author: 'AIM',
      link: uri.aim(5, 3, 8),
      position: 'bottom-right',
      title: 'Figure 5-3-4',
    },
  },
  4: {
    pfd_scan: {
      author: 'Instrument Flying Handbook',
      color: 'white',
      link: referenceURIs['FAA-H-8083-15'],
      position: 'bottom-right',
      title: 'Figure 6-33',
    },
    unusual_attitude_chevrons: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      title: 'Figure 2-41',
    },
  },
  6: {
    cdi_diagram: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      title: 'Figure 2-19',
    },
    cdi_enunciations: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      position: 'bottom-right',
      title: 'Table 2-1',
    },
    circling_approach_area: {
      author: 'AIM',
      link: uri.aim(5, 4, 20),
      position: 'bottom-right',
      title: 'Figure 5-4-27',
    },
    circling_approach_radii: {
      author: 'AIM',
      link: uri.aim(5, 4, 20),
      position: 'top-right',
      title: 'Figure 5-4-28',
    },
    circling_missed_approach: {
      author: 'AIM',
      link: uri.aim(5, 4, 21),
      position: 'bottom-right',
      title: 'Figure 5-4-30',
    },
    circling_patterns: {
      author: 'Instrument Flying Handbook',
      color: 'white',
      link: referenceURIs['FAA-H-8083-15'],
      title: 'Figure 10-13',
    },
    gps_cdi_scaling_phases: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      position: 'bottom-right',
      title: 'Figure 2-23 Automatic CDI Scaling',
    },
    ils_diagram: {
      author: 'AIM',
      link: uri.aim(1, 1, 9),
      title: 'FAA Instrument Landing Systems',
    },
    inop_components_table: {
      author: 'TERPS supplement',
      link: referenceURIs['TERPS supplement'],
      position: 'bottom-right',
      title: 'Inoperative Components or Visual Aids Table',
    },
    lnav_cdi_scaling: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      title: 'Figure 2-24',
    },
    localizer_limitations: {
      author: 'AIM',
      link: uri.aim(1, 1, 9),
      title: 'Limits of Localizer Coverage',
    },
    lpv_cdi_scaling: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      position: 'bottom-right',
      title: 'Figure 2-25',
    },
    procedure_turn: {
      author: 'AIM',
      link: uri.aim(5, 4, 9),
      position: 'bottom-right',
      title: 'Figure 5-4-18',
    },
    raim_prediction: {
      author: "G1000 Pilot's Guide",
      link: referenceURIs.g1000,
      position: 'top-right',
      title: 'Figure 5-107 RAIM Prediction',
    },
    vgsi: {
      author: 'Cmglee',
      color: 'white',
      license: 'CC BY-SA 4.0',
      link: 'https://commons.wikimedia.org/wiki/File:Comparison_visual_landing_systems.svg',
      position: 'bottom-right',
      title: 'Comparison visual landing systems',
    },
  },
};
