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
            <Term>visual descent point (VDP)</Term>. The AIM defines the VDP like so:
          </Paragraph>,

          <Quotation source={<AIM paragraph={[5, 4, 5, 'h']} />}>
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
            <BulletList type="decimal">
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
            requires GPS; see <Link.Task id="k3" />. A RAIM check is not required if WAAS coverage
            is assured, and hence this step does not need to be performed for LP approaches. Most
            importantly, they differ in their lateral sensitivity (i.e. the distance represented by
            full-scale deflection on the CDI).
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
            . Additionally:
          </>,

          <Quotation source={<AIM paragraph={[1, 1, 18, 'd', 5]} />}>
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

          <Paragraph
            heading="RAIM"
            references={[
              <AIM paragraph={[1, 1, 17, 'a', 3]} />,
              <AIM paragraph={[1, 1, 17, 'b', 5, 'g']} />,
            ]}
          >
            <Link href={references.raim}>
              <Term>Receiver autonomous integrity monitoring (RAIM)</Term>
            </Link>{' '}
            is a critical part of GPS approaches. RAIM is used to assess the reliability of GPS
            signals received during flight. For a variety of reasons (e.g. ionospheric
            interference), GPS signals may be inaccurate; it's a complex system, things can
            sometimes go wrong, right? In order for safety-critical applications (like aviation) to
            make use of GPS, there must be a mechanism for detecting when signals are inaccurate and
            plans must change. RAIM is that mechanism.
          </Paragraph>,

          <>
            To understand RAIM it's helpful to first understand GPS. Plenty of resources out there
            can explain it better than I, but suffice it to say: 24 satellites orbit the Earth and
            broadcast their position and the current time when the signal was sent. Using these
            signals, receivers can compute their own position and the time.{' '}
            <Info>
              Four satellites are required to compute latitude, longitude, altitude and time.
            </Info>{' '}
            For a detailed, accessible and interactive explanation of the GPS system I highly
            recommend{' '}
            <Link href={references.bartosz_ciechanowski}>Bartosz Ciechanowski's blog</Link>.
          </>,

          <>
            With five satellites, the receiver is able to compare the position/time solutions
            derived from each group of 4 satellites (there are 5 such groups);{' '}
            <Success>if they all agree on the solution, then there is no fault.</Success> Hurray!
            Alternatively, GPS receivers can use barometric altimeter input as a substitute for one
            of the satellites (this is known as "baro-aiding").
          </>,

          <>
            <Warning>What happens if they don't agree, though?</Warning> The receiver has detected a
            fault. This is already good, as it informs us that something is wrong. If this is all we
            know, we won't be able to fly a GPS approach, but that's much better than thinking we
            can when we can't. Sadly, with only five satellites in view we won't be able to detect
            which satellite is the problem and will have to navigate by some other means. However,
            with <Italic>six</Italic> satellites in view (or five + baro-aiding), the receiver is
            able to determine which satellite is problematic! It can thus exclude that satellite
            from its computations and continue functioning. This is known as{' '}
            <Term>fault detection and exclusion (FDE)</Term>.
          </>,

          <>
            RAIM refers to this real-time monitoring, fault detecting and excluding. It thus
            requires a minimum of five satellites to be in view, and functions even better with six
            or more. While it's great to have that monitoring in the air, you'd still rather know
            ahead of time if there might be a signal reliability issue. Thankfully, GPS satellite
            positions are extremely predictable! Software is available online to perform "RAIM
            prediction" (the FAA recommends their{' '}
            <Link href={references.sapt}>Service Availability Prediction Tool</Link>), and
            sophisticated avionics like the G1000 can also perform predictions.
          </>,

          <Image src="raim_prediction" />,

          <>
            Per <Link.Reference reference="AC 90-100A" />, TSO-C129/196-equipped users (i.e. pilots
            of aircraft equipped with non-WAAS GPS) must confirm RAIM availability for the intended
            route (and time of travel) during preflight, if they are to use RNAV procedures during
            the flight. However, users of TSO-C145/146 equipment need not do so provided that WAAS
            coverage is confirmed to be available along the route of flight (this can be confirmed
            through NOTAMs or predictive tools).
          </>,

          <Quotation source={<AIM paragraph={[1, 1, 17]} />}>
            In situations where RAIM is predicted to be unavailable, the flight must rely on other
            approved navigation equipment, re-route to where RAIM is available, delay departure, or
            cancel the flight.
          </Quotation>,

          <>
            Finally,{' '}
            <Warning>
              when the receiver indicates that RAIM capability has been lost, the pilot{' '}
              <Italic>must</Italic> monitor an alternative means of navigation.
            </Warning>{' '}
            <Danger>
              Without RAIM capability, the pilot has no assurance of the accuracy of the GPS
              position!
            </Danger>
          </>,
        ],
        k2: [
          <>
            In the G1000, the CDI enunciates its mode based upon the current phase of flight.
            Confirming the expected mode is active is an important part of flying the approach,
            because{' '}
            <Warning>
              if the CDI is still in terminal mode you will not have the precision required for
              lateral guidance!
            </Warning>
          </>,

          <Image.Row>
            <Image src="cdi_diagram" />
            <Image src="cdi_enunciations" />
          </Image.Row>,

          <>
            There are performance requirements that must be met in order to complete either an LNAV
            or LP approach. <Warning>For LNAV approaches, RAIM must be operational.</Warning> If
            there is a RAIM failure enunciation the approach <Danger>must be abandoned!</Danger> If
            the approach has already begun, the pilot must immediately execute the missed approach
            (see <AIM paragraph={[1, 1, 17, 'b', 5, 'g']} />
            ). The G1000 automatically monitors RAIM and warns with an alert message when it is not
            available (e.g. "Approach is not active" or "RAIM not available from FAF to MAP."
          </>,

          <Paragraph heading="VDA and LNAV+V" references={<AIM paragraph={[5, 4, 5, 'k']} />}>
            Some NPAs include a <Term>vertical descend angle (VDA)</Term> which is intended as an
            aid in flying stabilized approaches.{' '}
            <Bold>This does not make the approach a precision approach</Bold>.{' '}
            <Info>
              When flying such an approach, you may see LNAV+V enunciated on the HSI as well as an
              advisory glideslope.
            </Info>
          </Paragraph>,

          <>
            Having this advisory guidance can be very helpful, but there are some gotchas to be
            aware of. For one thing,{' '}
            <Danger>
              advisory vertical guidance does not guarantee obstacle clearance below MDA!
            </Danger>{' '}
            It is up to the pilot to visually avoid said obstacles. Furthermore, flying an NPA with
            advisory vertical guidance using the autopilot requires very close scrutiny to ensure
            the aircraft does not descend below minimums.{' '}
            <Danger>
              The GFC700 will not level the aircraft off at MDA when flying an LNAV approach with a
              VDA.
            </Danger>
          </>,
        ],
        k3: [
          <Paragraph heading="LNAV and LP" references={<AIM paragraph={[5, 4, 5, 'm']} />}>
            Nonprecision RNAV approaches include <Term>LNAV (LATeral NAVigation)</Term> and{' '}
            <Term>LP (Localizer Performance)</Term> procedures. Both types of procedure utilize a{' '}
            <Term>global navigation satellite system (GNSS)</Term> to provide lateral guidance. The
            primary difference is the degree of precision:{' '}
            <Info>LP approaches utilize the Wide Area Augmentation System (WAAS)</Info> while{' '}
            <Info>LNAV approaches only utilize GPS</Info>.
          </Paragraph>,

          <Quotation source={<AIM paragraph={[5, 4, 5, 'm']} />}>
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
            localizer (see the infamous{' '}
            <Link.Approach type="LOC/DME" circling="E" name="Aspen" icao="KASE" id="05889LDE" />)
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

          <Paragraph heading="VOR & DME">
            As we all know from private training, a <Term>VHF omnidirectional range (VOR)</Term> is
            a ground-based navaid which can be used to determine one's relative bearing, to track
            courses inbound to or outbound from the navaid, or to intercept fixes on defined
            radials. VOR approaches define the course to follow using radials from the VOR,
            sometimes including <Term>distance measuring equipment (DME)</Term> arcs. They are
            commonly found at airports with VORs on site; these are (typically) the most
            straightforward VOR approaches, as they simply involve tracking a radial inbound to the
            airport. Other, more complicated arrangements may exist:
            <BulletList type="disc">
              <>
                The VOR may be at a different location, requiring you to track outbound{' '}
                <Italic>from</Italic> the VOR. This will frequently involve a circling approach at
                the destination airport, unless the VOR just happens to be closely aligned with
                runway heading (and even then, I'm not sure what TERPS has to say...). See, e.g.,
                the{' '}
                <Link.Approach
                  type="VOR"
                  circling="A"
                  name="Watsonville"
                  icao="KWVI"
                  id="00805VA"
                />
              </>
              <>
                The VOR may be along the final approach course but before the airport, requiring you
                to overfly it. Sometimes you will also need to switch radials as you overfly (see
                the <Link.Approach type="VOR" rwy="19R" name="Concord" icao="KCCR" id="05320V19R" />
                )
              </>
            </BulletList>
          </Paragraph>,
        ],
        k4: [
          <>
            Stabilized approaches are key to safe IFR flight. They are characterized by{' '}
            <InlineList>
              <>steady flight paths</>
              <>constant airspeeds</>
              <>constant descent rates</>
              <Bold>constant angle glidepaths</Bold>
              <>no late configuration changes</>
            </InlineList>
            :
          </>,

          <Quotation
            source={["FAASTeam's Stabilized Approach and Landing", references.stabilized_approach]}
          >
            Every runway is unique, but a commonly referenced optimum glidepath follows the “3:1”
            principle. The principle, also seen as a descent ratio, means that for every 3 nautical
            miles (nm) flown over the ground, the aircraft should descend 1,000 feet. This
            flightpath profile simulates a 3° glideslope.
          </Quotation>,

          <>
            It goes on to say{' '}
            <Success>
              "The further from the runway that you establish a “3:1” flight path profile, the
              greater your probability of successfully flying a stable approach."
            </Success>
          </>,

          <>
            Fundamentally, stabilized approaches are about diminishing the aircraft's energy in a
            gradual manner as you approach to land. In cruise flight you have high kinetic energy
            and potential energy; arriving in the terminal area you begin to lose some of both, but
            it's not until the approach that you must remove all excess energy from the aircraft.
            It's difficult if not impossible to safely lose both kinetic energy (i.e. airspeed) and
            potential energy (altitude) at the same time. To make the problem simpler, the pilot
            should{' '}
            <Success>
              settle into a reference airspeed to maintain during the descent{' '}
              <Info>(90 knots in the Skyhawk)</Info>, then concentrate on losing altitude slowly but
              surely.
            </Success>{' '}
            <Danger>An inability to do so should become a go-around!</Danger>
          </>,

          <>
            <Link href={references.code_7700_stabilized_approach}>Code 7700</Link> provides the
            following criteria for a stabilized approach, distilled from material created by the
            Flight Safety Foundation more than 20 years ago:
            <BulletList type="decimal">
              <>The aircraft is fully configured, and all checklists are completed.</>
              <>
                The aircraft is on extended centerline and on the correct glide path, with only
                small changes in heading and pitch needed to maintain the correct flight path.
              </>
              <>The aircraft is on speed, no slower than VREF or faster than VREF+20.</>
              <>
                The aircraft sink rate is no greater than 1,000 feet per minute and the power
                setting is appropriate for the configuration.
              </>
            </BulletList>
          </>,

          <Warning>
            If any of these criteria are not met by 500' AGL (1000' AGL in IMC), the approach is
            unstable and should be aborted.
          </Warning>,
        ],
      }}
    />
  );
};

export default Nonprecision;

const references = {
  advisory_glidepath: uri.ifr_mag('system', 'advisory-glidepaths'),
  bartosz_ciechanowski: 'https://ciechanow.ski/gps/',
  cdfa: uri.ifr_mag('technique', 'constant-angle-descent'),
  code_7700_stabilized_approach: 'https://code7700.com/stabilized_approach.htm',
  flight_insight_vdp: uri.youtube('vhSzPqN7r74'),
  raim: uri.wikipedia('Receiver_autonomous_integrity_monitoring'),
  sapt: 'https://sapt.faa.gov/default.php',
  stabilized_approach: 'https://www.faa.gov/news/safety_briefing/2018/media/se_topic_18-09.pdf',
};
