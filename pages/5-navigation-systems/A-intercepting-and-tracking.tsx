import React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  Info,
  Italic,
  Link,
  Paragraph,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const InterceptingAndTracking: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={5}
      task="A"
      notes={{
        k1: [
          <>
            Interpreting a VOR/HSI receiver and intercepting a radial should not be difficult, as
            it's required learning for the PPL. To intercept a radial, use the following steps:{' '}
            <BulletList type="decimal">
              <>Enter the VOR frequency into your NAV radio and toggle it to the active slot</>
              <>
                If you have multiple NAV receivers, make sure your CDI is responding to the one you
                just entered the frequency into
              </>
              <>
                <Danger>Verify the VOR!!!</Danger> This is crucial, and a common check ride failure.{' '}
                <Success>
                  In the G1000 the identification should happen automatically, and you will see the
                  3-letter identifier next to the frequency.
                </Success>{' '}
                The classical method for identification is to listen to the Morse code broadcast.{' '}
                <Warning>Even in the G1000 you should know how to do this.</Warning>
              </>
              <>
                Determine your position relative to the VOR. On the G1000 this is very easy to do:{' '}
                <Success>
                  pressing the CRS knob adjusts the OBS to center the CDI, instantly revealing the
                  radial the aircraft is on.
                </Success>
              </>
              <>
                Enter the desired radial using the OBS.{' '}
                <Warning>
                  If flying a course TO the VOR, make sure you enter that course and not the radial
                  which is its reciprocal.
                </Warning>
              </>
              <>
                Given your current position, determine an appropriate intercept heading. If you're
                far away from the radial then you may want to start flying directly towards it. If
                you're closer, say within a few miles,{' '}
                <Info>you probably want a shallower intercept, in the realm of 30-45°.</Info>
              </>
              <>
                As the CDI begins to center, adjust your course gradually such that you level out
                with the CDI dead in the middle.
              </>
            </BulletList>
          </>,

          <>
            There are new usages of VORs in instrument flying, such as the <Bold>DME arc</Bold>.
            These are mostly found on approach/departure charts. The ACS gives you considerable
            leeway in maintaining the arc: you're allowed to drift off course by as much as a mile.
            How you do this is up to you, but the classic method is <Bold>"turn 10 twist 10"</Bold>:
            <BulletList type="decimal">
              <>
                As you enter the arc, turn to a heading perpendicular to the radial the arc begins
                at. For instance, if you're flying clockwise on an arc beginning at R-225, you would
                want to turn to a 315° heading.
              </>
              <>
                <Bold>"Twist 10"</Bold>: Set the OBS to 235° and maintain your present heading. It's
                OK to modify your heading slightly if your turn onto the arc left you a bit inside
                or outside the desired radius.{' '}
                <Info>
                  The CDI should deflect and show that you're flying in the direction to intercept.
                </Info>
              </>
              <>
                When the CDI re-centers, it's time to <Bold>"turn 10"</Bold>: it's exactly what it
                sounds like. Turn 10 degrees further along the arc.
              </>
              <>Twist the OBS another 10 degrees and repeat the process</>
              <>
                When it's time to exit the arc, make sure to anticipate your turn.{' '}
                <Warning>
                  Do not wait until the CDI is centered to begin the turn exiting the arc.
                </Warning>
              </>
            </BulletList>
          </>,

          <>
            Note that the number 10 is somewhat arbitrary and not always appropriate. If the arc
            radius is quite large, turning 10° and flying that direction until you intercept the
            radial 10 degrees further along could <Italic>theoretically</Italic> take you outside of
            the ACS tolerance of 1 mile. However, some geometry and trigonometry indicate that{' '}
            <Info>the arc radius would have to be 67 NM for this to happen</Info>, so don't fret too
            much about it. All the same, for arcs with a radius over 15 miles, consider a "turn 5
            twist 5" method instead.
          </>,

          <>
            For VOR testing requirements, see <Link.Task section={2} task="C" id="k2" />. For
            information about the Minimum Operational Network, see{' '}
            <Link.Task section={2} task="B" id="k2a" />.
          </>,

          <Paragraph heading="Non-VOR ground-based NAVAIDs">
            <BulletList type="disc">
              <>
                <Term>Non-directional beacons (NDBs)</Term>: these emit a signal enabling aircraft
                to determine the direction to the NDB facility. They are inherently less informative
                than VORs, which can tell an aircraft it's current radial as well as its position
                relative to other radials.{' '}
                <Warning>
                  They are few and far between, and are gradually being phased out of the NAS.
                </Warning>{' '}
                The FAA expects all NDB-based approaches to be decommissioned by 2030.
              </>
              <>
                <Term>Distance measuring equipment (DME)</Term>: these permit aircraft to determine
                their <Term>slant range distance</Term> to ground-based DME installations. DME are
                typically installed alongside a VOR (in which case it's a VOR/DME) or with a
                localizer array. <Info>The network of DMEs is growing.</Info> Like the VOR MON, they
                are going to remain as a resilient backup to GNSS outages. High power DMEs (those
                collocated with VORs) can be used in RNAV operations by aircraft equipped with
                DME/DME receivers; as such, they will facilitate RNAV operations for commercial
                aircraft during such outages. Small GA aircraft typically do not have dedicated DME
                receivers. However,{' '}
                <Success>
                  GPS is a legally acceptable replacement for DME in any approach marked "DME
                  required."
                </Success>
              </>
            </BulletList>
          </Paragraph>,

          <>
            For more info about NAVAID decommissioning, check out the FAA's{' '}
            <Link href={references.navigation_programs_strategy}>
              Navigation Programs Strategy 2018
            </Link>{' '}
            and <Link href={references.aopa_navaid_decommissioning}>AOPA's helpful article</Link> on
            the subject.
          </>,
        ],
      }}
    />
  );
};

export default InterceptingAndTracking;

const references = {
  aopa_navaid_decommissioning:
    'https://www.aopa.org/advocacy/airports-and-airspace/navigation-and-charting/navaid-decommissioning',
  navigation_programs_strategy:
    'https://www.aopa.org/-/media/Files/AOPA/Home/Advocacy/Advocacy/Advocacy-Briefs/Navigation_Programs_Strategy_2018_Final.pdf',
};
