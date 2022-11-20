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
  Success,
  TaskPage,
  Term,
  ToDo,
  Warning,
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
        k1: [
          <>
            The crucial difference between a non-precision approach and a precision approach is the{' '}
            <Info>presence of official vertical guidance after the FAF.</Info> A precision approach
            provides you with a glideslope to follow at a stable descent rate; no dive and drive
            here. As a consequence of this design, pilots are expected to make the land/go-missed
            decision while still in a descent. For this reason, precision approaches have a{' '}
            <Term>decision altitude/height (DA/DH)</Term>, not a{' '}
            <Term>minimum descent altitude (MDA)</Term>.
          </>,

          <>
            As the name implies,{' '}
            <Info>
              the DA is the altitude at which the pilot must <Italic>decide</Italic> if they are
              going to continue the approach to a landing or abort.
            </Info>{' '}
            Unlike an MDA, a DA is <Italic>not</Italic> the lowest altitude that your aircraft will
            descend to prior to going missed;{' '}
            <Success>
              it is understood that the aircraft will continue to descend momentarily after making
              the decision to abort.
            </Success>
          </>,

          <>
            Determining the DA is typically straightforward. It is listed on FAA and Jeppesen charts
            by aircraft category. However,{' '}
            <Warning>
              there may be notes which adjust the DA based upon the availability of a local
              altimeter setting and/or inoperative airport equipment.
            </Warning>{' '}
            Jeppesen charts always present the DA in a consistent manner; the FAA charts may require
            a bit of interpretation. For instance, consider the{' '}
            <Link.Approach type="ILS" name="Salinas" icao="KSNS" rwy={31} id="00363I31" />:
          </>,

          <Image.Row>
            <>
              <Image src="sns_ils_31_faa_notes" />
              <div className="mt-3">
                <Image src="sns_ils_31_faa_profile">
                  The FAA chart presents the DA beneath the profile view, and includes the modifying
                  note(s) above the plan view.
                </Image>
              </div>
            </>
            <Image src="sns_ils_31_jep">
              Jeppesen interprets the note for you and presents the two different DA values with
              their proper context.
            </Image>
          </Image.Row>,

          <>
            <Success>
              The relevant information is easier to find on the Jeppesen chart, thanks to their
              smart chart design and meticulous note interpretation.
            </Success>{' '}
            This is one of many reasons that Jeppesen charts are preferred by many Part 121/135
            operators. In addition to showing the two possible DAs (the standard DA and the one to
            use in case the Monterey altimeter is required), the Jeppesen chart also helpfully lists
            the inoperative equipment visibility requirements. The "RVR 40 or ¾" visibility
            requirement (when using the local altimeter setting while the RAIL/ALS is out) is
            derived from the Inop Components table from the{' '}
            <Link href={references.terps_supplement}>TERPS supplement</Link> (an ILS with minimum
            RVR other than 1800, 2000 or 2200 should increase its required visibility by ¼ SM).
          </>,
        ],
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
  terps_supplement: 'https://www.1800wxbrief.com/Website/aip/tpp/FRNTMATTER.pdf',
};
