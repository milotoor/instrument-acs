import React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  Info,
  InlineList,
  Link,
  Paragraph,
  Success,
  TaskPage,
  ToDo,
  Warning,
} from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Missed: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={6}
      task="C"
      notes={{
        k1: [
          <>
            Many pilots advocate that you mentally frame your approach as a planned missed approach
            with the option to land if things go well. This seems prudent to me.{' '}
            <Info>
              Expecting to fly the missed demands that you prepare to fly the missed, and preparing
              to fly the missed is crucial to safe flight under IFR.
            </Info>{' '}
            While descending prior to beginning your planned missed approach, if it seems like you
            may safely continue to land, then by all means to do so.{' '}
            <Warning>Just don't get so focused on landing that you forget to stay safe.</Warning>
          </>,

          <Paragraph heading="When to execute">
            <ToDo />
          </Paragraph>,

          <Paragraph heading="The 6 C's">
            When it's time to go missed,{' '}
            <Success>the pilot should execute the procedure known as the 6 C's</Success> (Various
            mnemonics use a different number of C's; I choose to use 6):
            <BulletList type="decimal">
              <>
                <Bold>C</Bold>ram: this refers to "cramming the knobs", i.e. applying full takeoff
                power including throttle and RPMs.{' '}
                <Success>If your aircraft has a TOGA button, press it now.</Success>
              </>
              <>
                <Bold>C</Bold>limb: the immediate objective when executing a missed approach is to
                gain altitude.{' '}
                <Info>Pitch up however far your aircraft requires and trim for that attitude.</Info>{' '}
                (In the 172 I aim for about 7-10° nose up)
              </>
              <>
                <Bold>C</Bold>lean: configure the plane for climb. This will include raising the
                flaps <Danger>(but not you're established in the climb!)</Danger> and gear (if
                applicable)
              </>
              <>
                <Bold>C</Bold>ool: the engine is now being asked to perform a lot of work, perhaps
                unexpectedly. Don't forget to do what it takes to keep it from overheating. In small
                GA aircraft I think this mainly refers to opening the cowl flaps (it's not a step
                requiring any action in the 172, but I include it for completeness and to ease
                transitioning to more complex aircraft)
              </>
              <>
                <Bold>C</Bold>ourse: review and execute your lateral course. It is a reminder to{' '}
                <InlineList>
                  <>double check your plan</>
                  <>toggle the CDI back to (and un-SUSP) the GPS</>
                </InlineList>
                .{' '}
                <Warning>
                  If your missed approach begins below MDA, you must also ensure you remain within
                  the protected area until you are able to rejoin the published missed approach.
                </Warning>{' '}
                As mentioned above, do not begin any turns until past the MAP.
              </>
              <>
                <Bold>C</Bold>ommunicate: now (and only now!) that you're climbing and on course,
                let ATC know of your decision. If the approach was to a non-towered airport, first
                announce your intentions on the CTAF. If it was to a towered airport, they'll likely
                be able to infer your decision anyway so there's no need to rush the announcement.
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Limitations">
            <Info>The standard missed approach has a climb gradient of 200 ft/NM.</Info> Some missed
            approaches have <Info>nonstandard climb gradients.</Info> Approaches with steep climb
            gradients are there to facilitate a descent to a low DA/MDA in the presence of obstacles
            or terrain.{' '}
            <Warning>
              Aircraft which are unable to meet the required climb gradient must not attempt the
              approach to minimums!
            </Warning>{' '}
            Doing so puts you in grave danger should you have to go missed. Sometimes there will be
            alternative approaches to the same runway which follow the exact same lateral course but
            have higher minimums--these approaches are specifically there for aircraft which are
            unable to meet the steeper gradient required to descend lower.
          </Paragraph>,

          <>
            For example, see the{' '}
            <Link.Approach type="RNAV Z" rwy={30} name="San Carlos" icao="KSQL" id="09219RZ30" />.
            The published missed approach requires a minimum climb gradient of 302 ft/NM up to 5400'
            MSL. Aircraft which are unable to meet that requirement may instead fly the{' '}
            <Link.Approach type="RNAV Y" rwy={30} name="San Carlos" icao="KSQL" id="09219RY30" />,
            which only has the standard 200 ft/NM climb gradient.
          </>,
        ],
      }}
    />
  );
};

export default Missed;
