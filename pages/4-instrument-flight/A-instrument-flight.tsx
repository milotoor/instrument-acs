import React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  Image,
  Info,
  InlineList,
  Italic,
  Link,
  Paragraph,
  Quotation,
  Success,
  Tab,
  Tabs,
  TaskPage,
  Warning,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const InstrumentFlight: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={4}
      task="A"
      notes={{
        // Attitude instrument flying
        k1: [
          <>
            Chapter 6 of the <Link.Reference reference="FAA-H-8083-15" /> discusses two methods for
            learning/thinking about attitude instrument flying: the{' '}
            <Bold>control and performance method</Bold> and the{' '}
            <Bold>primary and supporting method</Bold>. The main difference is the importance of the
            attitude indicator.
          </>,

          <Tabs>
            <Tab heading="Control and Performance Method">
              <>
                This method divides the instruments into three categories:{' '}
                <BulletList type="decimal">
                  <>
                    <Bold>Control instruments</Bold> depict immediate attitude and power changes;
                    these include the attitude indicator, manifold pressure gauge and the
                    tachometer.
                  </>
                  <>
                    <Bold>Performance instruments</Bold> include the ASI, altimeter, VSI, heading
                    indicator and slip/skid indicator. They reflect a change in acceleration, i.e.
                    they indicate when the aircraft is changing airspeed, altitude or heading.
                  </>
                  <>
                    <Bold>Navigation instruments</Bold> include GPS, VOR, localizer and glideslope
                    receivers/indicators. Their common purpose is to indicate the aircraft's
                    position relative to navigational facilities or fixes, using ground- or
                    space-based radio signals.
                  </>
                </BulletList>
              </>

              <>
                This method also emphasizes a four step process for changing attitude:{' '}
                <BulletList type="decimal">
                  <>
                    <Bold>Establish:</Bold> change the aircraft's pitch and/or bank in conjunction
                    with power. Reference the AI and the tach/MPG while doing so.
                  </>
                  <>
                    <Bold>Trim:</Bold> eliminate the need to apply force to the control yoke. This
                    enables the pilot to focus on other tasks.
                  </>
                  <>
                    <Bold>Cross-Check:</Bold> visually scan the instruments and interpret the
                    indications to verify the desired performance
                  </>
                  <>
                    <Bold>Adjust:</Bold> if any deviations in performance were identified during the
                    cross-check, make adjustments in <Italic>small increments</Italic>
                  </>
                </BulletList>
              </>
            </Tab>

            <Tab heading="Primary and Supporting Method">
              <>
                This method focuses on the instruments that depict the most accurate and relevant
                information for the maneuver being performed. For example: though the AI may give an
                immediate and obvious indication that the aircraft is in a bank, there are other
                instruments which can more precisely indicate the rate of turn.{' '}
                <Bold>
                  Frequently, the primary instrument is meant to be held constant for the duration
                  of a maneuver; the supporting instruments indicate a flight parameter's trend.
                </Bold>
                <BulletList type="disc">
                  <>
                    <Bold>Pitch:</Bold> during straight and level flight, the primary instrument is
                    the <Info>altimeter</Info>. Supporting instruments include the{' '}
                    <Warning>ASI</Warning>, <Warning>VSI</Warning> and{' '}
                    <Warning>altitude trend tape</Warning>. When straight and level, the ASI will be
                    fixed, the VSI will indicate 0, the trend tape will not be shown. When a
                    deviation occurs, the ASI will decrease or inclease (for climbs and descents,
                    respectively) and the VSI/altitude trend tape will show the trend.
                  </>
                  <>
                    <Bold>Bank:</Bold> primary instrument is the <Info>heading indicator</Info>.
                    Supporting instruments include the <Warning>turn rate trend indicator</Warning>.
                  </>
                  <>
                    <Bold>Yaw:</Bold> primary instrument is the <Info>slip/skid indicator</Info>.
                    Indeed it is the only instrument providing yaw information.
                  </>
                  <>
                    <Bold>Power:</Bold> primary instrument is the <Info>ASI</Info>, as the main
                    purpose of power is to maintain a desired airspeed.
                  </>
                </BulletList>
              </>
            </Tab>
          </Tabs>,
        ],

        // Interpretation, operation, and limitations of pitch, bank, and power instruments
        k2: [
          <>
            Chapter 6 of the <Link.Reference reference="FAA-H-8083-15" /> identifies "two
            fundamental skills" for instrument flying:{' '}
            <InlineList>
              <>instrument cross-check</>
              <>instrument interpretation</>
            </InlineList>
            .
          </>,

          <Paragraph heading="Cross-Check and Scanning">
            Instrument cross-checking and scanning is fundamental to safe instrument attitude
            flight. The IFH defines cross-checking as "the continuous observation of the indications
            on the control and performance instruments."{' '}
            <Bold>No specific scanning method is recommended</Bold>; the FAA emphasizes the need for
            pilots to individually determine which instruments give them the most pertinent
            information for each phase of a maneuver.
          </Paragraph>,

          <>
            With that said, the <Bold>selected radial cross-check</Bold> technique is standard for
            glass panels and is the only technique discussed in the IFH chapter 6 part 2. This scan
            keeps the pilot's eyes on the AI 80-90% of the time. This is not difficulty to achieve
            given the large size of the AI on the PFD.
          </>,

          <Image noShadow src="pfd_scan">
            The <Bold>selected radial</Bold> method
          </Image>,

          <>
            Common errors in the scan include <Danger>fixation</Danger> (in which the pilot stares
            at one instrument), <Danger>omission</Danger> (in which one or more instruments is
            dropped completely from the scan—standby instruments and the compass are particularly
            common) and <Danger>emphasis</Danger> (where the pilot elevates the importance of one
            instrument above others).{' '}
            <Warning>
              Do not forget to include the engine instrumentation and moving map display on the MFD!
            </Warning>
          </>,

          <Paragraph heading="Instrument interpretation">
            Referring again to chapter 6 of the <Link.Reference reference="FAA-H-8083-15" />:
            <Quotation>
              [Instrument interpretation] begins by understanding each instrument’s construction and
              operating principles. Then, this knowledge must be applied to the performance of the
              aircraft being flown, the particular maneuvers to be executed, the cross-check and
              control techniques applicable to that aircraft, and the flight conditions.
            </Quotation>
          </Paragraph>,

          <>
            As the handbook explains, instrument interpretation will vary widely from aircraft to
            aircraft. The exact same instrument indication may lead to hugely different performances
            between aircraft. For example, at full power and a 10° nose-up attitude, a Cessna 172
            may climb at ~500 fpm at 90 knots; in a jet, the same configuration might result in a
            2000 fpm climb at 250 knots. Thus,{' '}
            <Info>instrument indications must be interpreted within a broader context.</Info> With
            that said, the handbook does provide some broadly-applicable advice, like{' '}
            <InlineList>
              <>
                begin to level out from a climb/descent when at 10% of the indicated vertical speed
                from the target altitude
              </>
              <>
                correct altitude deviations less than 100 feet with a pitch change of half a bar
                width, and altitude deviations greater than 100 feet with a pitch change of one
                whole bar width.
              </>
            </InlineList>
          </>,

          <>
            Chapter 6 ends with the following advice:{' '}
            <Quotation inline>
              For each maneuver, learn what performance to expect and the combination of instruments
              to be interpreted in order to control aircraft attitude during the maneuver.
            </Quotation>{' '}
            It's very important to get to know your aircraft before flying it IFR, let alone into
            IMC. Know what is normal and what to expect; this will make it much easier to recognize
            when things are abnormal and provides you with the foundation to fly in a standard, safe
            and repeatable manner.
          </>,

          <>
            The standard set of instruments are grouped into three categories:{' '}
            <InlineList>
              <>pitch</>
              <>bank</>
              <>power</>
            </InlineList>{' '}
            instruments.
          </>,

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Bold>Pitch</Bold>
              <BulletList type="disc">
                <>Attitude indicator</>
                <>Altimeter</>
                <>Airspeed indicator</>
                <>Vertical speed indicator</>
              </BulletList>
            </div>
            <div>
              <Bold>Bank</Bold>
              <BulletList type="disc">
                <>Attitude indicator</>
                <>Heading indicator</>
                <>Turn coordinator</>
              </BulletList>
            </div>
            <div>
              <Bold>Power</Bold>
              <BulletList type="disc">
                <>Manifold pressure gauge</>
                <>Tachometer</>
                <>Airspeed indicator</>
              </BulletList>
            </div>
          </div>,

          <>
            <Info>
              Some instruments (e.g. the attitude indicator or airspeed indicator) fall into
              multiple categories, because they provide information along multiple axes.
            </Info>{' '}
            When you must make an adjustment to your pitch, bank or power,{' '}
            <Success>
              you should cross-check all of the instruments in the given category to ensure the
              outcome is as desired.
            </Success>
          </>,
        ],

        k3: (
          <>
            No instrument is infallible, but some error more than others:
            <BulletList type="disc">
              <>
                <Warning>
                  Know the consequences/indications of icing over the pitot tube and static ports.
                </Warning>
                <BulletList type="disc">
                  <>
                    When the static port ices over, the altimeter will remain stuck at the altitude
                    where the ports froze, the VSI will read zero regardless of ones actual vertical
                    speed; the ASI will continue to operate in its usual manner (i.e. airspeed goes
                    down when you climb and up when you descend) but its value will be incorrect.
                  </>
                  <>
                    When the pitot tube is blocked (but the drain hole remains open), the ASI will
                    simply read zero.
                  </>
                  <>
                    When the pitot tube and drain hole both ice over, the ASI starts to behave like
                    an altimeter: it will show you accelerating in a climb and decelerating in a
                    descent; <Warning>this would be very confusing!</Warning>
                  </>
                </BulletList>
              </>
              <>
                Using the alternate static port (which provides the static system with air from
                within the cockpit) will cause the altimeter and ASI to read slightly high.{' '}
                <Info>
                  This is because air pressure within the airplane is slightly lower than ambient
                </Info>
                , which is itself a result of the Venturi effect (the normal static ports are also
                subject to this effect, but it's mitigated because the ports are deliberately
                positioned in places where the air{' '}
                <Link href={references.boundary_layer}>boundary layer</Link> is pronounced)
              </>
              <>
                Steep turns and sudden airspeed changes can cause conventional attitude indicators
                to precess. This is a much less significant problem in the age of{' '}
                <Link href={references.rlg}>ring laser gyros</Link>.
              </>
              <>
                Conventional heading indicators will also precess and must be realigned with the
                compass now and again
              </>
            </BulletList>
          </>
        ),

        // Physiology and degradation of the cross-check
        r1: [
          <>
            There are numerous ways in which human physiology can degrade in flight, with
            concomitant negative effects on attitude instrument flying. These should mostly be a
            recap from PPL training.
            <BulletList type="disc">
              <>
                <Warning>Hypoxia is a state of oxygen deficiency in the body</Warning>. There are
                several subcategories (i.e. hypoxic hypoxia, hypemic hypoxia, stagnant hypoxia and
                histotoxic hypoxia) which you can read more about{' '}
                <Link href={references.hypoxia}>here</Link>. Symptoms vary from person to person but
                some common ones include{' '}
                <Info>
                  cyanosis (blue fingernails and lips), headache, decreased reaction time/slower
                  thinking, euphoria, drowsiness, numbness, slurred speech
                </Info>
                , etc. Hypoxia may be experienced more acutely at night, because the rod cells in
                the eye--which are responsible for our vision in low-light environments--consume a
                relatively large amount of oxygen. Hence{' '}
                <Warning>hypoxia impairs night vision.</Warning>
              </>
              <>
                At night, instrument lighting should be kept only as bright as necessary to read the
                instrument. If the lights are too bright the rod cells may become{' '}
                <Link href={references.photobleaching}>photobleached</Link>, leaving the pilot
                unable to see the dim exterior environment.
              </>
            </BulletList>
          </>,
        ],

        // Spatial disorientation and optical illusions
        r2: [
          <Paragraph
            heading="Spatial disorientation & vestibular illusions"
            references={<Link.Reference reference="FAA-H-8083-25" text="Aeromedical Factors" />}
          >
            Spatial disorientation is a very serious risk when flying IFR.{' '}
            <Warning>
              The problem is that the human vestibular system is unable to distinguish between
              gravity and centrifugal force.
            </Warning>{' '}
            <Danger>
              The inner ear can think the body and aircraft are perfectly level when in fact they
              are in a significant bank.
            </Danger>{' '}
            This is so common that it has a nickname:{' '}
            <Link href={references.the_leans}>the leans.</Link> If not recognized and remedied, the
            leans can become a <Link href={references.graveyard_spiral}>graveyard spiral</Link>.
          </Paragraph>,

          <>
            Other common illusions include the <Info>"inversion illusion"</Info> and the{' '}
            <Info>"somatogravic illusion."</Info> The inversion illusion occurs when a steep climb
            levels off abruptly; the pilot feels as though they are tumbling backwards and is
            tempted to pitch down. The somatogravic illusion occurs when an aircraft rapidly
            accelerates or decelerates; the pilot feels as though the aircraft has pitched up or
            down, respectively, and is tempted to counter that with an inappropriate elevator input.
            The FAA has written at great length on these topics; see, for example,{' '}
            <Link href={references.spatial_disorientation}>this brochure</Link>.
          </>,

          <>
            <Danger>Pilots of all experience levels are vulnerable to these illusions.</Danger>{' '}
            <Success>
              The only remedy is to reject what your senses tell you and TRUST YOUR INSTRUMENTS.
            </Success>
          </>,

          <>
            On the plus side,{' '}
            <Success>
              there's reason to think that the glass cockpit mitigates vulnerability to these
              illusions.
            </Success>{' '}
            The close proximity of instruments on the PFD minimizes the amount of head/eye movement
            required during scanning, reducing susceptibility to certain illusions.
          </>,

          <Paragraph heading="Optical illusions">
            Flying in IMC plays havoc upon the inner ear, but it can also confuse the eye. Some of
            the more common optical illusions include:
            <BulletList type="disc">
              <>
                <Bold>Runway width illusion</Bold>: very wide or narrow runways can make a pilot
                think they are lower or higher than they really are, respectively. This is because a
                runway twice as wide as another will have the same sight picture at twice the
                height.
              </>
              <>
                <Bold>Runway slope illusion</Bold>: an upward sloping runway can trick a pilot into
                flying an approach too low. Once again, this is because the eye tells the pilot
                their sight picture looks normal; however, it's not the sight picture that matters.
              </>
              <>
                <Bold>Atmospheric illusion</Bold>: when the air is hazy, things seem further away
                than they really are. This can prompt a pilot to fly an approach too low because
                they think they are higher than they are.
              </>
            </BulletList>
          </Paragraph>,

          <>
            Pilots must also beware <Warning>false horizons</Warning> created by sloping clouds,
            mountainous terrain, lines of lights on the ground and so on.
          </>,
        ],
      }}
    />
  );
};

export default InstrumentFlight;

const references = {
  boundary_layer: uri.wikipedia('boundary_layer'),
  graveyard_spiral: uri.wikipedia('graveyard_spiral'),
  hypoxia: uri.faa('pilots/training/airman_education/topics_of_interest/hypoxia'),
  photobleaching: uri.wikipedia('photobleaching'),
  rlg: uri.wikipedia('ring_laser_gyroscope'),
  spatial_disorientation: uri.faa('pilots/safety/pilotsafetybrochures/media/spatiald.pdf'),
  the_leans: uri.wikipedia('the_leans'),
};
