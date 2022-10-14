import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Image,
  Info,
  InlineList,
  Italic,
  Paragraph,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { getStaticPropFns } from '../../server';

export const getStaticProps = getStaticPropFns.task(3, 'B');
const Holding: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        k1: [
          <>When ATC is unable to clear a flight to its destination, it may be required to hold.</>,

          <Paragraph heading="Hold components" references={<AIM paragraph={[5, 3, 8]} />}>
            A hold is defined by{' '}
            <InlineList>
              <>a holding fix</>
              <>inbound course</>
              <>turn direction</>
              <>leg length</>
            </InlineList>
            . If a hold is published on a chart, ATC may simply instruct you to hold as published;
            however, ATC may also alter any of the hold components to suit their operational
            requirements, in which case they will also provide a cardinal direction from the fix
            where you will be holding. A standard hold uses <Info>right turns</Info>, so if a turn
            direction is not explicitly given this is what will be expected.{' '}
            <Success>
              Holding instructions should be accompanied by an{' '}
              <Term>expect further clearance (EFC)</Term> time.
            </Success>
          </Paragraph>,

          <Image src="hold_components" />,

          <Paragraph
            heading="Airspeed requirements"
            references={<AIM paragraph={[5, 3, 8, 'j', 2]} />}
          >
            There are speed limits in holding patterns. The maximum speed limit in a given hold
            depends on the aircraft's altitude:
            <BulletList type="disc">
              <>
                6,000' MSL and below: <Bold>200 KIAS</Bold>
              </>
              <>
                6,001' MSL to 14,000' MSL: <Bold>230 KIAS</Bold>
              </>
              <>
                14,000' MSL and above: <Bold>265 KIAS</Bold>
              </>
            </BulletList>
          </Paragraph>,

          <>
            Additionally, individual holding patterns may have their own speed limits. These will be
            depicted on the chart within the typical racetrack icon.{' '}
            <Warning>
              The aircraft should be at or below the maximum speed by the time it initially crosses
              the fix.
            </Warning>{' '}
            This is in order to avoid exiting the hold's protected area. For better or worse,{' '}
            <Success>the Cessna 172 is unable to attain any of these speeds</Success>, so it's not
            really something I need to worry about. On the other hand,{' '}
            <AIM paragraph={[5, 3, 8, 'j', 8, 'a', 1, 'a']} /> specifies that{' '}
            <Warning>
              "all fixed wing aircraft conducting holding should fly at speeds at or above 90 KIAS
              to minimize the influence of wind drift."
            </Warning>{' '}
            This is a speed constraint for skyhawks to know about!
          </>,

          <Paragraph heading="Hold entries">
            There are three types of hold entries. Which type of entry is appropriate depends on the
            aircraft's course to the holding fix{' '}
            <Italic>relative to the inbound holding course</Italic>. Suppose we are to hold on the
            R-270 from a given fix:
          </Paragraph>,

          <Image src="hold_entries" />,

          <>
            The prescribed hold entries would be:{' '}
            <BulletList>
              <>
                <Bold>20° CW to 200°</Bold> (area c in the chart): <Success>direct entry</Success>.
                Fly directly to the fix and enter the holding pattern by turning right for the
                outbound leg.
              </>
              <>
                <Bold>200° CW to 270°</Bold> (area b in the chart):{' '}
                <Warning>teardrop entry</Warning>. Fly to the fix, turn 30° away from the reciprocal
                of the inbound course (in this case a left turn), fly for one minute, then turn in
                the direction of the holding pattern to intercept the inbound holding course.
              </>
              <>
                <Bold>270° CW to 20°</Bold> (area a in the chart): <Info>parallel entry</Info>. Fly
                to the fix, track the reciprocal of the inbound course for one minute, make a 225°
                turn to the left (staying on the holding side), and return to the holding fix or
                intercept the holding course inbound.
              </>
            </BulletList>{' '}
          </>,

          <>
            These three hold entry procedures are recommended by the FAA and were{' '}
            <Warning>
              derived as part of the development of the size and shape of the obstacle protection
              areas for holding.
            </Warning>
          </>,

          <Paragraph heading="Leg lengths">
            There are two different methods for determining how far to fly on the outbound leg:
            <BulletList type="disc">
              <>
                <Bold>Time-based legs:</Bold> these are more common (at least historically). At or
                below 14,000' MSL <Info>the standard leg length is 1 minute</Info>; above 14,000'
                MSL the standard is 1½ minutes. If there's any wind blowing (except for a perfect
                crosswind) it will be impossible for both legs to have the prescribed length of
                time. For this reason, <Info>the inbound leg should be 1 (or 1½) minute(s).</Info>{' '}
                The outbound leg should be adjusted as necessary to keep the inbound leg the proper
                time.
              </>
              <>
                <Bold>Distance-based legs</Bold>: these specify leg lengths in nautical miles. When
                using DME, the end of the outbound leg is determined using the slant range from the
                NAVAID; when using GPS the end of the outbound leg is determined using the GPS's
                along-track-distance functionality. This means that holds flown using the GPS take
                the pilot further from the holding fix than those flown with DME! However,{' '}
                <AIM paragraph={[5, 3, 8, 'j', 6]} /> describes the difference as "negligible".
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Wind correction">
            Compensate for wind effect primarily by drift correction on the inbound and outbound
            legs.{' '}
            <Info>
              When outbound, triple the inbound drift correction to avoid major turning adjustments;
              for example, if correcting left by 8 degrees when inbound, correct right by 24 degrees
              when outbound.
            </Info>{' '}
            This ends up producing an oblong ground track into the protected airspace on the holding
            side, but that's expected and accounted for by procedure designers.{' '}
            <Success>
              The main benefit of this is that you're not obligated to make steeply banked turns
              when turning into the wind.
            </Success>
          </Paragraph>,
        ],
      }}
    />
  );
};

export default Holding;
