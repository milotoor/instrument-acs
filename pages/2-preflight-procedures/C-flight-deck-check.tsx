import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  FAR,
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
const FlightDeckCheck: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={2}
      task="C"
      notes={{
        k1: [
          <>
            The importance of checking to make sure everything in the aircraft works ought to be
            fairly obvious. It's the whole reason for the run-up:{' '}
            <Danger>
              to make sure everything is in working order before you bet your life on this flying
              piece of metal.
            </Danger>{' '}
            This check is even more important when flying IFR, because you are completely reliant on
            functional instrumentation for all aspects of flight.
          </>,

          <>
            <Success>
              You should always adhere to the preflight/run-up checklists for your specific
              aircraft.
            </Success>{' '}
            In addition, there are some specific checks to make before operating under IFR:
            <BulletList type="disc">
              <>
                Per <AIM paragraph={[7, 2, 3]} />, the altimeter should read airport elevation ±75
                feet once the current altimeter setting is entered. You should probably be concerned
                if it's off by less than that, though.
              </>
              <>
                The attitude indicator should be stable and level shortly after engine start. The
                vacuum system should be fully operational within a couple minutes, and the AHRS
                system should be initialized even faster (since it doesn't rely on RPM).
              </>
              <>
                <Warning>Verify that your GPS/terrain database is up to date!</Warning>{' '}
                <AIM paragraph={[1, 1, 17, 'b', 2, 'b']} /> specifically states that "the onboard
                navigation data must be current and appropriate for the region of intended
                operation." It also includes two preflight steps for verifying database validity:{' '}
                <InlineList>
                  <>
                    determine the date of database issuance, and verify that the date/time of
                    proposed use is before the expiration date/time
                  </>
                  <>
                    verify that the database provider has not published a notice limiting the use of
                    the specific waypoint or procedure
                  </>
                </InlineList>
                .{' '}
                <Warning>
                  The GPS typically needs an update every 28 days--the same cycle on which IFR
                  charts are published.
                </Warning>
              </>
              <>
                When taxiing, make note of the following:{' '}
                <InlineList delimiter=";">
                  <>the airspeed indicator should read 0, or very close to it</>
                  <>
                    the attitude indicator should remain level (during turns it may shift
                    ever-so-slightly)
                  </>
                  <>the inclinometer (i.e. "the ball") should swing to the outside of the turn</>
                  <>the slip/skid indicator should also move during turns</>
                  <>the vertical speed indicator should read 0</>
                  <>
                    the magnetic compass should make sense and agree with the directional indicator
                  </>
                </InlineList>
              </>
            </BulletList>
          </>,
        ],
        k2: [
          <Paragraph heading="Required inspections">
            <Info>
              The inspections required for flying under IFR include and extend inspections for
              flying VFR.
            </Info>{' '}
            As a recap, the Part 91 VFR inspections include:
            <BulletList type="disc">
              <>
                All <Term>airworthiness directives (AD)</Term> must be in compliance (
                <FAR section={[91, 403, 'a']} />)
              </>
              <>
                An annual inspection (<FAR section={[91, 409, 'a']} />)
              </>
              <>
                A 100-hour inspection (<FAR section={[91, 409, 'b']} />
                ); this only applies to aircraft flown for hire or rented for flight instruction.
              </>
              <>
                The transponder must be inspected <Info>every 24 calendar months</Info> (
                <FAR section={[91, 413]} />)
              </>
              <>
                The ELT must be inspected <Info>every 12 calendar months</Info> (
                <FAR section={[91, 207, 'c-d']} />
                ), and the battery must be replaced after one hour's cumulative use or when 50% of
                the battery's useful life has expired.{' '}
                <Warning>How do you know your ELT meets these usage criteria?</Warning>
              </>
            </BulletList>
          </Paragraph>,

          <>
            In addition, the following inspections are required for flight under IFR:
            <BulletList type="disc">
              <>
                <Info>
                  The altimeter and pitot-static pressure system must have been tested in the last
                  24 calendar months
                </Info>{' '}
                (<FAR section={[91, 411]} />
                ); this includes testing the Mode C altitude reporting system
              </>
              <>
                <Info>
                  If used during a flight, a VOR receiver must have been checked within the last 30
                  days
                </Info>{' '}
                (<FAR section={[91, 171]} />; <AIM paragraph={[1, 1, 4]} />
                ). Unlike all of the other inspections listed here,{' '}
                <Success>this check may be performed by a pilot.</Success> There are several
                different ways VOR receivers may be tested:
                <BulletList type="decimal">
                  <>
                    <Term>VOR test facility (VOT):</Term> these are special facilities which only
                    broadcast the 360° radial signal. No matter where you are relative to the
                    facility, tuning in the VOT frequency and centering the needle should show{' '}
                    <Info>0° FROM or 180° TO (±4°)</Info>
                  </>
                  <>
                    <Bold>Ground or airborne checkpoint:</Bold> these are designated areas on the
                    airport surface (or at a specified GPS coordinate/fix for airborne checks) where
                    the bearing from a given VOR is known. When positioned over the checkpoint and
                    with the known radial entered, the needle should be centered with a FROM
                    indication, <Info>±4° on the ground or ±6° in the air.</Info> These checkpoints
                    are listed in the Chart Supplement.
                  </>
                  <>
                    <Bold>Airborne airway check:</Bold> this is probably the most convoluted way to
                    check accuracy. The steps to take are:{' '}
                    <InlineList>
                      <>select a VOR airway to establish a known, published bearing FROM the VOR</>
                      <>
                        select a prominent ground point along the airway, preferably 20NM or more
                        from the facility (this is best done at a low altitude to ensure your
                        position over the ground)
                      </>
                      <>note the indicated VOR bearing</>
                    </InlineList>
                    . The bearing must be within <Info>±6° of the airway's published radial.</Info>
                  </>
                  <>
                    <Bold>Dual VOR check:</Bold> Aircraft with two VOR receivers may verify their
                    correctness against each other. With both both receivers tuned to the same VOR
                    and with both needles centered,{' '}
                    <Info>the radials should be ±4° from one another.</Info>
                  </>
                </BulletList>
                <div className="mt-2">
                  The results of the VOR test must be entered in the aircraft logbook. The log entry
                  must include the{' '}
                  <InlineList>
                    <>date</>
                    <>place</>
                    <>bearing error</>
                    <>the pilot's signature</>
                  </InlineList>
                  .
                </div>
              </>
            </BulletList>
          </>,

          <>
            You can use the AAV1ATE acronym to remember these:
            <BulletList type="disc">
              <>
                <Bold>A</Bold>irworthiness directives
              </>
              <>
                <Bold>A</Bold>nnual inspection
              </>
              <>
                <Bold>V</Bold>OR
              </>
              <>
                <Bold>1</Bold>00 hour
              </>
              <>
                <Bold>A</Bold>ltimeter/static system
              </>
              <>
                <Bold>T</Bold>ransponder
              </>
              <>
                <Bold>E</Bold>LT
              </>
            </BulletList>
          </>,

          <Paragraph heading="Required equipment" references={<FAR section={[91, 205, 'd']} />}>
            As with the inspections,{' '}
            <Info>
              the list of required equipment for flight under IFR extends the equivalent list for
              flight under VFR.
            </Info>{' '}
            Review <FAR section={[91, 205, 'b-c']} /> for the VFR day/night equipment requirements.
            For flight under IFR, the following equipment is required:
            <BulletList type="disc">
              <>Two-way radio communication equipment</>
              <>Navigation equipment suitable to the route being flown</>
              <>Gyroscopic rate-of-turn indicator</>
              <>Slip-skid indicator</>
              <>"Sensitive" adjustable altimeter</>
              <>Clock displaying hours, minutes and seconds</>
              <>Electrical generator or alternator</>
              <>Gyroscopic attitude indicator</>
              <>Gyroscopic directional indicator</>
            </BulletList>
          </Paragraph>,
        ],
        k3: [
          <>
            Flying with inoperative equipment under IFR can be permissible. As with VFR flight,
            there are two crucial sources of information regarding which aircraft equipment are
            permitted to be inoperative: <FAR section={[91, 213]} /> and the aircraft's{' '}
            <Term>minimum equipment list (MEL)</Term> or{' '}
            <Term>kinds of operation equipment list (KOEL)</Term>
          </>,

          <Paragraph heading="Minimum Equipment Lists" references={<FAR section={[91, 213]} />}>
            Most small aircraft do not have an <Link href={references.mel}>MEL</Link>. They are
            aircraft- and operator-specific and must be approved by the FAA:
          </Paragraph>,

          <Quotation source={['Skybrary', references.mel]}>
            [The] FAA considers an approved MEL to be a Supplementary Type Certificate (STC) issued
            to a particular aircraft by serial number and registration number as a way of providing
            authority to fly it in a condition other than that at which it was originally
            type-certificated
          </Quotation>,

          <Warning>
            Ironically, an MEL actually lists all of the equipment that is permitted to be
            inoperative, <Italic>not</Italic> the equipment that must be operational!
          </Warning>,

          <Paragraph heading="Kinds of Operation Equipment Lists">
            Small GA aircraft like the Cessna Skyhawk are more likely to have a KOEL, which
            specifies under which conditions each aircraft component must be operational. For
            example, the Cessna 172S's KOEL begins like this:
          </Paragraph>,

          <Image src="koel" />,

          <>
            Each component is listed as required or not required for four different categories:{' '}
            <InlineList>
              <>VFR day</>
              <>VFR night</>
              <>IFR day</>
              <>IFR night</>
            </InlineList>
            . Some components, such as the <Info>main battery and alternator</Info>, are required
            under all operational conditions. Others, such as the <Warning>VHF COM radio</Warning>,
            are not required for VFR but are required for IFR. Still others, like the{' '}
            <Success>PFD fan</Success>, are not required under any conditions. Some, like the
            standby ammeter, are more nuanced and require additional notes (not pictured).
          </>,

          <Danger>
            Be ready to review the KOEL on the check ride! You are guaranteed to be asked about
            inoperative equipment!
          </Danger>,

          <Paragraph
            heading="Operation with Inoperative Equipment"
            references={<FAR section={[91, 213, 'd']} />}
          >
            If the pilot determines that the inoperative instrument/equipment{' '}
            <InlineList>
              <>
                is not required by <FAR section={[91, 205]} />, the KOEL or any ADs
              </>
              <>does not pose a hazard or jeopardize flight safety</>
            </InlineList>
            , then the aircraft may be operated if the instrument/equipment is either:
            <BulletList type="roman">
              <>
                Removed from the aircraft, the cockpit control placarded, and the maintenance
                recorded in accordance with <FAR section={[43, 9]} />; or
              </>
              <>Deactivated and placarded “Inoperative”</>
            </BulletList>
          </Paragraph>,
        ],
      }}
    />
  );
};

export default FlightDeckCheck;

const references = {
  mel: uri.skybrary('minimum-equipment-list-mel'),
};
