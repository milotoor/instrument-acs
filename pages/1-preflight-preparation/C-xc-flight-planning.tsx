import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Collapse,
  Danger,
  FAR,
  Gray,
  Image,
  Info,
  InlineList,
  Italic,
  Katex,
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
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const XcFlightPlanning: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={1}
      task="C"
      notes={{
        // Route planning
        k1: [
          <>
            To plan the en route portion of the flight, work backwards from an IAF to the departure
            airport. Consider the following during the planning:{' '}
            <BulletList type="disc">
              <>
                The Chart Supplement publishes a list of <Bold>Preferred Routes</Bold>. These are
                routes between large terminal areas in the country, and are mostly geared towards
                larger aircraft flying in the flight levels.
              </>
              <Gray italic>
                Many EFB's provide lists of recently-cleared routes from the departure airport to a
                destination.
              </Gray>
              <>
                There may be <Bold>Tower en route control (TEC)</Bold> routes available. These keep
                you in approach control airspace and can be efficient for flying from one city to
                the next. They're also easy to file as the routes are named.
              </>
              <>
                Check for any <Bold>Standard Instrument Departures (SIDs)</Bold> or{' '}
                <Bold>Standard Terminal Arrivals (STARs)</Bold> that could simplify your transition
                to/from the en route structure.
              </>
              <>
                When using VORs off-airway their service volumes must overlap. This usually means
                they need to be within 80 NM of each other. See{' '}
                <Link.Task section={2} task="B" id="k2a" />
              </>
            </BulletList>
          </>,

          <>
            The Chart Supplement will have the most recent information about an airport and should
            always be referenced. Check for <Bold>NOTAM(D)s</Bold> pertaining to all NAVAIDs on the
            route as well as the departure, destination and alternate airports. Furthermore,{' '}
            <Bold>FDC NOTAMs</Bold> should be sought out as these may have implications for planned
            IAPs. This information can be obtained from FSS or an EFB.
          </>,

          <Paragraph heading="Alternate Airports" hr>
            Use the <Info>1-2-3</Info> rule to determine if you need to file an alternate: If,
            within <Info>1 hour</Info> before or after your ETA, the ceiling at your destination is
            less than <Info>2000 feet</Info> or the visibility less than{' '}
            <Info>3 statute miles</Info>, you must file an alternate. Additionally, you must file an
            alternate <Info>if your destination doesn't have any instrument approaches</Info>.
          </Paragraph>,

          <>
            As <AIM paragraph={[5, 1, 10, 'b']} /> points out,{' '}
            <Warning>
              there are situations where failing to plan for an alternate can be a critical mistake
              even when it's not legally required.
            </Warning>{' '}
            They identify three scenarios:
            <BulletList type="decimal">
              <>
                All approaches at the destination have an MDA/DA greater than 2000' AGL and/or
                visibility requirements greater than 3 miles (South Lake Tahoe is one such airport)
              </>
              <>
                The lowest MDA/DA at the destination is marginally less than 2000' AGL. Pilots are
                reminded that forecasts may be wrong.
              </>
              <>
                The lowest MDA/DA may only be available to aircraft with specific equipment (e.g.
                DME). This may be a serious issue if your aircraft's equipment malfunctions in
                flight.
              </>
            </BulletList>
          </>,

          <Tabs>
            <Tab heading="Regulatory requirements">
              <>
                The process looks like this:
                <BulletList type="decimal">
                  <>
                    Determine the forecast weather at the proposed alternate at the time you would
                    arrive there
                  </>
                  <>
                    Determine which runway(s) would be acceptable for landing given the forecast
                    winds and runway lengths
                  </>
                  <>
                    Determine which procedures to these runways you and your aircraft are able to
                    fly
                  </>
                  <>
                    Of these procedures, determine which has the lowest ceiling and visibility
                    minimums. Standard alternate minimums are{' '}
                    <InlineList>
                      <>ceiling 600 feet and visibility 2 statute miles for a precision approach</>
                      <>
                        ceiling 800 feet and visibility 2 statute miles for a nonprecision approach
                      </>
                    </InlineList>
                    . Note that{' '}
                    <Warning>
                      for the purposes of alternate planning LPV approaches must still be considered
                      non-precision.
                    </Warning>
                  </>
                  <>
                    <Bold>
                      If these lowest minima are less than the forecast ceiling and visibility at
                      the proposed alternate, then the airport is legally acceptable as an alternate
                    </Bold>
                  </>
                </BulletList>
              </>

              <>
                If the proposed alternate doesn't have any IAPs, it may still be filed as an
                alternate if the ceiling and visibility at the time of arrival at the alternate
                would allow a descent from the MEA under basic VFR. See{' '}
                <FAR section="91.169" paragraph={['c', 2]} />. Of course,{' '}
                <Bold>
                  if you choose to deviate to the alternate, you should use the published minimums
                  for the approach you choose to fly.
                </Bold>
              </>

              <>
                Jeppesen charts are great for determining if an airport is suitable as an alternate,
                because their <Link href={references.jeppesen10_9}>10-9 pages</Link> list out all
                approaches at the airport and their associated minima. The FAA makes this
                information available too, in the "Alternate Minimums" section of TERPS, but it's
                not as easy to decipher and approaches with standard minima aren't included at all.
              </>

              <Image src="jeppesen-10-9" />
            </Tab>

            <Tab heading="GPS and WAAS">
              <>
                This is where things get a little messy.
                <BulletList type="decimal">
                  <>
                    If you have a WAAS-capable aircraft, (i.e. your aircraft is equipped with a{' '}
                    <Link href={references.tso.c145}>TSO-C145</Link> or{' '}
                    <Link href={references.tso.c146}>TSO-C146</Link> GPS){' '}
                    <Info>
                      you are allowed to plan to use an RNAV approach at both the destination and
                      alternate
                    </Info>
                    , though{' '}
                    <Warning>you must use nonprecision minima for planning purposes:</Warning>
                    <Quotation padded source={<AIM paragraph={[1, 1, 18, 'c', 9, 'a']} />}>
                      When using WAAS at an alternate airport, flight planning must be based on
                      flying the RNAV (GPS) LNAV or circling minima line...Part 91 non-precision
                      weather requirements must be used for planning. Upon arrival at an alternate,
                      when the WAAS navigation system indicates that LNAV/VNAV or LPV service is
                      available, then vertical guidance may be used to complete the approach using
                      the displayed level of service
                    </Quotation>
                  </>
                  <>
                    If your aircraft is not WAAS capable, (i.e. your aircraft is only equipped with
                    a <Link href={references.tso.c129}>TSO-C129</Link> or{' '}
                    <Link href={references.tso.c196}>TSO-C196</Link> GPS, or you have no GPS at all)
                    you are allowed to plan to use an RNAV approach at{' '}
                    <Warning>
                      either the destination or the alternate,{' '}
                      <span className="italic">but not both</span>
                    </Warning>
                    . Additionally, the aircraft must be equipped with fault detection and exclusion
                    (FDE) and the pilot must perform a preflight RAIM check. See{' '}
                    <AIM paragraph={[1, 1, 17, 'b', 5, 'c']} />.
                  </>
                </BulletList>
              </>
            </Tab>
          </Tabs>,
        ],

        // Altitude selection
        k2: [
          <>
            Your route of flight may require multiple altitudes, especially if flying over high
            terrain for short periods.{' '}
            <Success>File the first altitude you want to cruise at.</Success>
          </>,

          <Paragraph heading="Altitude Types">
            There are several different types of altitude relevant to VFR and IFR flight:
            <BulletList type="decimal">
              <>
                <Bold>Indicated altitude</Bold> is the altitude read off the altimeter when it's set
                to the local setting. It's important that all pilots in a shared vicinity use the
                same or similar altimeter setting, or else vertical separation can be compromised.
              </>
              <>
                <Bold>Pressure altitude</Bold> is the altitude indicated when the altimeter is set
                to 29.92"Hg. It is the aircraft's height above the standard datum plane. In the
                flight levels, all aircraft navigate by pressure altitude.
              </>
              <>
                <Bold>Density altitude</Bold> is the pressure altitude corrected for temperature. In
                simple terms it is the altitude the aircraft "feels" like it's flying at: density
                altitude is what really determines aircraft performance, hence it is strongly
                emphasized in mountain flying and other environments where performance is critical.
              </>
              <>
                <Bold>True altitude</Bold> is the exact height above mean sea level. The local
                altimeter setting yields true altitude when at field level.
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Terrain and Obstacles">
            Safe cruise altitudes can be selected by paying attention to the route's{' '}
            <InlineList>
              <>Minimum Enroute Altitude (MEA)</>
              <>Minimum Obstacle Clearance Altitude (MOCA)</>
              <>Off-Route Obstacle Clearence Altitudes (OROCAs)</>
            </InlineList>
            . The MEA guarantees obstacle clearance and adequate signal reception to maintain
            positive course guidance between NAVAIDs. The MOCA also guarantees obstacle clearance
            but only provides adequate signal reception within 22 nautical miles (25 statute miles)
            of a VOR; pilots may operate below the MEA but no lower than the MOCA, and only when
            they're able to receive the required navigational signals. The OROCA
          </Paragraph>,

          <>
            The minimum altitude for IFR flight depends on the area. In{' '}
            <Term>Designated Mountainous Terrain (DMA)</Term> the MIA is 2,000 feet above the
            highest obstacle in a 4 mile radius. In non-mountainous terrain the MIA is 1,000 feet.
            At this point in time, virtually the entire western US is considered DMA, though there
            is an FAA effort underway to change this (see collapsed section below).{' '}
            <FAR section="91.177" paragraph={['a', 2]} /> and <FAR section="95.15" /> are the
            relevant regulations.
          </>,

          <Collapse heading="Designated Mountainous Areas">
            <>
              The FAA, in conjunction with NATCA, is planning to reassess what areas of the country
              are considered mountainous. At the 2020 Aeronautical Chart Meeting, there was a{' '}
              <Link href={references.dma.presentation}>presentation</Link> on the topic which
              outlines the new data-driven approach. See{' '}
              <Link href={references.dma.explainer}>this article</Link> for a helpful summary.
            </>

            <Image.Row>
              <Image src="dma_current">The old designation</Image>
              <Image src="dma_future">The new designation</Image>
            </Image.Row>

            <>
              The new definition is this:{' '}
              <Gray italic>
                Designated mountainous areas include those areas having a terrain elevation
                differential exceeding 3,000 feet within 10 nautical miles within those one
                arc-second quadrangles overlying terrain or U.S. territorial waters.
              </Gray>{' '}
              An image helps:
            </>

            <Image src="dma_chart" />
          </Collapse>,

          <Paragraph heading="IFR Cruise Altitudes">
            <ToDo />
          </Paragraph>,

          <Paragraph heading="VFR-On-Top">
            While operating on an IFR flight plan in VMC, a pilot may request a{' '}
            <Bold>VFR-on-top clearance</Bold> in lieu of an assigned altitude, permitting them to
            select an altitude or flight level of their choice (subject to ATC constraints). Per a{' '}
            <Link href={references.vfrOnTop}>Boldmethod article</Link>, "this can be helpful if
            you're slightly above, or in between layers, and you want to stay out of the clouds"
            (because extended IMC flying can be fatiguing, the view is better and there's generally
            less turbulence). A VFR-on-top clearance permits operations above, below and between
            layers, or in areas where there is no meteorological obstruction at all.
          </Paragraph>,

          <Paragraph>
            Flying VFR-on-top subjects the pilot to regulations for both IFR and VFR flight:
            <BulletList type="disc">
              <>
                You must fly at the appropriate VFR altitude as prescribed in{' '}
                <FAR section="91.159" />
              </>
              <>
                You must comply with VFR visibility and distance-from-cloud criteria prescribed in{' '}
                <FAR section="91.155" />
              </>
              <>
                You must comply with IFR regulations applicable to your flight. That means{' '}
                <Warning>
                  you must adhere to minimum IFR altitudes, your ATC clearance, position reporting,
                  radio communications, course to be flown, etc.
                </Warning>
              </>
              <>
                You should advise ATC before any altitude change when operating VFR-on-top so ATC
                can provide accurate traffic information and separation.
              </>
              <>VFR-on-top is not permitted in Class A airspace.</>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Oxygen Requirements">
            The oxygen requirements are no different for IFR than they are for VFR.{' '}
            <FAR section="91.211" /> specifies the requirements. Note that these values refer to{' '}
            <Italic>cabin pressure altitudes</Italic>. If the airplane is pressurized the rules are
            different.{' '}
            <BulletList type="disc">
              <>
                <Bold>Between 12,500 and 14,000 feet:</Bold> required flight crew members must have
                supplemental oxygen if the flight is longer than 30 minutes at those altitudes
              </>
              <>
                <Bold>Above 14,000 feet:</Bold> the required flight crew must wear supplemental
                oxygen at all times. Passengers need not.
              </>
              <>
                <Bold>Above 15,000 feet:</Bold> everyone on the aircraft must be provided with
                supplemental oxygen.
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph>
            Additionally, the FAA encourages pilots to use supplemental oxygen{' '}
            <Bold>above 5,000 feet when flying at night.</Bold>
          </Paragraph>,
        ],

        // XC calculations
        k3a: [
          <>
            This is mostly a recap from the private pilot ACS. I will be using ForeFlight for the
            test (as I do when flying anywhere), and for the most part this should be satisfactory
            for the examiner. It's important to know how to do the calculations by hand in case it
            comes to that, but it probably won't.{' '}
            <Warning>
              Be able to justify the ForeFlight performance profile for your aircraft.
            </Warning>
          </>,

          <Collapse heading="Calculating true airspeed">
            <>
              To calculate true airspeed (TAS), you first need to know the pressure at altitude,{' '}
              <Katex>\rho</Katex>. To calculate <Katex>\rho</Katex>, use the following equation:
            </>

            <Katex block className="text-xl text-center">
              \rho = \rho_0 \times e^[\frac[-gMh][RT]]
            </Katex>

            <>
              where:
              <BulletList type="disc">
                <>
                  <Katex>h</Katex> is the altitude at which we want to calculate the pressure,
                  expressed in meters.
                </>
                <>
                  <Katex>\rho</Katex> is the air pressure at altitude <Katex>h</Katex>.
                </>
                <>
                  <Katex>\rho_0</Katex> is the pressure at sea level
                </>
                <>
                  <Katex>g</Katex> is the gravitational acceleration. For Earth,{' '}
                  <Katex>g = 9.80665\frac[\text[m]][\text[s]^2]</Katex>
                </>
                <>
                  <Katex>M</Katex> is the molar mass of air. For Earthly air,{' '}
                  <Katex>M = 0.0289644\frac[\text[kg]][\text[mol]]</Katex>
                </>
                <>
                  <Katex>R</Katex> is the universal gas constant. Its value is equal to{' '}
                  <Katex>R = 8.31432\frac[\text[N]\cdot\text[m]][\text[mol]\cdot\text[K]]</Katex>
                </>
                <>
                  <Katex>T</Katex> is the temperature at altitude <Katex>h</Katex>, expressed in
                  Kelvins
                </>
              </BulletList>
            </>

            <>Given that, we can calculate TAS like so:</>

            <Katex block className="text-xl text-center">
              TAS = CAS \times \sqrt[\frac[\rho_0][\rho]]
            </Katex>

            <>
              Hence, the only inputs required are the height, OAT, sea level pressure and calibrated
              airspeed.{' '}
              <Info>
                A decent rule of thumb is that TAS is 2% greater than CAS for every thousand feet of
                altitude.
              </Info>
            </>
          </Collapse>,
        ],

        // ETA calculation
        k3b: [
          <>
            The ETA is simply the ETD plus the estimated time enroute (ETE). Calculating the ETE is
            not complicated, it's just math:
            <BulletList type="decimal">
              <>calculate the time and distance it will take to climb to cruise altitude</>
              <>calculate how long the descent will take, and where it should begin</>
              <>
                calculate how long it will take you to travel from TOC to TOD at cruising altitude,
                given the wind conditions; what matters is groundspeed, so you'll need your trusty
                E6B.
              </>
            </BulletList>
          </>,

          <>
            Converting to UTC is trivial, complicated only by the existence of daylight savings.
            During winter (November-March), California is on Pacific Standard Time (PST) which is
            UTC-0800. During summer (March-November), California is on Pacific Daylight Time (PDT)
            which is UTC-0700.
          </>,
        ],

        // Fuel requirements
        k3c: [
          <>
            <FAR section="91.167" /> is the relevant regulation. It specifies that "no person may
            operate a civil aircraft in IFR conditions unless it carries enough fuel to:"
            <BulletList type="decimal">
              <>Complete the flight to the first airport of intended landing and fly an approach</>
              <>
                Fly from that airport to the alternate airport and fly an approach{' '}
                <Bold italic>(if an alternate is required)</Bold>
              </>
              <>Fly after that for 45 minutes at normal cruising speed</>
            </BulletList>
          </>,

          <>
            Regarding item (2) above, if the destination has an IAP and the 1-2-3 rule is satisfied,
            you are not required to include sufficient fuel to fly to the alternate,{' '}
            <Warning italic>even if you choose to file an alternate.</Warning>
          </>,

          <>
            <Gray>
              Calculating the fuel requirements is trivial if you know your ETE. Calculating the ETE
              is what takes time, as it requires knowing your flight distance and the winds along
              each leg at the planned altitude.
            </Gray>{' '}
            See above for details. Furthermore, the language of "no person may <Bold>operate</Bold>{' '}
            a civil aircraft..." indicates that the IFR fuel requirement is{' '}
            <Warning>not a legal reserve that may be dipped into.</Warning>
          </>,
        ],

        // Flight plan elements
        k4: [
          <>
            <Info>
              An IFR flight plan and a clearance are required for operating in controlled airspace
              under IFR.
            </Info>{' '}
            Therefore, no flight plan is required in class G airspace (but VFR rules require you to
            remain clear of clouds). <AIM paragraph={[5, 1, 6]} /> describes how to fill out a
            flight plan. Important items include:
            <BulletList type="decimal">
              <>
                ATC issues clearances based on aircraft capabilities filed in Items 10 and 18, so{' '}
                <Success>
                  it behooves the pilot to list all of the equipment suffixes applicable
                </Success>
                . The FAA provides a document explaining the codes{' '}
                <Link href={references.icao_codes}>here</Link>. Some common codes include:
                <BulletList type="disc">
                  <>
                    <Info>S</Info> indicates that the aircraft has a VOR receiver, VHF comms system
                    and ILS capability
                  </>
                  <>
                    <Info>G</Info> indicates the aircraft has an IFR-certified GPS, and{' '}
                    <Info>B</Info> indicates it's a WAAS GPS with LPV capability.
                  </>
                  <>
                    If <Info>G</Info> applies, so does <Info>R</Info> which indicates some level of
                    performance based navigation equipment. The specific levels of PBN are specified
                    in the ICAO Surveillance Equipment section.
                  </>
                </BulletList>
              </>
              <>
                For the <Term>performance based navigation (PBN)</Term>, a typical IFR GPS has the
                codes{' '}
                <InlineList>
                  <>C2</>
                  <>D2</>
                  <>O2</>
                  <>S1</>
                </InlineList>
                .
                <BulletList type="disc">
                  <>
                    <Info>C2</Info>: RNAV 2 GNSS requires 2 NM accuracy 95 percent of the time. All
                    IFR-certified GPS's meet this requirement.
                  </>
                  <>
                    <Info>D2</Info>: RNAV 1 GNSS requires 1 NM accuracy. Again, all IFR-certified
                    GPS's apply.
                  </>
                  <>
                    <Info>O2</Info>: RNP 1 GNSS requires 1 NM accuracy as well as
                    performance-monitoring equipment onboard. If your GPS enunciates when that
                    accuracy isn't met this code applies to you.
                  </>
                  <>
                    <Info>S1</Info>: RNP APCH means the GPS will scale down to 0.3 NM accuracy on
                    final approach. This is standard for any approach-certified GPS.
                  </>
                </BulletList>
              </>
              <>
                <Success>
                  Pilots should file IFR flight plans at least 30 minutes prior to ETD
                </Success>{' '}
                (to avoid clearance delays)
              </>
              <>
                There's an old notion, still taught today, that you can request to not receive any
                SIDs or STARs in the flight plan remarks. <Warning>Don't do this.</Warning> It's an
                impractical request, and at the end of the day the controller is just going to give
                it to you anyway one step at a time. This is a huge of waste of their time and
                defeats the purpose SIDs and STARs were invented to serve.
              </>
            </BulletList>
          </>,

          <Image src="icao_flight_plan">
            A complete ICAO flight plan, generated by ForeFlight for a flight from KSQL (San Carlos)
            to KPRB (Paso Robles), flown by the author on 7/30/22.
          </Image>,
        ],

        // Activating & closing flight plans
        k5: [
          <>
            An IFR flight plan may be activated in a number of different ways:{' '}
            <BulletList type="disc">
              <>
                When departing an airport with a control tower, you can usually get the clearance
                directly from ground control.
              </>
              <>
                When departing an uncontrolled airport, pilots must communicate with{' '}
                <Bold>clearance delivery</Bold> to receive their clearance. The Chart Supplement for
                the departure airport should provide either a frequency or a phone number to call.
                This same frequency/phone number may be used to cancel IFR after landing.{' '}
                <AIM paragraph={[5, 2, 3]} /> discusses this.
              </>
              <>
                Clearances may sometimes be <Bold>abbreviated</Bold>. In this case the controller or
                FSS agent will say <Gray>"Cleared ... as filed."</Gray> This is only done when the
                filed route can be approved with little or no revision. The destination airport will
                always be included in the clearance, as will the name/number of the departure
                procedure (and transition) if applicable. Importantly,{' '}
                <Warning>
                  ???Cleared to (destination) airport as filed??? does not include the en route altitude
                  filed in the flight plan.
                </Warning>{' '}
                The altitude (or "expect N, M minutes after departure") will be included in the
                clearance.{' '}
                <Danger>
                  If any part of this is unclear, do not hesitate to clarify with ATC and request a
                  full route clearance!
                </Danger>{' '}
                See <AIM paragraph={[5, 2, 6]} /> for more.
              </>
            </BulletList>
          </>,

          <>
            It's possible to file a <Bold>composite flight plan</Bold>, which enables the pilot to
            fly both VFR and IFR during different portions of the same flight.{' '}
            <AIM paragraph={[5, 1, 9]} /> clarifies that this operation requires filing two separate
            flight plans. The VFR flight plan must be opened and closed with FSS or some other
            facility that's able to do so; ATC{' '}
            <Italic>
              "does not have the ability to determine if an aircraft is operating on an active VFR
              flight plan and cannot process the activation or cancellation of a VFR flight plan."
            </Italic>{' '}
            In this case, the IFR flight plan should either begin or end at the fix where
            transitioning flight rules is expected to occur. Of course, before transitioning to IFR
            the pilot must obtain a clearance.
          </>,
        ],
      }}
    />
  );
};

export default XcFlightPlanning;

const references = {
  dma: {
    presentation: uri.faa.atc(
      'flight_info/aeronav/acf/media/Presentations/20-02-Designated-Mountainous-Areas.pdf'
    ),
    explainer: 'https://bruceair.wordpress.com/2020/11/10/redefining-designated-mountainous-areas/',
  },
  icao_codes:
    'https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/systemops/fs/wd/media/ICAO_Equip_Code_Definitions.pdf',
  jeppesen10_9: uri.boldMethod.l2f('navigation', 'how-to-use-the-jeppesen-airport-10-9-page'),
  tso: {
    c129: uri.tso('e560cd9c6acf8ba186256dc700717e0f/$FILE/C129a.pdf'),
    c145: uri.tso('efe54f1e6272a7068625811d0064b679/$FILE/TSO-C145e.pdf'),
    c146: uri.tso('76fa4ba66612622a86257282006d332a/$FILE/TSO-C146b%20(3-2-07%20Revised).pdf'),
    c196: uri.tso('43dd92d6f1b61f4686257c4d006b94b8/$FILE/TSO-C196b.pdf'),
  },
  vfrOnTop: uri.boldMethod.l2f('regulations', 'understanding-vfr-on-top-clearance-requirements'),
};
