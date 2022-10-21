import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  Gray,
  Image,
  Info,
  InlineList,
  Italic,
  Link,
  Paragraph,
  Quotation,
  Success,
  TaskPage,
  Term,
  ToDo,
  Warning,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Nonprecision: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={6}
      task="A"
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
          </Paragraph>,

          <Quotation>
            The visual descent point (VDP), identified by the symbol (V), is a defined point on the
            final approach course of a nonprecision <Bold>straight-in approach procedure</Bold> from
            which a stabilized visual descent from the MDA to the runway touchdown point may be
            commenced.{' '}
            <Bold>The pilot should not descend below the MDA prior to reaching the VDP.</Bold>{' '}
            [Emphasis added]
          </Quotation>,

          <>
            Unfortunately, not all NPAs have defined VDPs because{' '}
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
          </>,

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
            <BulletList type="disc">
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

          <Paragraph heading="LP vs. LNAV" references={<AIM paragraph={[1, 1, 17, 'b', 5]} />}>
            LP and LNAV approaches differ in a few ways. LP approaches require WAAS while LNAV only
            requires GPS (see <Link.Task id="k3" />
            ). Most importantly, they differ in their lateral sensitivity (i.e. the distance
            represented by full-scale deflection on the CDI).
          </Paragraph>,

          <>
            To begin with, understand that the CDI scale varies depending on the phase of flight
            (when using GPS/WAAS as the navigation source):
          </>,

          <Image src="gps_cdi_scaling_phases" />,

          <>
            As seen above, the CDI changes scale several times during flight. What's most important
            here is how the scaling——and, thus, the meaning of full-scale deflection——changes during
            an approach. In particular:
            <BulletList type="disc">
              <>
                When 30nm from the departure airport, the scaling shifts from{' '}
                <Info>enroute mode (which has 2nm sensitivity)</Info> to{' '}
                <Info>terminal mode (1nm)</Info>. This scale ramp-down occurs over a distance of
                1nm.
              </>
              <>
                When 2nm from the <Term>final approach fix (FAF)</Term>, the CDI scale changes
                gradually again to <Info>approach mode (1nm sensitivity)</Info>. This can sometimes
                be confusing:{' '}
                <Warning>
                  if you are on a heading to intercept final approach at an angle which is shallower
                  than the CDI scaling's taper, the CDI may indicate that you are drifting further
                  from final approach when in fact you are getting closer!
                </Warning>{' '}
                For this reason, <AIM paragraph={[1, 1, 17, 'b', 5, 'e', '5']} /> says:{' '}
                <Gray italic>
                  "requesting or accepting vectors which will cause the aircraft to intercept the
                  final approach course within 2 NM of the FAWP is not recommended."
                </Gray>{' '}
                <div className="pt-3">
                  In the G1000, this scaling should occur automatically once the approach procedure
                  is activated or if vectors to final are selected.{' '}
                  <Info>
                    The way in which the CDI scales in approach mode varies by the approach type:
                  </Info>
                </div>
              </>
            </BulletList>
          </>,

          <Image.Row>
            <Image src="lnav_cdi_scaling">Typical LNAV and LNAV+V Approach CDI Scaling</Image>
            <Image src="lpv_cdi_scaling">Typical LNAV/VNAV, LPV, and LP Approach CDI Scaling</Image>
          </Image.Row>,

          <>
            Per <AIM paragraph={[1, 1, 17, 'b', 5, 'e', 5]} />, IFR-certified GPS receivers are only
            required to transition from ±1NM 2NM prior to the FAWP to ±0.3 NM at the FAWP. However
            as seen above, the G1000 does more than this, continuing to narrow at a constant angle
            near the runway threshold.{' '}
            <Warning>
              It's not clear to me if this is true for all G1000's, or only those equipped with
              SBAS-capable GPS receivers.
            </Warning>
          </>,

          <>
            For LP approaches (and LPV approaches), the lateral sensitivity scales differently.
            Initially, the sensitivity is ±1NM. 2NM prior to the FAF,{' '}
            <Info>the sensitivity increases to be similar to the angular scaling of an ILS</Info>.
            However, the sensitivity differs from that of a localizer in two ways:{' '}
            <InlineList>
              <>
                the initial scaling on final approach will be ±0.3NM (same as GPS and better than
                ILS, which is less sensitive far from the runway)
              </>
              <>
                the scaling changes to linear near the runway threshold instead of continuing to
                become more sensitive
              </>
            </InlineList>
            . Additionally, per <AIM paragraph={[1, 1, 18, 'd', 5]} />:
          </>,

          <Quotation>
            Since the origin point of the lateral splay for the angular portion of the final is not
            fixed due to antenna placement like localizer, the splay angle can remain fixed, making
            a consistent width of final for aircraft being vectored onto the final approach course
            on different length runways
          </Quotation>,

          <>
            Finally, the CDI scale shifts back to{' '}
            <Info>0.3nm when the missed approach is activated.</Info> This happens immediately for
            LP and LPV approaches, and more gradually for basic LNAV approaches.
          </>,
        ],
        k2: (
          <>
            There are performance requirements that must be met in order to complete either an LNAV
            or LP approach. <Warning>For LNAV approaches, RAIM must be operational.</Warning> If
            there is a RAIM failure annunciation the approach{' '}
            <Danger>must not be completed!</Danger> If the approach has already begun, the pilot
            must immediately execute the missed approach (see{' '}
            <AIM paragraph={[1, 1, 17, 'b', 5, 'g']} />
            ).
          </>
        ),
        k3: [
          <Paragraph heading="LNAV and LP" references={<AIM paragraph={[5, 4, 5, 'm']} />}>
            Nonprecision RNAV approaches include <Term>LNAV (LATeral NAVigation)</Term> and{' '}
            <Term>LP (Localizer Performance)</Term> procedures. Both types of procedure utilize a{' '}
            <Term>global navigation satellite system (GNSS)</Term> to provide lateral guidance. The
            primary difference is the degree of precision:{' '}
            <Info>LP approaches utilize the Wide Area Augmentation System (WAAS)</Info> while{' '}
            <Info>LNAV approaches only utilize GPS</Info>. Per <AIM paragraph={[5, 4, 5, 'm']} />:
          </Paragraph>,

          <Quotation>
            LP will be published in locations where vertically guided minima cannot be provided due
            to terrain and obstacles and therefore, no LPV or LNAV/VNAV minima will be published.
          </Quotation>,

          <>
            Note that{' '}
            <Warning>
              a receiver which supports LPV approaches does not necessarily support LP approaches
            </Warning>
            . If the receiver was approved prior to{' '}
            <Link.Reference reference="TSO-C145" text="TSO-C145b" /> and{' '}
            <Link.Reference reference="TSO-C146" text="TSO-C146b" /> it may require an upgrade to
            fly to LP minima. There must be a statement in the POH or Supplemental Flight Manual
            declaring the receiver's fitness for flying to LP minima.
          </>,

          <Paragraph heading="LOC and LDA" references={[<AIM paragraph={[1, 1, 9, 'b-c']} />]}>
            Localizer approaches provide the lateral navigation of an ILS, and may be used
            independently of an ILS glideslope in non-precision approaches. The localizer equipment
            is installed at the departure end of the runway and emits directional radio signals
            towards the approach end. Two amplitude-modulated signals are sent (one at 150 Hz, the
            other 90 Hz); the cockpit receiver compares the relative modulation between the two
            signals to interpret the aircraft's lateral position relative to runway centerline:
          </Paragraph>,

          <Image src="ils_diagram" />,

          <>
            <Info>
              The localizer signal is emitted such that width of the course is 700 feet at the
              runway threshold
            </Info>{' '}
            (i.e., a full-scale CDI deflection means the aircraft is 350' off runway centerline).
            Therefore, the splay angle of this signal will vary across runways of differing
            lengths--this is one of the ways localizers differ from GPS/WAAS approaches. Some
            localizers also emit a "back courses", which is parallel to the front course but in the
            opposite direction. When flying a localizer back course, the CDI sensing will be
            reversed.{' '}
            <Success>
              On the front course, a CDI deflection to the left means you are right of centerline
              and should correct to the left ("chase the needle")
            </Success>
            ; however,{' '}
            <Warning>
              on the back course a left deflection means you should "push the needle" and correct to
              the right!
            </Warning>
          </>,

          <>
            Normal-sensing and reverse-sensing can be confusing. On the chart, one side of the arrow
            will be shaded.{' '}
            <Info>
              If the shaded side of the arrow is on your <Italic>right</Italic>, then you will have
              normal-sensing; if it's on your left, you'll have reverse-sensing.
            </Info>{' '}
            This applies to back-course localizers too: if you are flying away from a back-course
            localizer (see the{' '}
            <Link href={references.aspen_loc_iap}>infamous LOC/DME-E approach into Aspen</Link>)
            you'll have normal-sensing (as the IAP chart helpfully says).
          </>,

          <>
            Additionally, localizers have a specified service volume outside of which the signal
            should not be trusted. However,{' '}
            <Info>
              ATC may clear aircraft on procedures beyond the service volume when radar monitoring
              is provided.
            </Info>{' '}
            The service volume is:
            <BulletList type="disc">
              <>To 10 degrees either side of the course along a radius of 18 NM from the antenna</>
              <>From 10 to 35 degrees either side of the course along a radius of 10 NM</>
            </BulletList>
          </>,

          <Image src="localizer_limitations" />,

          <>
            A <Term>localizer-type directional aid (LDA)</Term> is very similar to a localizer,{' '}
            <Info>
              but it is not aligned with any runway and is very rarely paired with a glideslope.
            </Info>{' '}
            If it aligns within 30° of a runway, straight-in minimums may still be published.
          </>,

          <Paragraph heading="VOR">
            <ToDo />
          </Paragraph>,
        ],
      }}
    />
  );
};

export default Nonprecision;

const references = {
  advisory_glidepath: uri.ifr_mag('system', 'advisory-glidepaths'),
  aspen_loc_iap: 'https://aeronav.faa.gov/d-tpp/2210/05889LDE.PDF',
  cdfa: uri.ifr_mag('technique', 'constant-angle-descent'),
  flight_insight_vdp: uri.youtube('vhSzPqN7r74'),
};
