import { NextPage } from 'next';
import React from 'react';

import {
  Bold,
  Collapse,
  DetailList,
  Emphasize,
  Gray,
  Katex,
  Paragraph,
  TaskPage,
  ToDo,
} from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(1, 'C') },
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
                  Once you have identified the NAVAIDs that you'll be using, check for any NOTAMs
                  pertaining to them
                </>,
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
                <Paragraph heading="Oxygen Requirements">
                  <ToDo />
                </Paragraph>,
              ];
            case '3a':
              return [
                <Collapse header="Calculating true airspeed">
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
