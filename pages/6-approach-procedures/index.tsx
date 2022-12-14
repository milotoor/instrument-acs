import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Image,
  Info,
  Link,
  Paragraph,
  Quotation,
  SectionPage,
  Success,
  Term,
  Warning,
} from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const ApproachProcedures: ACS.Page = (props) => {
  return (
    <SectionPage
      {...props}
      number={6}
      note={[
        <>
          <Term>Instrument approach procedures (IAPs)</Term> are at the heart of instrument
          training. <Success>They are how we get on the ground safely</Success> and require a great
          deal of precision during one of the most critical phases of flight. The tasks in this
          section cover various aspects of IAPs; this page will discuss information and procedures
          that are applicable across multiple phases of the approach.
        </>,

        <Paragraph heading="Approach categories">
          For the purposes of instrument approaches, aircraft are bucketed into{' '}
          <Term>approach categories</Term>. Each category is identified by a letter, A through E.
          Most small GA aircraft will fall under category A, and some of the more performant may
          fall under category B.{' '}
        </Paragraph>,

        <Quotation source={<AIM paragraph={[5, 4, 7, 'a']} />}>
          Aircraft approach category means a grouping of aircraft based on a speed of V
          <sub>REF</sub> at the maximum certified landing weight, if specified, or if V
          <sub>REF</sub> is not specified,{' '}
          <Info>
            1.3 V<sub>SO</sub> at the maximum certified landing weight
          </Info>
          . V<sub>REF</sub>, V<sub>SO</sub>, and the maximum certified landing weight are those
          values as established for the aircraft by the certification authority of the country of
          registry
        </Quotation>,

        <>
          <AIM paragraph={[5, 4, 7, 'e']} /> specifies the speed boundaries of the categories:
          <BulletList type="disc">
            <Success>Category A: Speed less than 91 knots.</Success>
            <>Category B: Speed 91 knots or more but less than 121 knots.</>
            <>Category C: Speed 121 knots or more but less than 141 knots.</>
            <>Category D: Speed 141 knots or more but less than 166 knots.</>
            <>Category E: Speed 166 knots or more.</>
          </BulletList>
        </>,

        <>
          The Cessna 172 has a V<sub>SO</sub> of 40 knots. Thus, in the absence of an official V
          <sub>REF</sub>{' '}
          <Info>
            its calculated V<sub>REF</sub> is 52 knots, well below the upper limit for category A
            aircraft.
          </Info>{' '}
          Approaches in the 172 are generally flown at 90 knots.
        </>,

        <>
          Which approach category an aircraft falls into has significant consequences. Foremost
          among them,{' '}
          <Info>
            instrument approach minimums differ across classes; higher classes generally have higher
            minimums.
          </Info>{' '}
          There's very good reason for this: a higher approach speed means an aircraft will travel
          further in a unit of time and will have a larger turn radius. Simply put, faster aircraft
          take up more space in their approach maneuvers and will need extra buffer around obstacles
          since they are less nimble. Additionally,{' '}
          <Info>
            the radius of the protected area in circling approaches is greater for higher-category
            aircraft.
          </Info>{' '}
          See <Link.Task section={6} task="D" id="k1-the_protected_area" />.
        </>,

        <Paragraph heading="Procedure turns" references={<AIM paragraph={[5, 4, 9]} />}>
          A <Term>procedure turn (PT)</Term> is a maneuver designed to assist an aircraft performing
          a course reversal. Many approaches, particularly VOR approaches, require aircraft to fly
          to the airport before they can commence the approach: after arriving at the airport, the
          aircraft must fly outbound, turn around, descend and land.{' '}
          <Info>The turn-around is done with a PT.</Info>
        </Paragraph>,

        <>
          Consider the{' '}
          <Link.Approach
            type="VOR"
            circling="A"
            name="Rogue Valley International"
            icao="KMFR"
            id="00251VA"
          />
          . This approach has a single <Term>initial approach fix (IAF)</Term>: the Rogue Valley VOR
          (OED). To fly the approach (without radar vectors), pilots must first fly over the VOR,
          then head outbound to the north and turn around. There are several aspects to this
          maneuver prescribed by the chart:
          <BulletList type="disc">
            <>
              The pilot may only descend below 6300' MSL prior once they are established inbound on
              the final approach segment. This is indicated by the underlined 6300 in the profile
              view.
            </>
            <>
              The PT must take place on the east side of the final approach segment. This is
              indicated by the black barb at the top of the plan view. While the chart suggests
              turning to heading 027 at the start of the PT (and returning on heading 207){' '}
              <Info>the manner in which the turn is conducted is left up to the pilot.</Info> It is
              perfectly fine to make a 90?? initial turn and a 270?? back on course.
            </>
            <>
              However the turn is done, <Warning>it must stay within 10 NM of the OED VOR.</Warning>{' '}
              This is stated explicitly in the profile view. Notably,{' '}
              <Info>DME is not required for this approach.</Info> An aircraft without DME (or GPS to
              substitute) will have to ensure they remain within the 10 NM limit using a timer and
              their ground speed.{' '}
              <Warning>The PT distance limit is from the PT fix, not the airport!</Warning>
            </>
          </BulletList>
        </>,

        <>
          The AIM specifies when the outbound turn (from the PT fix) should begin. It also
          emphasizes that the PT distance constraint is usually 10 NM, but there are exceptions:
        </>,

        <Quotation source={<AIM paragraph={[5, 4, 9, 'a', 3]} />}>
          Pilots should begin the outbound turn{' '}
          <Bold>immediately after passing the procedure turn fix.</Bold> The procedure turn maneuver
          must be executed within the distance specified in the profile view. The normal procedure
          turn distance is 10 miles. This may be reduced to a minimum of 5 miles where only Category
          A or helicopter aircraft are to be operated or increased to as much as 15 miles to
          accommodate high performance aircraft.
        </Quotation>,

        <Image src="procedure_turn" />,

        <>
          PTs are essential for performing the turn-around, but{' '}
          <Success>they can also be valuable for losing altitude.</Success> The maximum speed
          throughout the PT maneuver is 200 knots IAS (<AIM paragraph={[5, 4, 9, 'a', 3]} />
          ).
        </>,

        <>
          An alternative to a PT is what's known as a{' '}
          <Term>hold in-lieu of procedure turn (HILPT)</Term>. These are indicated on approach
          charts using a bolded holding pattern on the final approach course. The holding fix will
          always be an <Term>intermediate fix (IF)</Term> or <Term>final approach fix (FAF)</Term>.
          Unlike the PT, the HILPT does specify exactly how the hold should be flown, both in terms
          of direction (left or right) and leg distance. See the chart for the{' '}
          <Link.Approach type="ILS" name="Salinas" icao="KSNS" rwy={31} id="00363I31" /> for an
          example.
        </>,

        <>
          Finally, approaches with a PT or HILPT need not always be flown that way. If ATC vectors
          you onto the final approach course and clears you "straight in" then you should not fly a
          charted PT. Additionally, some feeder routes (from IAFs) will explicitly state "NoPT" in
          the plan view. Clearly, no PT should be flown when your approach path takes you along such
          a feeder route.
        </>,
      ]}
    />
  );
};

export default ApproachProcedures;
