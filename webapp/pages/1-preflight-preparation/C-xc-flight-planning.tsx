import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  Collapse,
  DetailList,
  FAR,
  Gray,
  Image,
  Katex,
  Link,
  Paragraph,
  Tabs,
  Tab,
  TaskPage,
  ToDo,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { uri } from '../../lib/references';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(1, 'C') },
});

const XcFlightPlanning: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        knowledge(id) {
          switch (id) {
            case '1':
              return [
                <>
                  To plan the en route portion of the flight, work backwards from an IAF to the
                  departure airport. Consider the following during the planning:{' '}
                  <DetailList type="bullet">
                    <>
                      The Chart Supplement publishes a list of <Bold>Preferred Routes</Bold>. These
                      are routes between large terminal areas in the country, and are mostly geared
                      towards larger aircraft flying in the flight levels.
                    </>
                    <Gray italic>
                      Many EFB's provide lists of recently-cleared routes from the departure airport
                      to a destination.
                    </Gray>
                    <>
                      There may be <Bold>Tower en route control (TEC)</Bold> routes available. These
                      keep you in approach control airspace and can be efficient for flying from one
                      city to the next. They're also easy to file as the routes are named.
                    </>
                    <>
                      Check for any <Bold>Standard Instrument Departures (SIDs)</Bold> or{' '}
                      <Bold>Standard Terminal Arrivals (STARs)</Bold> that could simplify your
                      transition to/from the en route structure.
                    </>
                  </DetailList>
                </>,
                <>
                  The Chart Supplement will have the most recent information about an airport and
                  should always be referenced. Check for <Bold>NOTAM(D)s</Bold> pertaining to all
                  NAVAIDs on the route as well as the departure, destination and alternate airports.
                  Furthermore, <Bold>FDC NOTAMs</Bold> should be sought out as these may have
                  implications for planned IAPs. This information can be obtained from FSS or an
                  EFB.
                </>,
                <Paragraph heading="Alternate Airports" hr>
                  Use the <Bold>1-2-3</Bold> rule to determine if you need to file an alternate: If,
                  within <Bold>1 hour</Bold> before or after your ETA, the ceiling at your
                  destination is less than <Bold>2000 feet</Bold> or the visibility less than{' '}
                  <Bold>3 statute miles</Bold>, you must file an alternate. Additionally, you must
                  file an alternate{' '}
                  <Bold>if your destination doesn't have any instrument approaches</Bold>.
                </Paragraph>,
                <Tabs>
                  <Tab heading="Regulatory requirements">
                    <Paragraph>
                      The process looks like this:
                      <DetailList type="bullet">
                        <>
                          Determine the forecast weather at the proposed alternate at the time you
                          would arrive there
                        </>
                        <>
                          Determine which runway(s) would be acceptable for landing given the
                          forecast winds and runway lengths
                        </>
                        <>
                          Determine which procedures to these runways you and your aircraft are able
                          to fly
                        </>
                        <>
                          Of these procedures, determine which has the lowest ceiling and visibility
                          minimums. Standard alternate minimums are{' '}
                          <DetailList type="inline">
                            <>
                              ceiling 600 feet and visibility 2 statute miles for a precision
                              approach
                            </>
                            <>
                              ceiling 800 feet and visibility 2 statute miles for a nonprecision
                              approach
                            </>
                          </DetailList>
                        </>
                        <>
                          <Bold>
                            If these lowest minima are less than the forecast ceiling and visibility
                            at the proposed alternate, then the airport is legally acceptable as an
                            alternate
                          </Bold>
                        </>
                      </DetailList>
                    </Paragraph>

                    <Paragraph>
                      If the proposed alternate doesn't have any IAPs, it may still be filed as an
                      alternate if the ceiling and visibility at the time of arrival at the
                      alternate would allow a descent from the MEA under basic VFR. See{' '}
                      <FAR section={[91, 169, 'c', 2]} />. Of course,{' '}
                      <Bold>
                        if you choose to deviate to the alternate, you should use the published
                        minimums for the approach you choose to fly.
                      </Bold>
                    </Paragraph>

                    <Paragraph>
                      Jeppesen charts are great for determining if an airport is suitable as an
                      alternate, because their{' '}
                      <Link href={references.jeppesen10_9}>10-9 pages</Link> list out all approaches
                      at the airport and their associated minima. The FAA makes this information
                      available too, in the "Alternate Minimums" section of TERPS, but it's not as
                      easy to decipher and approaches with standard minima aren't included at all.
                    </Paragraph>

                    <Paragraph>
                      <Image src="jeppesen-10-9" noMargin />
                    </Paragraph>
                  </Tab>

                  <Tab heading="GPS and WAAS">
                    <Paragraph>
                      This is where things get a little messy.
                      <DetailList type="bullet">
                        <>
                          If you have a WAAS-capable aircraft,{' '}
                          <Bold>
                            you are allowed to plan to use an RNAV approach at both the destination
                            and alternate
                          </Bold>
                          , though you must use nonprecision minima for planning purposes. See{' '}
                          <AIM paragraph={[1, 1, 18]} />.
                        </>
                        <>
                          If your aircraft is not WAAS capable, you are allowed to plan to use an
                          RNAV approach at{' '}
                          <Bold>
                            either the destination or the alternate,{' '}
                            <span className="italic">but not both</span>
                          </Bold>
                          . Additionally, the aircraft must be equipped with fault detection and
                          exclusion (FDE) and the pilot must perform a preflight RAIM check. See{' '}
                          <AIM paragraph={[1, 1, 17, 'b', 5, 'c']} />.
                        </>
                      </DetailList>
                    </Paragraph>
                  </Tab>
                </Tabs>,
              ];
            case '2':
              return [
                <Paragraph heading="Altitude Types">
                  There are several different types of altitude relevant to VFR and IFR flight:
                  <DetailList type="bullet">
                    <>
                      <Bold>Indicated altitude</Bold> is the altitude read off the altimeter when
                      it's set to the local setting. It's important that all pilots in a shared
                      vicinity use the same or similar altimeter setting, or else vertical
                      separation can be compromised.
                    </>
                    <>
                      <Bold>Pressure altitude</Bold> is the altitude indicated when the altimeter is
                      set to 29.92"Hg. It is the aircraft's height above the standard datum plane.
                      In the flight levels, all aircraft navigate by pressure altitude.
                    </>
                    <>
                      <Bold>Density altitude</Bold> is the pressure altitude corrected for
                      temperature. In simple terms it is the altitude the aircraft "feels" like it's
                      flying at: density altitude is what really determines aircraft performance,
                      hence it is strongly emphasized in mountain flying and other environments
                      where performance is critical.
                    </>
                    <>
                      <Bold>True altitude</Bold> is the exact height above mean sea level. The local
                      altimeter setting yields true altitude when at field level.
                    </>
                  </DetailList>
                </Paragraph>,

                <Paragraph heading="Terrain and Obstacles">
                  Safe cruise altitudes can be selected by paying attention to the route's{' '}
                  <DetailList type="inline">
                    <>Minimum Enroute Altitude (MEA)</>
                    <>Minimum Obstacle Clearance Altitude (MOCA)</>
                    <>Off-Route Obstacle Clearence Altitudes (OROCAs)</>
                  </DetailList>
                  . The MEA guarantees obstacle clearance and adequate signal reception to maintain
                  positive course guidance between NAVAIDs. The MOCA also guarantees obstacle
                  clearance but only provides adequate signal reception within 22 nautical miles (25
                  statute miles) of a VOR; pilots may operate below the MEA but no lower than the
                  MOCA, and only when they're able to receive the required navigational signals. The
                  OROCA
                </Paragraph>,

                <Paragraph heading="IFR Cruise Altitudes">
                  <ToDo />
                </Paragraph>,

                <Paragraph heading="VFR-On-Top">
                  While operating on an IFR flight plan in VMC, a pilot may request a{' '}
                  <Bold>VFR-on-top clearance</Bold> in lieu of an assigned altitude, permitting them
                  to select an altitude or flight level of their choice (subject to ATC
                  constraints). Per a <Link href={references.vfrOnTop}>boldmethod article</Link>,
                  "this can be helpful if you're slightly above, or in between layers, and you want
                  to stay out of the clouds" (because extended IMC flying can be fatiguing, the view
                  is better and there's generally less turbulence). A VFR-on-top clearance permits
                  operations above, below and between layers, or in areas where there is no
                  meteorological obstruction at all.
                </Paragraph>,

                <Paragraph>
                  Flying VFR-on-top subjects the pilot to regulations for both IFR and VFR flight:
                  <DetailList type="bullet" bullet="disc">
                    <>
                      You must fly at the appropriate VFR altitude as prescribed in{' '}
                      <FAR section={[91, 159]} />
                    </>
                    <>
                      You must comply with VFR visibility and distance-from-cloud criteria
                      prescribed in <FAR section={[91, 155]} />
                    </>
                    <>
                      You must comply with IFR regulations applicable to your flight. That means{' '}
                      <Bold>
                        you must adhere to minimum IFR altitudes, your ATC clearance, position
                        reporting, radio communications, course to be flown, etc.
                      </Bold>
                    </>
                    <>
                      You should advise ATC before any altitude change when operating VFR-on-top so
                      ATC can provide accurate traffic information and separation.
                    </>
                    <>VFR-on-top is not permitted in Class A airspace.</>
                  </DetailList>
                </Paragraph>,

                <Paragraph heading="Oxygen Requirements">
                  <ToDo />
                </Paragraph>,
              ];
            case '3a':
              return [
                <Collapse heading="Calculating true airspeed">
                  <Paragraph>
                    To calculate true airspeed (TAS), you first need to know the pressure at
                    altitude, <Katex>\rho</Katex>. To calculate <Katex>\rho</Katex>, use the
                    following equation:
                  </Paragraph>
                  <Paragraph>
                    <Katex block className="text-xl text-center">
                      \rho = \rho_0 \times e^[\frac[-gMh][RT]]
                    </Katex>
                  </Paragraph>
                  <Paragraph>
                    where:
                    <DetailList type="bullet" bullet="disc">
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
                        <Katex>
                          R = 8.31432\frac[\text[N]\cdot\text[m]][\text[mol]\cdot\text[K]]
                        </Katex>
                      </>
                      <>
                        <Katex>T</Katex> is the temperature at altitude <Katex>h</Katex>, expressed
                        in Kelvins
                      </>
                    </DetailList>
                  </Paragraph>
                  <Paragraph>Given that, we can calculate TAS like so:</Paragraph>
                  <Paragraph>
                    <Katex block className="text-xl text-center">
                      TAS = CAS \times \sqrt[\frac[\rho_0][\rho]]
                    </Katex>
                  </Paragraph>
                  <Paragraph>
                    Hence, the only inputs required are the height, OAT, sea level pressure and
                    calibrated airspeed.{' '}
                    <Bold gray>
                      A decent rule of thumb is that TAS is 2% greater than CAS for every thousand
                      feet of altitude.
                    </Bold>
                  </Paragraph>
                </Collapse>,
              ];
          }
          return null;
        },
      }}
    />
  );
};

export default XcFlightPlanning;

const references = {
  jeppesen10_9: uri.boldMethod('navigation', 'how-to-use-the-jeppesen-airport-10-9-page'),
  vfrOnTop: uri.boldMethod('regulations', 'understanding-vfr-on-top-clearance-requirements'),
};
