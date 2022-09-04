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
  Link,
  Paragraph,
  Quotation,
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
  props: { structure: getStructure(), task: getTaskFromSectionLetter(2, 'B') },
});

const Instruments: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        // Pitot-static instrument operation
        k1a: [
          <>
            The pitot-static system provides information about the aircraft's altitude and airspeed.
            It can be adjusted inputting the current altimeter setting in the{' '}
            <Bold>Kollsman window</Bold>. Observing the altimeter error should be a part of every
            preflight check:{' '}
            <InlineList>
              <>apply the current altimeter setting</>
              <>read the indicated value from the instrument</>
              <>compare it with the known field elevation</>
            </InlineList>
            . According to <AIM paragraph={[7, 2, 3, 'a']} />,{' '}
            <Warning>
              if the error is more than 75 feet the altimeter should be evaluated and/or repaired.
            </Warning>
          </>,

          <>
            When departing from an airfield where you can't obtain an altimeter setting, you should
            set the altimeter to the field elevation. See <FAR section={[91, 121, 'a', 1, 'iii']} />
            . Keeping the altimeter setting up to date during flight is quite important,{' '}
            <Danger>
              especially when transitioning from a high pressure region to a low pressure region.
            </Danger>
            <Quotation>
              If the altimeter is not set to the current altimeter setting when flying from an area
              of high pressure into an area of low pressure, the aircraft will be closer to the
              surface than the altimeter indicates. An inch Hg. error in the altimeter setting
              equals 1,000 feet of altitude...To quote an old saying: “GOING FROM A HIGH TO A LOW,
              LOOK OUT BELOW.”
            </Quotation>
            <Info>
              In other words, if the altimeter setting is 1" too high, your indicated altitude will
              be 1,000' too high.
            </Info>
          </>,

          <>
            In the Cessna 172 it's not aerodynamically feasible to reach the flight levels, but{' '}
            <Bold>
              when transitioning through 18,000'/FL180 the altimeter should be set to 29.92 "Hg.
            </Bold>{' '}
            All flights in Class A airspace use pressure altitde.
          </>,

          <Paragraph heading="Altimeter Range Limitations" hr>
            <AIM paragraph={[7, 2, 2]} /> discusses barometric pressure altimeter errors. Most
            altimeters (at least in light, GA aircraft) can not be set below 28 or above 31 "Hg.
            When the barometric pressure is outside of this range, special procedures should be
            used:
            <BulletList bullet="disc">
              <>
                <Info>High barometric pressure (above 31 "Hg)</Info> may be caused by{' '}
                <Info>cold, dry air masses</Info>. When an aircraft's altimeter cannot be set above
                31 “Hg, true altitude will be higher than indicated altitude. Whenever this occurs,
                a NOTAM will be published in accordance with <FAR section={[91, 144]} />. Procedures
                for operating in the NOTAM's geographic area are described by{' '}
                <AIM paragraph={[7, 2, 3, 'c', 1, 'b']} />; in short, IFR aircraft should{' '}
                <InlineList>
                  <>
                    determine destination/alternate airports' suitability{' '}
                    <Bold>during flight planning</Bold> by increasing the approach's DA/MDA and
                    visibility by 100' and <span className="text-lg leading-4">¼</span>
                    SM, respectively, for every 0.1 "Hg over 31 "Hg
                  </>
                  <>
                    set 31 "Hg during the entire duration of flight within the affected area,
                    including the instrument approach
                  </>
                  <>
                    consider itself at DA/MDA when the altimeter reads the{' '}
                    <Bold>published DA/MDA</Bold> (its true altitude will be higher, but the pilot{' '}
                    <Danger>should not cheat at this!</Danger>)
                  </>
                </InlineList>
              </>
              <>
                <Danger>Low barometric pressure (below 28 "Hg)</Danger> is especially hazardous.{' '}
                <Danger>Flight operations are not recommended</Danger> when an aircraft's altimeter
                is unable to be set below 28 “Hg,{' '}
                <Danger>
                  because the aircraft's true altitude is lower than the indicated altitude
                </Danger>
                . The regulations don't dig much further into this, probably because it's inherently
                unsafe to fly with a too-high altimeter setting and they don't want to
                encourage/endorse the practice.
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Cold Temperature Corrections" hr>
            Quoth <AIM paragraph={[7, 3, 1]} />:{' '}
            <Quotation>
              Temperature has an effect on the accuracy of barometric altimeters, indicated
              altitude, and true altitude. The standard temperature at sea level is 15°C. The
              temperature gradient from sea level is -2°C per 1,000 feet...When the ambient (at
              altitude) temperature is colder than standard, the aircraft's true altitude is lower
              than the indicated barometric altitude. When the ambient temperature is warmer than
              the standard day, the aircraft's true altitude is higher than the indicated barometric
              altitude.
            </Quotation>
          </Paragraph>,

          <>
            This is important to be mindful of in general, and for IFR flight in particular it is
            crucial to understand when flying certain approaches. Certain airports in the NAS are
            considered <Info>cold temperature airports (CTAs).</Info> The FAA maintains a{' '}
            <Link href={references.cold_temperature_airports}>list of such airports</Link>;
            California only has three: Truckee (KTRK), Lake Tahoe (KTVL) and Nervine (O02). ICAO
            provides a cold temperature correction table:
          </>,

          <Image src="cold_temperature_error_table">
            Find the reported surface temperature on the left and the height (AGL) on top, and the
            intersection represents how far the aircraft may be below the indicated altitude due to
            possible cold temperature induced error.
          </Image>,

          <>
            To comply with CTA procedures, pilots should apply corrections using the table above and{' '}
            <Bold>
              notify ATC with the corrected altitude on any approach segment other than the final
              segment.
            </Bold>{' '}
            The correction is applied like so (this is technically called the "All Segments
            Method"):
            <BulletList bullet="decimal">
              <>
                <Bold>From the IAF to the FAF:</Bold> Calculate the correction by taking the FAF
                altitude and subtracting the airport elevation. Use this number to enter the
                height-above-airport column in the table until reaching the reported temperature's
                row. Apply any interpolation as needed and then add to all altitudes from the IAF to
                the FAF.
              </>
              <>
                <Bold>On the final segment:</Bold> Calculate the correction by taking the MDA/DA for
                the approach being flown and subtract the airport elevation. Find the intersection
                between this number and the reported temperature and round up to next nearest 100.
                Add this number to MDA/DA and any step-down fixes in the final segment.
              </>
              <>
                <Bold>Missed approach:</Bold> Do the same steps as above using the final missed
                approach holding altitude. Round the result from the table as needed and then add to
                the final MA holding altitude only.
              </>
            </BulletList>
          </>,

          <>
            You can technically also perform these calculations for each segment individually using
            the <Bold>"Individual Segments Method"</Bold>. This follows the same logic as above, but
            pilots may only update the segments marked with an "X" in the{' '}
            <Link href={references.cold_temperature_airports}>CTA list</Link>.{' '}
            <Warning>To me this seems like more work without a ton of payoff,</Warning> but what do
            I know.
          </>,
        ],

        // Electrical system, EFDs, transponder and ADS-B
        k1c: [
          <Paragraph heading="Electrical System">
            <ToDo />
          </Paragraph>,

          <Paragraph
            heading="Electronic Flight Displays"
            references={<Link.Reference reference="g1000" />}
          >
            EFDs such as the G1000 are tremendously powerful flight tools which integrate many
            individual instruments into a coherent presentation.
          </Paragraph>,

          <Image src="efd" />,

          <>
            Chapter 6, Section II and Chapter 7, Section II of the{' '}
            <Link.Reference reference="FAA-H-8083-15" /> does a fantastic job of describing attitude
            instrument flight using the PFD and MFD so I will not go into it here. However, there
            are numerous other functions of the PFD/MFD relevant to IFR flight, including the
            autopilot (GFC-700 is the native system for the G1000, both made by Garmin) and IAP
            charts.{' '}
            <Warning>
              Building familiarity and fluency with the capabilities of the EFD is a significant
              portion of IFR training in glass cockpits.
            </Warning>{' '}
            Check out the <Link.Reference reference="g1000" /> for specifics.
          </>,

          <Paragraph
            heading="Transponder"
            references={[<AIM paragraph={[4, 1, 20]} />, <FAR section={[91, 215]} />]}
          >
            The transponder's role is to provide responses to ATC ground-based{' '}
            <Term>Secondary Surveillance Radar (SSR)</Term> and{' '}
            <Term>Traffic Alert and Collision Avoidance System (TCAS)</Term> interrogations. There
            are several different classes of transponder, colloquially known as Mode A, C and S
            transponders; most aircraft these days use Mode S, described by{' '}
            <Link href={references.tso_c112}>TSO-C112</Link>. Importantly,{' '}
            <Info>
              the automated altitude reporting performed by the transponder is using pressure
              altitude, so ATC receives an accurate reporting of your altitude even if you set the
              altimeter incorrectly.
            </Info>
          </Paragraph>,

          <>
            <FAR section={[91, 215, 'b']} /> specifies what airspace is off limits for aircraft
            without a functioning transponder:
            <BulletList bullet="disc">
              <>
                <Bold>Class A, B or C airspace.</Bold>{' '}
                <Warning>
                  This includes all airspace within the lateral boundaries of class B and class C
                  airspace.
                </Warning>
              </>
              <>
                <Bold>Within the mode C veil</Bold>, which is technically described as the airspace
                within a 30-mile radius of an airport in <FAR appendix={[91, 'D']} bold={false} />{' '}
                section 1 (the class B airports)
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
            <Term>Automatic Dependent Surveillance-Broadcast (ADS-B)</Term> is a relatively new
            technology, and was only recently mandated. ADS-B Out periodically broadcasts the
            aircraft's GPS-derived position, altitude, velocity and identifier in response to
            queries from ground-based equipment. The full set of information that must be included
            is defined in <FAR section={[91, 227]} />.
          </Paragraph>,

          <>
            ADS-B In avionics enable aircraft to receive other aircraft's ADS-B Out transmissions as
            well as transmissions from ATC ground stations. Other broadcast services received with
            ADS-B In equipment include <Term>Traffic Information Service-Broadcast (TIS-B)</Term> (
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
        ],

        // Operation of nav systems
        k2: [
          <>
            I couldn't quite figure out where to place this factoid. <FAR section={[91, 21]} />{' '}
            prohibits the use of portable electronic devices (by the flight crew or passengers) on
            IFR flights unless{' '}
            <Quotation>
              ...the operator of the aircraft has determined [the device] will not cause
              interference with the navigation or communication system of the aircraft.
            </Quotation>{' '}
            Curiously, the regulation also does not apply to{' '}
            <InlineList logic="or">
              <>portable voice recorders</>
              <>electric shavers</>
            </InlineList>
            .
          </>,
        ],
        k2a: [
          <Tabs>
            <Tab heading="VOR">
              <Tabs>
                <Tab
                  heading="Accuracy Checks"
                  references={[<FAR section={[91, 171]} />, <AIM paragraph={[1, 1, 4]} />]}
                >
                  <>
                    An aircraft's VOR receivers must be checked <Bold>every 30 days</Bold> for
                    accuracy in order for them to be used during IFR flight. There are several
                    different ways VOR receivers may be tested:
                    <BulletList>
                      <>
                        <Term>VOR test facility (VOT):</Term> these are special facilities which
                        only broadcast the 360° radial signal. No matter where you are relative to
                        the facility, tuning in the VOT frequency and centering the needle should
                        show <Info>0° FROM or 180° TO (±4°)</Info>
                      </>
                      <>
                        <Bold>Ground or airborne checkpoint:</Bold> these are designated areas on
                        the airport surface (or at a specified GPS coordinate/fix for airborne
                        checks) where the bearing from a given VOR is known. When positioned over
                        the checkpoint and with the known radial entered, the needle should be
                        centered with a FROM indication,{' '}
                        <Info>±4° on the ground or ±6° in the air.</Info> These checkpoints are
                        listed in the Chart Supplement.
                      </>
                      <>
                        <Bold>Airborne airway check:</Bold> this is probably the most convoluted way
                        to check accuracy. The steps to take are:{' '}
                        <InlineList>
                          <>
                            select a VOR airway to establish a known, published bearing FROM the VOR
                          </>
                          <>
                            select a prominent ground point along the airway, preferably 20NM or
                            more from the facility (this is best done at a low altitude to ensure
                            your position over the ground)
                          </>
                          <>note the indicated VOR bearing</>
                        </InlineList>
                        . The bearing must be within{' '}
                        <Info>±6° of the airway's published radial.</Info>
                      </>
                      <>
                        <Bold>Dual VOR check:</Bold> Aircraft with two VOR receivers may verify
                        their correctness against each other. With both both receivers tuned to the
                        same VOR and with both needles centered,{' '}
                        <Info>the radials should be ±4° from one another.</Info>
                      </>
                    </BulletList>
                  </>
                  <>
                    The results of the VOR test must be entered in the aircraft logbook. The log
                    entry must include the{' '}
                    <InlineList>
                      <>date</>
                      <>place</>
                      <>bearing error</>
                      <>the pilot's signature</>
                    </InlineList>
                    .
                  </>
                </Tab>
                <Tab heading="Identification" references={<Link.Reference reference="g1000" />}>
                  <>
                    The first step with using any VOR for navigation is to ensure that you're
                    navigating off of what you think you're navigating off of. This is done by
                    identifying the VOR. In a steam gauge cockpit you need to listen in to a Morse
                    code signal which is broadcast by the VOR station around the clock.{' '}
                    <Warning>
                      The absence of the Morse signal indicates either you are on the wrong
                      frequency or the VOR is down for maintenance and the navigation signals should
                      not be trusted.
                    </Warning>
                  </>

                  <>
                    Glass cockpits make this easy. After tuning the frequency, the software will
                    automatically decode the Morse signal and render the ID next to the frequency
                    display. In the image below, the BNA and GHM VORs have been tuned in and both
                    are identified in NAV 1 and NAV 2, respectively. The BNA VOR is being actively
                    used for navigation, <Success>as indicated in green.</Success>
                  </>

                  <Image src="g1000_vor_id" noShadow />

                  <>
                    If for whatever reason the G1000 does not automatically identify the VOR,{' '}
                    <Info>
                      you can always listen in yourself by pressing the VOL/ID button on the audio
                      panel.
                    </Info>
                  </>
                </Tab>

                <Tab heading="Operation">
                  <>
                    VOR operation can be tricky, and it has more than its fair share of quirks and
                    pitfalls. Conceptually it's quite simple:{' '}
                    <Bold>
                      rotate the OBS knob until the needle is centered and your bearing TO or FROM
                      the station can be read right off the instrument.
                    </Bold>{' '}
                    Five dots to either side of the centerline are spaced out at 2° each, yielding
                    an indication of how far off course you are.
                  </>

                  <Image.Row>
                    <Image src="vor" />
                    <Image src="vor_principle" type="gif" />
                  </Image.Row>

                  <Paragraph heading="Quirks">
                    <BulletList bullet="disc">
                      <>
                        <Term>Cone of confusion</Term>
                      </>
                      <>
                        <Term>Proximal sensitivity</Term>
                      </>
                    </BulletList>
                  </Paragraph>
                </Tab>

                <Tab
                  heading="Minimum Operational Network"
                  references={<AIM paragraph={[1, 1, 3, 'f']} />}
                >
                  <Quotation source={['FAA', references.vor_mon]}>
                    The FAA is transitioning the National Airspace System (NAS) to Performance Based
                    Navigation (PBN). As a result, the VOR infrastructure in the Contiguous United
                    States (CONUS) is being repurposed to provide a conventional backup navigation
                    service during potential Global Positioning System (GPS) outages. This backup
                    infrastructure is known as the VOR MON.
                  </Quotation>

                  <>
                    At its core, the MON is a backup system for aircraft to fall back on in case of
                    a widespread GPS failure. It is intended to provide "
                    <Info>nearly continuous VOR signal coverage at 5,000 feet AGL</Info> across the
                    NAS, outside of the Western U.S. Mountains Area (WUSMA)." However,{' '}
                    <Warning>
                      there is no plan to change the NAVAID/route structure is the WUSMA.
                    </Warning>{' '}
                    Nearly all VORs inside the WUSMA will be retained. A complete list of the VORs
                    up for discontinuance can be found in the{' '}
                    <Link href={references.federal_register_mon}>Federal Register</Link>.
                  </>

                  <>
                    A key objective of the MON is to ensure that{' '}
                    <Info>
                      any aircraft in the CONUS, regardless of its position, will be within 100NM of
                      a MON airport (i.e. one with an ILS or VOR approach).
                    </Info>{' '}
                    Though aircraft may voluntarily use the MON at any time, it is primarily
                    intended as a reversionary system.{' '}
                    <Success>
                      The FAA has not and will not mandate that pilots plan to divert to, and carry
                      sufficient fuel to reach, a MON airport.
                    </Success>{' '}
                    However, pilots of aircraft which do not have VOR receivers (e.g. WAAS-only
                    equipped aircraft) should think carefully about backup plans in the case of a
                    GPS outage.
                  </>

                  <Paragraph heading="Service volumes">
                    Making the collective VOR service volume ubiquitously available at 5,000' MSL
                    has required some adjustments to the VOR standard service volumes. In the past,
                    the FAA bucketed VORs into three different types: terminal, low and high. The
                    categories were defined by the service volume they covered:{' '}
                    <InlineList>
                      <>
                        terminal VORs cover a cylindrical volume with a 25NM radius, from 1,000'
                        above terminal height (ATH) up to 12,000' ATH
                      </>
                      <>low VORs cover a 40NM radius from 1,000' ATH up to 18,000' ATH</>
                      <>high VORs cover a complex volume of overlapping cylinders</>
                    </InlineList>{' '}
                    (see image below).
                  </Paragraph>

                  <>
                    In December 2020, the FAA announced two new VOR service volumes in support of
                    the MON: VOR low and VOR high. At 5,000' ATH, both types support signal
                    reception up to 70NM away. Read more about VOR service volumes{' '}
                    <Link href={references.vor_service_volumes}>here</Link>.
                  </>

                  <Image.Row>
                    <Image src="vor_service_volumes_legacy">Original service volumes</Image>
                    <Image src="vor_service_volumes_new">New service volumes</Image>
                  </Image.Row>
                </Tab>
              </Tabs>
            </Tab>

          </Tabs>,
        ],
      }}
    />
  );
};

export default Instruments;

const references = {
  cold_temperature_airports: 'https://aeronav.faa.gov/d-tpp/Cold_Temp_Airports.pdf',
  federal_register_mon: 'https://www.govinfo.gov/content/pkg/FR-2016-07-26/pdf/2016-17579.pdf',
  tso_c112: uri.tso('a920c2bd43aa26b786257bf0006e6acd/$FILE/TSO-C112e.pdf'),
  vor_mon:
    'https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gbng/vormon',
  vor_service_volumes: uri.boldMethod('navigation', 'the-types-of-vors-and-how-to-identify-them/'),
};
