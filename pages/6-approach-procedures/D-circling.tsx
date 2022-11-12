import React from 'react';

import {
  AIM,
  BulletList,
  Image,
  Info,
  InlineList,
  Link,
  Paragraph,
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
            <InlineList>
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
            </Info>{' '}
            However, there may be notes prohibiting usage of portions of the circling area (e.g.
            "Circling NA west of Rwy 1-19", as seen on the{' '}
            <Link.Approach type="VOR" rwy={1} name="Jackson Hole" icao="KJAC" id="00504V1" />
            ).
          </>,
        ],
      }}
    />
  );
};

export default Circling;

const references = {
  convex_hull: uri.wikipedia('convex_hull'),
};
