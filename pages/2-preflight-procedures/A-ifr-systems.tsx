import { NextPage } from 'next';
import React from 'react';

import { Bold, Info, Italic, Link, Quotation, TaskPage, Warning } from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(2, 'A') },
});

const IfrSystems: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        // Anti-icing/deicing systems
        k1: [
          <>
            The Cessna 172, my aircraft of choice for the checkride, is not equipped for{' '}
            <Bold>flight into known icing (FIKI)</Bold> and is not equipped with any anti-icing or
            deicing systems for the airframe, propeller, air intake or fuel system. Given that its
            engine is fuel-injected, induction icing is not typically a concern; however, the POH
            does say:
            <Quotation>
              An unexplained loss of engine power could be caused by ice blocking the air intake
              filter or in extremely rare instances ice completely blocking the fuel injection air
              reference tubes...In either case, the throttle should be positioned to obtain maximum
              RPM...The mixture should then be adjusted, as required, to obtain maximum RPM.
            </Quotation>
          </>,

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
            <Warning>periodically disconnect the autopilot and fly by hand.</Warning> Per{' '}
            <Link.Reference reference="AC 91-74" />:{' '}
          </>,

          <Quotation>
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
