import { NextPage } from 'next';
import React from 'react';

import { Bold, BulletList, FAR, InlineList, Link, TaskPage } from '../../components';
import { getStaticPropFns } from '../../server';

export const getStaticProps = getStaticPropFns.task(1, 'A');
const PilotQualifications: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        // Certification requirements, recency of experience, recordkeeping
        k1: [
          <>
            <Bold>Recency of experience requirements</Bold> are clearly described in{' '}
            <FAR section={[61, 57, 'c', 1]} />. These include recording in the last 6 months:{' '}
            <InlineList>
              <>six instrument approaches</>
              <>holding procedures and tasks</>
              <>
                intercepting and tracking courses through the use of navigational electronic systems
              </>
            </InlineList>
            . These things may be accomplished in an aircraft, a full flight simulator, flight
            training device (FTD), aviation training device (ATD) or a combination thereof, provided
            the device represents the category of aircraft for the instrument rating privileges.
          </>,

          <>
            For recordkeeping, the pilot must log the{' '}
            <Bold>location and type of each instrument approach</Bold> and the name of the safety
            pilot if required. See <FAR section={[61, 51, 'g']} />. The FAA's{' '}
            <Link.Reference reference="InFO 15012" /> specifies that an approach can only be logged
            if{' '}
            <BulletList>
              <>
                the aircraft is operated solely by reference to instruments in actual or simulated
                IMC (one or both of "Actual IMC" and "Simulated IMC" must also be logged)
              </>
              <>the simulated IMC continues to MDA or DA</>
              <>
                the approach is flown to minimums (i.e. going missed before MDA or DA is not
                allowed)
              </>
              <>the aircraft breaks out of IMC after the FAF, prior to or upon reaching MDA or DA</>
            </BulletList>
          </>,

          <>
            If your recent experience lapses, you have another six months to regain currency. This
            can be done with a CFI or safety pilot, but until currency is regained you may not
            operate as PIC under IFR. If <span className="italic">those</span> six months lapse,
            your only option is an <Bold>instrument proficiency check</Bold> (see{' '}
            <FAR section={[61, 57, 'd']} />
            ). This basically means taking your checkride again, so don't let that happen.
          </>,
        ],

        // Privileges and limitations
        k2: [
          <>
            Per <FAR section={[61, 3]} />, having an instrument rating allows a pilot to operate:
            <BulletList>
              <>under IFR</>
              <>in weather conditions less than the minima for VFR flight</>
              <>in Class A airspace</>
              <>
                for hire (assuming the pilot has a commercial license) at night or cross-country
                beyond 50 nautical miles
              </>
            </BulletList>
          </>,

          <>
            A <Bold>safety pilot</Bold> must{' '}
            <InlineList>
              <>possess at least a private pilot certificate</>
              <>sit in the other control seat</>
              <>be appropriately rated in the aircraft's category and class</>
              <>
                possess a current medical certificate (because the FAA considers them a required
                crewmember)
              </>
            </InlineList>
            . See <FAR section={[91, 109, 'c', 1]} /> and <FAR section={[61, 3, 'c', 1]} />.
          </>,
        ],

        // BasicMed
        k3: [
          <>
            Per <FAR section={[61, 113, 'i']} />, a private pilot with a U.S. driver's license but
            no medical certificate may act as PIC of an aircraft if it{' '}
            <InlineList>
              <>is authorized to carry 6 or fewer occupants</>
              <>weighs at most 6,000 pounds</>
            </InlineList>
          </>,
          <>
            The flight may not{' '}
            <InlineList logic="or">
              <>be carried out at or above 18,000 feet</>
              <>attain an indicated airspeed of 250 knots or greater</>
            </InlineList>
          </>,
          <>
            They are required to have the <Bold>medical examination checklist</Bold> required by{' '}
            <FAR section={[68, 7]} /> and <Bold>medical education course certificate</Bold> (see{' '}
            <FAR section={[68, 3]} />) in their logbook. To act as PIC on an IFR flight plan they
            must have an instrument rating and be current.
          </>,
        ],
      }}
    />
  );
};

export default PilotQualifications;
