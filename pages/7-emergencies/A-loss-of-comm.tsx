import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  FAR,
  Info,
  InlineList,
  Link,
  Paragraph,
  Quotation,
  ReferenceList,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const LossOfComm: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={7}
      task="A"
      notes={{
        k1: [
          <ReferenceList references={[<FAR section="91.185" />, <AIM paragraph={[6, 4]} />]} />,

          <>
            It's worth having <FAR section="91.185" /> bookmarked for the check ride, as you are{' '}
            <Bold>100% guaranteed</Bold> to get asked about lost communications procedures. For
            starters, the AIM acknowledges that this is a tricky situation:{' '}
          </>,

          <Quotation source={<AIM paragraph={[6, 4, 1, 'a']} />}>
            It is <Bold>virtually impossible</Bold> to provide regulations and procedures applicable
            to all possible situations associated with two‐way radio communications failure. During
            two‐way radio communications failure, when confronted by a situation not covered in the
            regulation, pilots are expected to exercise good judgment in whatever action they elect
            to take.{' '}
            <Warning>
              Should the situation so dictate they should not be reluctant to use the emergency
              action contained in <FAR section="91.3" paragraph="b" />.
            </Warning>
          </Quotation>,

          <Paragraph heading="Regaining comms" references={<AIM paragraph={[6, 4, 3]} />}>
            <Info>
              In all circumstances, your first reaction should be to try and regain comms!
            </Info>{' '}
            That means you should check that{' '}
            <InlineList>
              <>you have the correct frequency tuned in</>
              <>your volume is not turned too far down</>
              <>your headset is on/operational and plugged in</>
              <>the circuit breaker hasn't popped</>
            </InlineList>
            . If you're still unable to regain comms, try{' '}
            <InlineList logic="or">
              <>switching to COM2</>
              <>switching to another audio jack</>
              <>switching to another frequency</>
              <>cycling the alternator</>
              <>calling the ATC facility with a cell phone or backup/handheld radio</>
            </InlineList>
            .
          </Paragraph>,

          <>
            <AIM paragraph={[6, 4, 3]} /> specifically suggests{' '}
            <InlineList>
              <>
                listening on a NAVAID frequency (in case your comms receiver failed but nav receiver
                still works)
              </>
              <>calling on the previously assigned frequency</>
              <>calling a nearby FSS facility</>
              <>broadcasting on 121.5 (guard)</>
            </InlineList>
            .
          </>,

          <Paragraph
            heading="Failure in VMC"
            references={[
              <FAR section="91.185" paragraph="b" />,
              <AIM paragraph={[6, 4, 1, 'c', 2]} />,
            ]}
          >
            If the failure occurs in VFR conditions, remain in VFR conditions and land{' '}
            <Bold>"as soon as practicable."</Bold> In other words,{' '}
            <Success>stay out of the clouds and land soon</Success> but{' '}
            <Warning>
              do not feel compelled to land immediately if there is good reason for continuing the
              flight to an airport better-suited to your/your aircraft's needs.
            </Warning>{' '}
            At the same time, be mindful that your presence in the NAS while IFR and without comms
            imposes a considerable inconvenience on other aircraft and ATC, who must continually
            route traffic around you.
          </Paragraph>,

          <Paragraph
            heading="Failure in IMC"
            references={[
              <FAR section="91.185" paragraph="c" />,
              <AIM paragraph={[6, 4, 1, 'c', 3]} />,
            ]}
          >
            If the failure occurs in IFR conditions, there is a standard procedure for maintaining
            safety of flight.
            <BulletList type="disc">
              <>
                <Bold>Route.</Bold>{' '}
                <Info>You should follow the route you were assigned by ATC.</Info> If you were being
                radar vectored, fly direct to the fix/route/airway you were being vectored to. If
                you do not have an assigned route, fly the route that ATC has told you to expect,
                and if you don't have that either then fly what's in your flight plan. If you were
                in a hold when you lost comms, you should remain in the hold until your{' '}
                <Term>expect further clearance (EFC)</Term> time.{' '}
              </>
              <>
                <Bold>Altitude.</Bold> For each flight segment,{' '}
                <Info>fly the highest of the following three altitudes:</Info>{' '}
                <InlineList>
                  <>your last assigned altitude</>
                  <>the minimum IFR altitude</>
                  <>the altitude you have been told to expect</>
                </InlineList>
                .
              </>
              <>
                <Bold>Leave the clearance limit.</Bold> When you get to where you've been cleared
                to, you will want to begin your descent and approach. The by-the-book way to do this
                is to fly to your clearance limit--typically the destination airport--and from there
                to an IAF. <FAR section="91.185" paragraph={['c', 3, 'ii']} /> says to{' '}
                <Quotation inline>
                  commence descent or descent and approach as close as possible to the ETA as
                  calculated from
                </Quotation>{' '}
                the flight plan.
                <div className="pt-3">
                  However, there are some serious issues with this plan that make in somewhat
                  impractical. For starters, if you are early to the destination,{' '}
                  <Warning>where are you supposed to hold?</Warning> Some IAFs have published holds
                  but certainly not all do, and there are pretty obvious reasons for not rolling
                  your own unpublished hold in the midst of what is already an emergency.
                  Furthermore,{' '}
                  <Warning>
                    ATC will neither expect this odd behavior nor be pleased when you do it.
                  </Warning>{' '}
                  They want you out of their problem. You want to be out of their problem too,
                  right? So get out of their problem and get on the ground safely.{' '}
                  <Success>
                    Fly to an IAF, stay above the MSA until established on an approach segment and
                    fly the approach.
                  </Success>
                </div>
                <div className="pt-3">
                  This <Link href={references.ifr_mag_lost_comms}>IFR Magazine article</Link> for
                  additional commentary and a recent history of attempts to change the rule.
                </div>
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph hr>
            Remember, the <Info>name of the game is to be predictable!</Info> Make constant rate
            descents and standard rate turns so that ATC has the ability to predict what you're
            doing. Finally, <Danger>don't forget to squawk 7600 and run the checklist!</Danger>
          </Paragraph>,

          <>
            AOPA's Air Safety Institute has put together a{' '}
            <Link newTab href={references.asi_lost_comms}>
              helpful flow chart
            </Link>{' '}
            for navigating the lost comms scenare.
          </>,
        ],
        r1: [
          <>
            The most common reasons for losing comms include:
            <BulletList type="disc">
              <>Accidentally turning down the volume</>
              <>Headset coming unplugged</>
              <>Inadvertent frequency change/incorrect frequency</>
              <>Terrain obstruction (though this is unlikely when IFR)</>
            </BulletList>
          </>,

          <>
            However, comms receivers are mere machines and they do occasionally fail. It's also
            possible that the problem is on ATC's side of the mic, not yours; this is still a crummy
            situation, but at least you will be able to tell it isn't you.
          </>,
        ],
      }}
    />
  );
};

export default LossOfComm;

const references = {
  asi_lost_comms: '/asi_lost_comms.pdf',
  ifr_mag_lost_comms: uri.ifr_mag('system', 'how-far-can-you-go'),
};
