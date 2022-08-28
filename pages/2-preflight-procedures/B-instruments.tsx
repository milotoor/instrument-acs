import { NextPage } from 'next';
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
  TaskPage,
  Term,
  ToDo,
  Warning,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { uri } from '../../lib/references';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(2, 'B') },
});

const Instruments: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        knowledge(id) {
          switch (id) {
            case '1a': // Pitot-static instrument operation
              return [
                <>
                  The pitot-static system provides information about the aircraft's altitude and
                  airspeed. It can be adjusted inputting the current altimeter setting in the{' '}
                  <Bold>Kollsman window</Bold>. Observing the altimeter error should be a part of
                  every preflight check:{' '}
                  <InlineList>
                    <>apply the current altimeter setting</>
                    <>read the indicated value from the instrument</>
                    <>compare it with the known field elevation</>
                  </InlineList>
                  . According to <AIM paragraph={[7, 2, 3, 'a']} />,{' '}
                  <Warning>
                    if the error is more than 75 feet the altimeter should be evaluated and/or
                    repaired.
                  </Warning>
                </>,

                <>
                  When departing from an airfield where you can't obtain an altimeter setting, you
                  should set the altimeter to the field elevation. See{' '}
                  <FAR section={[91, 121, 'a', 1, 'iii']} />. Keeping the altimeter setting up to
                  date during flight is quite important,{' '}
                  <Danger>
                    especially when transitioning from a high pressure region to a low pressure
                    region.
                  </Danger>
                  <Quotation>
                    If the altimeter is not set to the current altimeter setting when flying from an
                    area of high pressure into an area of low pressure, the aircraft will be closer
                    to the surface than the altimeter indicates. An inch Hg. error in the altimeter
                    setting equals 1,000 feet of altitude...To quote an old saying: “GOING FROM A
                    HIGH TO A LOW, LOOK OUT BELOW.”
                  </Quotation>
                  <Info>
                    In other words, if the altimeter setting is 1" too high, your indicated altitude
                    will be 1,000' too high.
                  </Info>
                </>,

                <>
                  In the Cessna 172 it's not aerodynamically feasible to reach the flight levels,
                  but{' '}
                  <Bold>
                    when transitioning through 18,000'/FL180 the altimeter should be set to 29.92
                    "Hg.
                  </Bold>{' '}
                  All flights in Class A airspace use pressure altitde.
                </>,

                <Paragraph heading="Altimeter Range Limitations" hr>
                  <AIM paragraph={[7, 2, 2]} /> discusses barometric pressure altimeter errors. Most
                  altimeters (at least in light, GA aircraft) can not be set below 28 or above 31
                  "Hg. When the barometric pressure is outside of this range, special procedures
                  should be used:
                  <BulletList bullet="disc">
                    <>
                      <Info>High barometric pressure (above 31 "Hg)</Info> may be caused by{' '}
                      <Info>cold, dry air masses</Info>. When an aircraft's altimeter cannot be set
                      above 31 “Hg, true altitude will be higher than indicated altitude. Whenever
                      this occurs, a NOTAM will be published in accordance with{' '}
                      <FAR section={[91, 144]} />. Procedures for operating in the NOTAM's
                      geographic area are described by <AIM paragraph={[7, 2, 3, 'c', 1, 'b']} />;
                      in short, IFR aircraft should{' '}
                      <InlineList>
                        <>
                          determine destination/alternate airports' suitability{' '}
                          <Bold>during flight planning</Bold> by increasing the approach's DA/MDA
                          and visibility by 100' and <span className="text-lg leading-4">¼</span>
                          SM, respectively, for every 0.1 "Hg over 31 "Hg
                        </>
                        <>
                          set 31 "Hg during the entire duration of flight within the affected area,
                          including the instrument approach
                        </>
                        <>
                          consider itself at DA/MDA when the altimeter reads the{' '}
                          <Bold>published DA/MDA</Bold> (its true altitude will be higher, but the
                          pilot <Danger>should not cheat at this!</Danger>)
                        </>
                      </InlineList>
                    </>
                    <>
                      <Danger>Low barometric pressure (below 28 "Hg)</Danger> is especially
                      hazardous. <Danger>Flight operations are not recommended</Danger> when an
                      aircraft's altimeter is unable to be set below 28 “Hg,{' '}
                      <Danger>
                        because the aircraft's true altitude is lower than the indicated altitude
                      </Danger>
                      . The regulations don't dig much further into this, probably because it's
                      inherently unsafe to fly with a too-high altimeter setting and they don't want
                      to encourage/endorse the practice.
                    </>
                  </BulletList>
                </Paragraph>,

                <Paragraph heading="Cold Temperature Corrections" hr>
                  Quoth <AIM paragraph={[7, 3, 1]} />:{' '}
                  <Quotation>
                    Temperature has an effect on the accuracy of barometric altimeters, indicated
                    altitude, and true altitude. The standard temperature at sea level is 15°C. The
                    temperature gradient from sea level is -2°C per 1,000 feet...When the ambient
                    (at altitude) temperature is colder than standard, the aircraft's true altitude
                    is lower than the indicated barometric altitude. When the ambient temperature is
                    warmer than the standard day, the aircraft's true altitude is higher than the
                    indicated barometric altitude.
                  </Quotation>
                </Paragraph>,

                <>
                  This is important to be mindful of in general, and for IFR flight in particular it
                  is crucial to understand when flying certain approaches. Certain airports in the
                  NAS are considered <Info>cold temperature airports (CTAs).</Info> The FAA
                  maintains a{' '}
                  <Link href={references.cold_temperature_airports}>list of such airports</Link>;
                  California only has three: Truckee (KTRK), Lake Tahoe (KTVL) and Nervine (O02).
                  ICAO provides a cold temperature correction table:
                </>,

                <Image src="cold_temperature_error_table">
                  Find the reported surface temperature on the left and the height (AGL) on top, and
                  the intersection represents how far the aircraft may be below the indicated
                  altitude due to possible cold temperature induced error.
                </Image>,

                <>
                  To comply with CTA procedures, pilots should apply corrections using the table
                  above and{' '}
                  <Bold>
                    notify ATC with the corrected altitude on any approach segment other than the
                    final segment.
                  </Bold>{' '}
                  The correction is applied like so (this is technically called the "All Segments
                  Method"):
                  <BulletList bullet="decimal">
                    <>
                      <Bold>From the IAF to the FAF:</Bold> Calculate the correction by taking the
                      FAF altitude and subtracting the airport elevation. Use this number to enter
                      the height-above-airport column in the table until reaching the reported
                      temperature's row. Apply any interpolation as needed and then add to all
                      altitudes from the IAF to the FAF.
                    </>
                    <>
                      <Bold>On the final segment:</Bold> Calculate the correction by taking the
                      MDA/DA for the approach being flown and subtract the airport elevation. Find
                      the intersection between this number and the reported temperature and round up
                      to next nearest 100. Add this number to MDA/DA and any step-down fixes in the
                      final segment.
                    </>
                    <>
                      <Bold>Missed approach:</Bold> Do the same steps as above using the final
                      missed approach holding altitude. Round the result from the table as needed
                      and then add to the final MA holding altitude only.
                    </>
                  </BulletList>
                </>,

                <>
                  You can technically also perform these calculations for each segment individually
                  using the <Bold>"Individual Segments Method"</Bold>. This follows the same logic
                  as above, but pilots may only update the segments marked with an "X" in the{' '}
                  <Link href={references.cold_temperature_airports}>CTA list</Link>.{' '}
                  <Warning>To me this seems like more work without a ton of payoff,</Warning> but
                  what do I know.
                </>,
              ];
            case '1c': // Electrical system, EFDs, transponder and ADS-B
              return [
                <Paragraph heading="Electrical System">
                  <ToDo />
                </Paragraph>,

                <Paragraph
                  heading="Electronic Flight Displays"
                  references={<Link href={references.g1000}>G1000 Pilot's Guide</Link>}
                >
                  EFDs such as the G1000 are tremendously powerful flight tools which integrate many
                  individual instruments into a coherent presentation.
                </Paragraph>,

                <Image src="efd" />,

                <>
                  Chapter 6, Section II and Chapter 7, Section II of the{' '}
                  <Link.Reference reference="FAA-H-8083-15" /> does a fantastic job of describing
                  attitude instrument flight using the PFD and MFD so I will not go into it here.
                  However, there are numerous other functions of the PFD/MFD relevant to IFR flight,
                  including the autopilot (GFC-700 is the native system for the G1000, both made by
                  Garmin) and IAP charts.{' '}
                  <Warning>
                    Building familiarity and fluency with the capabilities of the EFD is a
                    significant portion of IFR training in glass cockpits.
                  </Warning>{' '}
                  Check out the{' '}
                  <Link bold href={references.g1000}>
                    G1000 Pilot's Guide
                  </Link>{' '}
                  for specifics.
                </>,

                <Paragraph
                  heading="Transponder"
                  references={[<AIM paragraph={[4, 1, 20]} />, <FAR section={[91, 215]} />]}
                >
                  The transponder's role is to provide responses to ATC ground-based{' '}
                  <Term>Secondary Surveillance Radar (SSR)</Term> and{' '}
                  <Term>Traffic Alert and Collision Avoidance System (TCAS)</Term> interrogations.
                  There are several different classes of transponder, colloquially known as Mode A,
                  C and S transponders; most aircraft these days use Mode S, described by{' '}
                  <Link href={references.tso_c112}>TSO-C112</Link>. Importantly,{' '}
                  <Info>
                    the automated altitude reporting performed by the transponder is using pressure
                    altitude, so ATC receives an accurate reporting of your altitude even if you set
                    the altimeter incorrectly.
                  </Info>
                </Paragraph>,

                <>
                  <FAR section={[91, 215, 'b']} /> specifies what airspace is off limits for
                  aircraft without a functioning transponder:
                  <BulletList bullet="disc">
                    <>
                      <Bold>Class A, B or C airspace.</Bold>{' '}
                      <Warning>
                        This includes all airspace within the lateral boundaries of class B and
                        class C airspace.
                      </Warning>
                    </>
                    <>
                      <Bold>Within the mode C veil</Bold>, which is technically described as the
                      airspace within a 30-mile radius of an airport in{' '}
                      <FAR appendix={[91, 'D']} bold={false} /> section 1 (the class B airports)
                    </>
                    <>
                      <Bold>Above 10,000' MSL</Bold> but not below 2,500' AGL
                    </>
                    <>ATC may authorize a deviation from these rules if necessary</>
                  </BulletList>
                </>,

                <Paragraph
                  heading="ADS-B"
                  hr
                  references={[
                    <AIM paragraph={[4, 5, 7]} />,
                    <FAR section={[91, 225]} />,
                    <FAR section={[91, 227]} />,
                  ]}
                >
                  <Term>Automatic Dependent Surveillance-Broadcast (ADS-B)</Term> is a relatively
                  new technology, and was only recently mandated. ADS-B Out periodically broadcasts
                  the aircraft's GPS-derived position, altitude, velocity and identifier in response
                  to queries from ground-based equipment. The full set of information that must be
                  included is defined in <FAR section={[91, 227]} />.
                </Paragraph>,

                <>
                  ADS-B In avionics enable aircraft to receive other aircraft's ADS-B Out
                  transmissions as well as transmissions from ATC ground stations. Other broadcast
                  services received with ADS-B In equipment include{' '}
                  <Term>Traffic Information Service-Broadcast (TIS-B)</Term> (
                  <AIM paragraph={[4, 5, 8]} />) and{' '}
                  <Term>Flight Information Service-Broadcast (FIS-B)</Term> (
                  <AIM paragraph={[4, 5, 9]} />
                  ).
                </>,

                <>
                  As of January 1, 2020, aircraft are required to have ADS-B Out in order to fly in
                  virtually any of the places that require an altitude-reporting transponder (i.e.{' '}
                  <InlineList delimeter=";">
                    <>class A, B, and C airspace</>
                    <>within the lateral boundaries of class B and C airspace</>
                    <>within the mode C veil</>
                    <>above 10,000' MSL excluding 2,500' AGL</>
                  </InlineList>
                  ). If installed, ADS-B Out equipment should be in transmit mode at all times.
                </>,

                <Image src="ads_b" noMargin />,
              ];
            case '2': // Operation of nav systems
              return [
                <>
                  I couldn't quite figure out where to place this factoid.{' '}
                  <FAR section={[91, 21]} /> prohibits the use of portable electronic devices (by
                  the flight crew or passengers) on IFR flights unless{' '}
                  <Italic>
                    "the operator of the aircraft has determined will not cause interference with
                    the navigation or communication system of the aircraft."
                  </Italic>{' '}
                  Curiously, the regulation also does not apply to{' '}
                  <InlineList logic="or">
                    <>portable voice recorders</>
                    <>electric shavers</>
                  </InlineList>
                  .
                </>,
              ];
          }
        },
      }}
    />
  );
};

export default Instruments;

const references = {
  cold_temperature_airports: 'https://aeronav.faa.gov/d-tpp/Cold_Temp_Airports.pdf',
  g1000: 'http://static.garmin.com/pumac/190-00498-08_0A_Web.pdf',
  tso_c112: uri.tso('a920c2bd43aa26b786257bf0006e6acd/$FILE/TSO-C112e.pdf'),
};
