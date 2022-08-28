import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  Info,
  InlineList,
  Link,
  Paragraph,
  Quotation,
  ReferenceList,
  Success,
  Tab,
  Tabs,
  TaskPage,
  Term,
  ToDo,
  Warning,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { uri } from '../../lib/references';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(6, 'A') },
});

const Nonprecision: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        k1: [
          <>
            A <Term>nonprecision approach (NPA)</Term> is an instrument approach without vertical
            guidance. Lateral guidance is provided by a navaid, conventionally a ground-based radio
            system, but these days satellites are used as well. Common examples of nonprecision
            approach procedures include VOR, localizer, LDA and LNAV procedures, among others.
          </>,

          <>
            Nonprecision approaches use <Term>minimum descent altitudes (MDAs)</Term> to define how
            low a pilot may safely descend. The common technique for flying a nonprecision approach
            is known as <Warning>"dive and drive"</Warning>, in which the aircraft descends in a
            stepwise fashion from altitude to altitude (dive) and then holds that altitude until
            passing the next fix on the approach which permits a descent to a lower altitude
            (drive). The flight path looks a bit like a staircase. When the aircraft arrives at the
            MDA, it is not permitted to descend any lower until the runway environment is in sight
            (see <Link.Task section={6} task="E" id="k1" />
            ). If the aircraft arrives at the <Term>missed approach point (MAP)</Term> and the
            runway environment is still not in sight, the aircraft must execute the{' '}
            <Term>missed approach (MA)</Term>.
          </>,

          <>
            <Danger>
              In practice, it's usually clear well before the MAP if the missed approach will be
              required.
            </Danger>{' '}
            One of the conditions for landing from an IAP is that the aircraft is continuously in a
            position to land using normal maneuvers.{' '}
            <Danger>
              However, many MAPs are within a mile or so of the runway threshold at 1000 feet AGL or
              higher; landing in such a situation would be highly abnormal and potentially
              dangerous.
            </Danger>
          </>,

          <Paragraph
            heading="Visual descent point"
            hr
            references={<AIM paragraph={[5, 4, 5, 'h']} />}
          >
            The decision of when to descend from the MDA is made simpler by the presence of a{' '}
            <Term>visual descent point (VDP)</Term>. <AIM paragraph={[5, 4, 5, 'h']} /> defines the
            VDP like so:
            <Quotation>
              The visual descent point (VDP), identified by the symbol (V), is a defined point on
              the final approach course of a nonprecision{' '}
              <Bold>straight-in approach procedure</Bold>
              from which a stabilized visual descent from the MDA to the runway touchdown point may
              be commenced.{' '}
              <Bold>
                The pilot should not descend below the MDA prior to reaching the VDP.
              </Bold>{' '}
              [Emphasis added]
            </Quotation>
            Unfortunately, not all NPAs have defined VDP's because{' '}
            <InlineList logic="or">
              <>an obstacle penetrates the visual surface between the MDA and runway threshold</>
              <>DME equipment is unavailable</>
              <>the procedure design prevents a VDP to be identified</>
            </InlineList>
            , among other reasons. In this case a simple rule of thumb may be used:{' '}
            <Info>find the chart's lowest MDA and divide its AGL altitude by 300.</Info> This yields
            the number of nautical miles before the runway threshold from which to begin the
            descent. Check out this{' '}
            <Link href={references.flight_insight_vdp}>FlightInsight video</Link> for a thorough
            discussion.
          </Paragraph>,

          <Paragraph
            heading="Continuous descent final approach"
            hr
            references={<Link.Reference reference="AC 120-108" />}
          >
            A more stable way of flying NPAs is{' '}
            <Term>continuous descent final approach (CDFA)</Term>, also known as constant-angle
            nonprecision approach (CANPA). Instead of diving and driving,{' '}
            <Success>the aircraft descends at a continuous rate</Success> from some point on the
            final approach course (usually the FAF) down to the runway threshold. This makes for a
            much more <Success>stabilized approach</Success> which, all things equal, is a superior
            way to land.
          </Paragraph>,

          <>
            But, alas, all things are not equal. Calculating where to begin the descent is not
            complicated but way too difficulty to do while flying the approach. Some avionics
            systems can provide <Term>advisory glidepaths</Term> (shown as LNAV+V on approach
            charts), which handle the math for you but which require caution to use:
            <BulletList>
              <>
                The advisory glidepath{' '}
                <Danger>does not guarantee obstacle protection below the MDA</Danger>
              </>
              <>
                When flying an LNAV+V approach in the G1000 with the autopilot coupled,{' '}
                <Danger>
                  the aircraft will not level off at the MDA even if the MDA is set in the altitude
                  preselect!
                </Danger>{' '}
                Hence, it is crucial that the pilot keep in mind the nature of the approach they are
                flying; though it may feel like an approach with vertical guidance, it is
                emphatically not!
              </>
              <>
                <Warning>
                  Pilots flying CDFA must be very cautious not to descend below MDA when making the
                  land/go-missed decision.
                </Warning>{' '}
                In a precision approach, the DA is not a minimum descent altitude--it's understood
                that the aircraft will descend a bit further before it begins climbing.{' '}
                <Warning>The nonprecision approach's MDA is not like this.</Warning> Thus, some
                operators use SOPs that{' '}
                <Info>
                  incorporate a buffer and treat MDA+50 or MDA+100 as the "decision altitude."
                </Info>
              </>
            </BulletList>
          </>,
          <>
            See these two articles from IFR Magazine for more:{' '}
            <BulletList bullet="disc">
              <>
                <Link href={references.cdfa}>Constant Angle Descent</Link> (published 29 July, 2014;
                updated 12 November, 2019)
              </>
              <>
                <Link href={references.advisory_glidepath}>Advisory Glidepaths</Link> (published 31
                July, 2014; updated 12 November, 2019)
              </>
            </BulletList>
          </>,

          <Paragraph heading="Approach types" hr>
            Nuances unique to each type of NPA are discussed below.
          </Paragraph>,

          <>
            <Tabs>
              <Tab heading="LNAV and LP">
                <Paragraph>
                  <ReferenceList references={<AIM paragraph={[5, 4, 5, 'm']} />} />
                </Paragraph>
                <Paragraph>
                  Nonprecision RNAV approaches include <Term>LNAV (LATeral NAVigation)</Term> and{' '}
                  <Term>LP (Localizer Performance)</Term> procedures. procedures. Both types of
                  procedure utilize a <Term>global navigation satellite system (GNSS)</Term> to
                  provide lateral guidance. The primary difference is the degree of precision:{' '}
                  <Info>LP approaches utilize the Wide Area Augmentation System (WAAS)</Info> while{' '}
                  <Info>LNAV approaches only utilize GPS</Info>. Per{' '}
                  <AIM paragraph={[5, 4, 5, 'm']} />:
                  <Quotation>
                    LP will be published in locations where vertically guided minima cannot be
                    provided due to terrain and obstacles and therefore, no LPV or LNAV/VNAV minima
                    will be published.
                  </Quotation>
                </Paragraph>
                Like localizer approaches, an LP approach comes with "angular guidance":{' '}
                <Info>lateral sensitivity incleases as the approach continues.</Info> Note that{' '}
                <Warning>
                  a receiver which supports LPV approaches does not necessarily support LP
                  approaches
                </Warning>
                . If the receiver was approved prior to{' '}
                <Link.Reference reference="TSO-C145" text="TSO-C145b" /> and{' '}
                <Link.Reference reference="TSO-C146" text="TSO-C146b" /> it may require an upgrade
                to fly to LP minima. There must be a statement in the POH or Supplemental Flight
                Manual declaring the receiver's fitness for flying to LP minima.
              </Tab>
              <Tab heading="LOC and LDA">
                <ToDo />
              </Tab>
              <Tab heading="VOR">
                <ToDo />
              </Tab>
            </Tabs>
          </>,
        ],
      }}
    />
  );
};

export default Nonprecision;

const references = {
  advisory_glidepath: uri.ifr_mag('system', 'advisory-glidepaths'),
  cdfa: uri.ifr_mag('technique', 'constant-angle-descent'),
  flight_insight_vdp: uri.youtube('vhSzPqN7r74'),
};
