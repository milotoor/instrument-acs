import React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  Image,
  Info,
  InlineList,
  Link,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const UnusualAttitudes: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={4}
      task="B"
      notes={{
        k1: [
          <>
            You are likely to be asked to recover from two different unusual attitudes:{' '}
            <InlineList>
              <>a nose-high attitude</>
              <>a nose-low attitude</>
            </InlineList>
            . The recover steps are very similar but occur in a different order:
            <BulletList type="disc">
              <>
                A <Bold>nose-high unusual attitude</Bold> should be handled by:
                <BulletList type="decimal">
                  <>Adding power, to counteract the decreasing airspeed</>
                  <>Lowering nose, to avoid a stall</>
                  <>Levelling the wings, to resume level flight</>
                  <>Returning to your original altitude and heading</>
                </BulletList>
              </>
              <>
                A <Bold>nose-low unusual attitude</Bold> is a bit different and should be handled
                like so:
                <BulletList type="decimal">
                  <>Reducing power, to avoid over-speeding the aircraft</>
                  <>
                    Levelling the wings, to avoid over-stressing the airframe and/or entering an
                    accelerated stall when the nose is raised
                  </>
                  <>Raising nose, to resume level flight</>
                  <>Returning to your original altitude and heading</>
                </BulletList>
              </>
            </BulletList>
          </>,

          <>
            If you've lost your attitude indicator this recovery becomes much more challenging. The
            best proxy is to <Success>stabilize the ASI and altimeter</Success>; this state
            indicates you are in approximate level, un-accelerated flight.{' '}
            <Warning>The VSI lags, so it will not immediately indicate you are level.</Warning>
          </>,

          <>
            The G1000 PFD adapts when the pitch and bank exceeds certain tolerances.{' '}
            <Info>
              When pitch exceeds 50?? nose-high or 30?? nose-low, red chevrons are added to the
              attitude indicator pointing towards the horizon.
            </Info>{' '}
            Additionally, numerous data displayed on the PFD is removed if pitch exceeds +30??/-20??
            or bank exceeds 65??. The{' '}
            <InlineList>
              <>altimeter</>
              <>ASI</>
              <>AI</>
              <>VSI</>
              <>HSI</>
            </InlineList>{' '}
            remain; everything else is removed so as to draw your immediate attention to the
            precarious situation. Lastly, the G1000 NXi has{' '}
            <Term>Electronic Stability and Protection (ESP)</Term> which will engage when pitch/bank
            angle exceeds configurable limits. This is very useful for everyday flight but can get
            in the way of maneuver practice and demonstration on the check ride, so know how to turn
            it off (this is typically done via the System Setup page of the MFD).
          </>,

          <Image src="unusual_attitude_chevrons" />,
        ],

        k2: [
          <>
            There are numerous ways in which an aircraft can end up in an unusual attitude.{' '}
            <Danger>
              Recognizing and avoiding these causes is at least as important as knowing how to
              recover.
            </Danger>{' '}
            Some of the more common causes include:
            <BulletList type="disc">
              <>
                <Bold>Disorientation</Bold>: a case of{' '}
                <Link href={references.the_leans}>the leans</Link> can lead to an upset very
                quickly. The <Link href={references.graveyard_spiral}>graveyard spiral</Link> is
                sure to follow.
              </>
              <>
                <Bold>Distraction</Bold>: a failure to closely monitor pitch and bank instruments
                while attending to other flying duties. Remember:{' '}
                <Info>the attitude indicator is at the center of the scan for a reason!</Info>
              </>
              <>
                <Bold>Turbulence</Bold>: strong winds, mountain wave, and wake turbulence can
                quickly invert even large aircraft
              </>
              <>
                <Bold>Improper trim</Bold>: neglecting to update trim after making power changes
                will cause undesirable pitch adjustments
              </>
              <>
                <Bold>Improper instrument interpretation</Bold>
              </>
              <>
                <Bold>Malfunctioning instrumentation</Bold>: the loss of vacuum pressure in a
                six-pack airplane is extremely hazardous in IMC because{' '}
                <Danger>the vacuum-powered gyro instruments may not immediately fail.</Danger>{' '}
                Instead they may fail over the course of minutes as the gyro loses momentum and
                gradually slows; this is insidious, as you may not have an obvious indication that
                something is wrong without a rigorous cross-check.
              </>
            </BulletList>
          </>,
        ],

        s1: [
          <>
            As always in instrument flight, <Info>cross-checking your instruments is vital!</Info>{' '}
            You should be able to immediately recognize if you are nose-high or nose-low with a
            quick glance at the attitude indicator: it'll be{' '}
            <span className="font-bold text-blue-500">very blue</span> or{' '}
            <span className="font-bold text-amber-800">very brown</span>! On the check ride this is
            probably good enough, as you will know to expect the unusual attitude scenario.{' '}
            <Warning>
              In real-world flying, however, you absolutely must confirm that the AI agrees with
              your other instrumentation.
            </Warning>{' '}
            How else do you know if you've lost vacuum pressure or if the AHRS is crapping out in
            some bizarre way?
          </>,

          <>
            Mind you, this is an incipient emergency requiring quick reaction. A quick cross-check
            is sufficient.
            <BulletList type="disc">
              <>
                When the nose is up,{' '}
                <InlineList>
                  <>airspeed should be decreasing</>
                  <>altitude should be increasing</>
                  <>vertical speed should be positive</>
                </InlineList>
                . Conversely, when the nose is low{' '}
                <InlineList>
                  <>the airspeed is increasing</>
                  <>altitude decreasing</>
                  <>vertical speed negative</>
                </InlineList>
                .
              </>
              <>
                In a bank, your heading should be changing (as indicated by both the heading
                indicator/horizontal situation indicator and the wet compass) and the turn rate
                indicator should agree.
              </>
            </BulletList>
          </>,

          <>
            <Link href={references.unusual_attitude_recovery}>SKYbrary has a great article</Link>{' '}
            discussing unusual attitudes, including the parameter limits beyond which an attitude is
            "unusual", the causes, recovery and risk factors.
          </>,
        ],
      }}
    />
  );
};

export default UnusualAttitudes;

const references = {
  graveyard_spiral: uri.wikipedia('graveyard_spiral'),
  unusual_attitude_recovery: uri.skybrary('recovery-unusual-aircraft-attitudes'),
  the_leans: uri.wikipedia('the_leans'),
};
