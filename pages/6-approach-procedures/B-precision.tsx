import React from 'react';

import {
  AIM,
  Bold,
  Collapse,
  Image,
  Info,
  Italic,
  Link,
  Paragraph,
  Quotation,
  TaskPage,
  Term,
  ToDo,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Precision: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={6}
      task="B"
      notes={{
        k3: [
          <Paragraph heading="Ground-based navigation">
            <ToDo />
          </Paragraph>,

          <Paragraph heading="Satellite-based navigation">
            <ToDo />
          </Paragraph>,

          <Collapse heading="Why are LPV approaches not considered precision approaches?">
            <>
              Technically speaking, there are no satellite-based precision approaches in the NAS.
              However, there <Italic>are</Italic> satellite-based{' '}
              <Term>approaches with vertical guidance (APV)</Term>, namely the LPV approach.{' '}
              <Info>To me, it seems like a distinction without a difference.</Info>
            </>
            <Quotation source={<AIM paragraph={[1, 1, 18, 'b', 1]} />}>
              A class of approach procedures which provide vertical guidance, but which do not meet
              the <Bold>ICAO Annex 10 requirements for precision approaches</Bold> has been
              developed to support satellite navigation use for aviation applications worldwide.
              These procedures are not precision and are referred to as{' '}
              <Bold>Approach with Vertical Guidance (APV)</Bold>, are{' '}
              <Bold>defined in ICAO Annex 6</Bold>, and include approaches such as the LNAV/VNAV and
              localizer performance with vertical guidance (LPV).{' '}
              <Info>
                These approaches provide vertical guidance, but do not meet the more stringent
                standards of a precision approach.
              </Info>
            </Quotation>
            <>
              FlightInsight made an enlightening{' '}
              <Link href={references.lpv_precision_or_npa}>video about this topic</Link>, which
              references a specific table from ICAO Annex 10:
            </>
            <Image src="icao_annex_10" />,
            <>
              Note 3 in the image explicitly states that{' '}
              <Term>satellite-based augmentation system (SBAS)</Term> approaches with vertical
              guidance (i.e LPV approaches) are included in both types of Category I precision
              approaches. However, the AIM requires pilots to plan flight to an alternate airport as
              though LPV approaches were non-precision:
            </>
            <Quotation source={<AIM paragraph={[1, 1, 18, 'c', 9, 'a']} />}>
              When using WAAS at an alternate airport, flight planning must be based on flying the
              RNAV (GPS) LNAV or circling minima line...Part 91 non-precision weather requirements
              must be used for planning. Upon arrival at an alternate, when the WAAS navigation
              system indicates that LNAV/VNAV or LPV service is available, then vertical guidance
              may be used to complete the approach using the displayed level of service.
            </Quotation>
            <>
              <Info>Hence, LPV approaches are, in practice, precision approaches.</Info> For reasons
              unclear to the author they must be treated as non-precision approaches for the
              purposes of alternate planning, but that's the only real difference.
            </>
          </Collapse>,
        ],
      }}
    />
  );
};

export default Precision;

const references = {
  lpv_precision_or_npa: uri.youtube('YAfkYZx03Ew'),
};
