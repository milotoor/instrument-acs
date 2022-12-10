import React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  FAR,
  Info,
  InlineList,
  Link,
  Quotation,
  ReferenceList,
  Success,
  TaskPage,
  Warning,
} from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const PilotQualifications: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={1}
      task="A"
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
            For record-keeping,{' '}
            <Info>
              the pilot must log the <Bold>location and type of each instrument approach</Bold> and
              the name of the safety pilot if there is one.
            </Info>{' '}
            See <FAR section={[61, 51, 'g']} />. The FAA's <Link.Reference reference="InFO 15012" />{' '}
            specifies that an approach can only be logged if{' '}
            <BulletList type="decimal">
              <>
                the aircraft is{' '}
                <Bold>operated solely by reference to instruments in actual or simulated IMC</Bold>{' '}
                (one or both of "Actual IMC" and "Simulated IMC" must also be logged)
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
            can be done with a CFI or safety pilot, but{' '}
            <Warning>until currency is regained you may not operate as PIC under IFR.</Warning> If{' '}
            <span className="italic">those</span> six months lapse, your only option is an{' '}
            <Bold>instrument proficiency check</Bold> (see <FAR section={[61, 57, 'd']} />
            ). <Danger>This basically means taking your check ride again,</Danger> so don't let that
            happen.
          </>,
        ],

        // Privileges and limitations
        k2: [
          <>
            <Quotation source={<FAR section={[61, 3, 'e']} />}>
              No person may act as <Bold>pilot in command</Bold> of a civil aircraft{' '}
              <Bold>
                under IFR or in weather conditions less than the minimums prescribed for VFR flight
              </Bold>{' '}
              unless that person holds...the appropriate aircraft category, class, type (if
              required), and <Bold>instrument rating</Bold> on that person's pilot certificate for
              any airplane, helicopter, or powered-lift being flown
            </Quotation>
          </>,

          <>
            Additionally, an instrument rating is required{' '}
            <InlineList logic="or">
              <>to fly in Class A airspace</>
              <>
                for hire at night or cross-country beyond 50 nautical miles (assuming the pilot has
                a commercial license)
              </>
            </InlineList>
            .
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
          <ReferenceList
            references={[<FAR section={[61, 113, 'i']} />, <FAR section={[61, 23, 'c', 3]} />]}
          />,
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
            They are required to have the <Info>medical examination checklist</Info> required by{' '}
            <FAR section={[68, 7]} /> and <Info>medical education course certificate</Info> (see{' '}
            <FAR section={[68, 3]} />) in their logbook. To act as PIC on an IFR flight plan they
            must have an instrument rating and be current.
          </>,
        ],

        // Currency vs. proficiency
        r1: (
          <>
            Currency means legal. Proficient means safe. My plan to maintain proficiency (and
            currency) is to{' '}
            <Info>
              routinely fly in the sim with my group of PilotBuddies, and help coach others on their
              own IFR journey.
            </Info>
          </>
        ),

        // Personal minimums
        r2: [
          <>
            My personal minimums are going to be very restrictive for a while. At a little less than
            200 hours total, I am still smack in the middle of{' '}
            <Link href={references.killing_zone}>the killing zone</Link>, in which a
            disproportionate number of relatively new pilots die, largely due to inexperience and
            poor ADM.{' '}
            <Danger>
              These pilots are flying as PIC without needing the sign-off of an instructor. They
              over-challenge themselves (or simply don't consider the challenge they're embracing),
              get into trouble and kill themselves and their unwitting passengers.
            </Danger>
          </>,

          <>
            I do not wish for this to happen to me. Thus,{' '}
            <Success>
              I will be restricting the flights I undertake as I build more experience.
            </Success>{' '}
            The tentative plan is this:
            <BulletList type="disc">
              <>
                To begin with, I am not going to fly at all in IMC. I first want to get some solo
                time flying IFR in VMC. I hope this will build confidence and allow me some time to
                navigate the procedural world of IFR on my own.
              </>
              <>
                Once I feel confident enough about flying single-pilot IFR,{' '}
                <Success>I will allow myself to fly in IMC</Success> but{' '}
                <Warning>
                  only to circling minimums, and never at night nor over mountainous terrain
                </Warning>{' '}
                (though my definition of mountainous will differ from the FAA's).
              </>
              <>
                Further down the line perhaps I will relax some of those constraints further, but
                it's not yet clear to me when that will be.
              </>
            </BulletList>
          </>,
        ],

        // Fitness for flight
        r3: [
          <>
            Of course, the standard <Bold>IMSAFE checklist</Bold> applies:
            <BulletList type="disc">
              <>
                <Bold>I</Bold>llness
              </>
              <>
                <Bold>M</Bold>edication
              </>
              <>
                <Bold>S</Bold>tress
              </>
              <>
                <Bold>A</Bold>locohol
              </>
              <>
                <Bold>F</Bold>atigue
              </>
              <>
                <Bold>E</Bold>motion/eating
              </>
            </BulletList>
          </>,

          <>
            However, the same checklist should not have the exact same meanings/implications for IFR
            flight as it does for VFR.{' '}
            <Info>
              Flying IFR is a more mentally challenging activity than flying VFR. Therefore, it's
              appropriate to have a different (read: lower) threshold for acceptable risk when
              evaluating one's fitness to fly IFR.
            </Info>
          </>,
        ],
      }}
    />
  );
};

export default PilotQualifications;

const references = {
  killing_zone: 'https://www.amazon.com/Killing-Zone-Second-How-Pilots/dp/0071798404',
};
