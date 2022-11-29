import React from 'react';

import { AIM, Bold, Collapse, Info, Link, Quotation, TaskPage, Warning } from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const IfrSystems: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={2}
      task="A"
      notes={{
        // Anti-icing/deicing systems
        k1: [
          <>
            The Cessna 172S, my aircraft of choice for the check ride, is not equipped for{' '}
            <Bold>flight into known icing (FIKI)</Bold> and is not equipped with any anti-icing or
            deicing systems for the airframe, propeller, air intake or fuel system. Given that its
            engine is fuel-injected, induction icing is not typically a concern; however, the POH
            does say:
          </>,

          <Quotation>
            An unexplained loss of engine power could be caused by ice blocking the air intake
            filter or in extremely rare instances ice completely blocking the fuel injection air
            reference tubes...In either case, the throttle should be positioned to obtain maximum
            RPM...The mixture should then be adjusted, as required, to obtain maximum RPM.
          </Quotation>,

          <Collapse heading="Known icing conditions">
            <>
              Many GA aircraft are forbidden to fly into such conditions by their AFM/POH. The
              Cessna 172 is one such aircraft (see the POH, section 2, "Kinds of Operations
              Limits"). While the FARs do not explicitly define the term, the AIM puts it like so:
            </>

            <Quotation source={<AIM paragraph={[7, 1, 20]} />}>
              Atmospheric conditions in which the formation of ice is observed or detected in
              flight.
            </Quotation>

            <>
              However, a{' '}
              <Link href={references.bell_interpretation}>2009 legal interpretation</Link> from the
              FAA declares that definition to be "not sufficiently broad to reflect the agency's
              position as set forth in this interpretation" and claims the FAA will take steps to
              revise it (13 years later, nothing...). The same interpretation provides the following
              guidance:
            </>

            <Quotation source={['2009 Bell interpretation', references.bell_interpretation]}>
              "Known icing conditions" involve...circumstances where a reasonable pilot would expect
              a substantial likelihood of ice formation on the aircraft based upon all information
              available to that pilot...The NTSB has held on a number of occasions that known icing
              conditions exist when a pilot knows or reasonably should know about weather reports in
              which icing conditions are reported or forecast.
            </Quotation>

            <>
              Hence, the best one can do is to examine weather reports and forecasts, synthesize
              that information into a coherent whole picture and apply one's best judgment.
            </>
          </Collapse>,

          <>
            <Info>The aircraft does have pitot heat to combat pitot icing.</Info> Turning it on is
            step number 1 of the <Bold>"INADVERTENT ICING ENCOUNTER DURING FLIGHT"</Bold> emergency
            checklist.
          </>,

          <>
            For reference, <Bold>deicing equipment</Bold> is for when frost, ice or snow is already
            contaminating a surface. Pneumatic boots are the most common form on light aircraft.{' '}
            <Bold>Anti-icing equipment</Bold> is to prevent the formation of frost or ice in the
            first place.
          </>,

          <>
            When flying in IMC, it is generally good practice to{' '}
            <Warning>periodically disconnect the autopilot and fly by hand:</Warning>
          </>,

          <Quotation source={<Link.Reference reference="AC 91-74" />}>
            When the autopilot is engaged, it can mask changes in handling characteristics due to
            aerodynamic effects of icing that would be detected by the pilot if the airplane were
            being hand flown.
          </Quotation>,
        ],
      }}
    />
  );
};

export default IfrSystems;

const references = {
  bell_interpretation: uri.faa.legal_interpretations(
    '2009/Bell-AOPA_2009_Legal_Interpretation.pdf'
  ),
};
