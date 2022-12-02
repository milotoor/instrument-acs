import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  FAR,
  Image,
  Info,
  InlineList,
  Italic,
  Link,
  Paragraph,
  Quotation,
  Success,
  TaskPage,
  Warning,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Circling: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={6}
      task="D"
      notes={{
        k1: [
          <>
            A "circling approach" is a term used to describe several different scenarios:
            <BulletList type="decimal">
              <>An approach aligned with a runway, but not the runway you intend to land on</>
              <>
                An approach aligned with a runway, but which is too steep to safely perform as a
                straight-in approach (e.g. the{' '}
                <Link.Approach type="VOR" circling="A" name="Roseburg" icao="KRBG" id="00888VA" />)
              </>
              <>An approach not aligned within 30° of any runway</>
            </BulletList>
          </>,

          <>
            They can be very tricky, and are especially important to properly brief.{' '}
            <InlineList delimiter="" logic={null}>
              <>How are you going to circle to your runway of intended landing?</>
              <>How will you ensure obstacle clearance during your turning maneuver?</>
              <>
                What will you do if you lose sight of the airport/have to go missed while circling?
              </>
            </InlineList>{' '}
            <Warning>These are very important questions to answer beforehand.</Warning>
          </>,

          <Paragraph
            heading="The protected area"
            references={<AIM paragraph={[5, 4, 20, 'b', 1]} />}
          >
            The protected area for a circling approach differs from that of a straight-in.
          </Paragraph>,

          <Image src="circling_approach_area">
            The value of "r" depends upon aircraft approach category and airport altitude.
          </Image>,

          <>
            The egg-shaped area encircling the runway complex in the image above is the circling
            protected area. It is constructed by drawing circles of radius "r" at the ends of each
            runway and connecting those circles together into a{' '}
            <Link href={references.convex_hull}>convex hull</Link>. The value of "r" depends upon
            aircraft approach category and airport altitude:
          </>,

          <Image src="circling_approach_radii" />,

          <>
            For category A aircraft (what most of us train in) the radius is either 1.3 or 1.4 NM.{' '}
            <Info>
              Within this area, you are guaranteed at least 300 feet of obstacle clearance.
            </Info>
          </>,

          <Paragraph heading="Which way?">
            How you circle depends on a variety of factors. It's simplest at towered airports, which
            will typically instruct you how to do so by specifying the direction.{' '}
            <Warning>However, at non-towered airports you're on your own.</Warning> You still have
            guidance though, and there are several items to check when planning your circling
            pattern:
            <BulletList type="disc">
              <>
                <Bold>Are there any circling prohibitions on the chart?</Bold>{' '}
                <Info>There may be notes prohibiting usage of portions of the circling area</Info>{' '}
                (e.g. "Circling NA west of Rwy 1-19", as seen on the{' '}
                <Link.Approach type="VOR" rwy={1} name="Jackson Hole" icao="KJAC" id="00504V1" />
                ), or outright prohibiting circling to a specific runway. Additionally, circling is
                often prohibited at night.
              </>
              <>
                <Bold>What direction does the airport/runway's traffic pattern look like?</Bold>{' '}
                This is important information for multiple reasons. Most importantly, on a day when
                VFR traffic might reasonably be in the pattern, you should assume that the pattern
                is occupied and plan to integrate with that traffic. Additionally, FAA legal counsel
                has issued letters of interpretation affirming that circling approaches to
                non-towered airports must make turns in the direction specified for the pattern.
                See, e.g., the{' '}
                <Link href={references.murphy_interpretation}>2009 Murphy interpretation</Link>,
                which references <FAR section={[91, 126]} />.
                <div className="pt-3">
                  In the author's humble opinion this is an absurd interpretation lacking
                  consistency with other rules of air traffic. The interpretation states that pilots
                  may request a clearance from ATC to fly a non-standard pattern{' '}
                  <Italic>at an uncontrolled field</Italic>, a request ATC doesn't have the
                  authority to grant by definition. (This particular statement was dismissed by a
                  later interpretation) Even disregarding that oddity, there are approaches where
                  circling is allowed but not permitted on the side of the airport where the traffic
                  pattern exists (e.g. the chart for the{' '}
                  <Link.Approach
                    type="RNAV (GPS)"
                    rwy={13}
                    name="Wasau Downtown"
                    icao="KAUW"
                    id="00874R13"
                  />{' '}
                  prohibits circling southwest of runway 13-31, but runway 31 is left traffic). Any
                  reasonable pilot would determine that they should circle on the other side of the
                  airport where circling is permitted, but the Murphy interpretation ostensibly
                  makes that a violation <FAR section={[91, 126, 'b', 1]} />
                  ...
                </div>
              </>
              <>
                <Bold>Where is the wind coming from?</Bold> Suppose you're landing with a crosswind.{' '}
                <Success>
                  Given the choice of circling directions, you should choose the direction with a
                  headwind on the base leg.
                </Success>{' '}
                This mitigates the chances of overshooting final, and thus mitigates the likelihood
                of a missed approach or a low altitude stall-spin accident.
              </>
            </BulletList>
          </Paragraph>,

          <Image src="circling_patterns" />,

          <Paragraph heading="Maneuvering to land">
            Once you{' '}
            <InlineList>
              <>have the airport in sight</>
              <>are within the circling protected area</>
            </InlineList>
            , you may leave the final approach course and begin circling.{' '}
            <Info>
              Throughout the entirety of this maneuver you must keep the airport visually in sight,
            </Info>{' '}
            although temporarily losing sight during a turn (when the aircraft itself blocks your
            view) is permissible.{' '}
            <Warning>
              If at any point you lose sight of the airport, you must immediately execute the missed
              approach.
            </Warning>
          </Paragraph>,

          <Paragraph
            heading="Going missed"
            references={[
              <AIM paragraph={[5, 4, 20, 'b', 1]} />,
              <AIM paragraph={[5, 4, 21, 'c & h']} />,
            ]}
          >
            The AIM puts the risks involved in plain English:
            <Quotation source={<AIM paragraph={[5, 4, 20, 'b', 1]} />}>
              Executing the missed approach after starting to maneuver usually places the aircraft
              beyond the MAP. The aircraft is clear of obstacles when at or above the MDA while
              inside the circling area, but simply joining the missed approach ground track from the
              circling maneuver may not provide vertical obstacle clearance once the aircraft exits
              the circling area. Additional climb inside the circling area may be required before
              joining the missed approach track.
            </Quotation>
          </Paragraph>,

          <>
            You should follow the missed approach for the procedure you were cleared for. The
            challenge is getting on course at a safe altitude to proceed. Per{' '}
            <AIM paragraph={[5, 4, 21, 'c']} />:{' '}
            <Quotation inline>
              To become established on the prescribed missed approach course,{' '}
              <Success>
                the pilot should make an initial climbing turn toward the landing runway and
                continue the turn until established on the missed approach course.
              </Success>
            </Quotation>{' '}
            <AIM paragraph={[5, 4, 21, 'h']} /> adds that a "circle-climb over the airport" may be
            appropriate. The decision is left up to "pilot judgment."
          </>,

          <Image src="circling_missed_approach" />,
        ],
        r2: (
          <>
            <Success>Set conservative personal minimums for circling approaches.</Success> If you'd
            be willing to fly in the pattern VFR then perhaps a circling approach isn't so bad.{' '}
            <Warning>
              If conditions are poor enough that a VFR pattern sounds uncomfortable, stick to
              straight-in.
            </Warning>
          </>
        ),
        s6: [
          <>
            Be wary of high circling MDAs. An MDA significantly above the typical pattern altitude
            poses two specific challenges:
            <BulletList type="decimal">
              <>
                <Warning>The high altitude may lead a pilot to fly too large of a pattern.</Warning>{' '}
                The protected area for category A aircraft is at most 1.4 NM laterally from the
                runway, and usually only 1.3 NM. This distance can comfortably fit a normal pattern,
                but if you are far above pattern altitude the visual perspective may cause you to
                fly further away.{' '}
                <Success>Monitor the GPS to ensure you stay within the protected area.</Success>
              </>
              <>
                Flying further from the airport is hazardous, because{' '}
                <Warning>the MDA is high for a reason.</Warning> There are significant obstacles out
                there, and even though it may seem like you are well above the airport and far from
                the ground, something within the protected area is lurking.{' '}
                <Success>
                  Be aware of what's causing the high MDA, and be prepared for a faster-than-usual
                  descent.
                </Success>
              </>
            </BulletList>
          </>,

          <>
            Also,{' '}
            <Success>
              pay attention to the circling minima for aircraft belonging to other approach
              categories.
            </Success>{' '}
            The MDA is frequently the same for category A and B aircraft, which means you can safely
            use the larger class B protected area.{' '}
            <Info>
              If weather permits, consider descending only to the category C or even D line of
              minima, which will give you an even greater area to work within.
            </Info>{' '}
            Just don't forget about the higher MDA.
          </>,
        ],

        s7: (
          <>
            The missed approach from a circling approach is a hairy maneuver, and you should always
            brief what you will do in the event it becomes necessary. To start off with,{' '}
            <Success>
              you should make an initial climbing turn toward the landing runway and continue the
              turn until established on the missed approach course.
            </Success>{' '}
            A circling climb over the airport may be the safest option.{' '}
            <Warning>Remember the 6 C's.</Warning>
          </>
        ),

        s8: (
          <>
            Descending during the maneuver should be delayed as long as possible.{' '}
            <Success>
              If the circling MDA is 500' AGL but you can perform the circling maneuver from 800'
              AGL, stay at 800' until you must descend further to land.
            </Success>{' '}
            At the same time, make sure to give yourself an ample buffer below the clouds to ensure
            you don't fly back into them.
          </>
        ),
      }}
    />
  );
};

export default Circling;

const references = {
  convex_hull: uri.wikipedia('convex_hull'),
  murphy_interpretation: uri.faa.legal_interpretations('2009/Murphy_2009_Legal_Interpretation.pdf'),
};
