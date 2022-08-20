import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  Danger,
  DetailList,
  FAR,
  Image,
  Info,
  Italic,
  Link,
  Paragraph,
  Quotation,
  TaskPage,
  Warning,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

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
                  <DetailList type="inline">
                    <>apply the current altimeter setting</>
                    <>read the indicated value from the instrument</>
                    <>compare it with the known field elevation</>
                  </DetailList>
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
                  <DetailList type="bullet" bullet="disc">
                    <>
                      <Info>High barometric pressure (above 31 "Hg)</Info> may be caused by{' '}
                      <Info>cold, dry air masses</Info>. When an aircraft's altimeter cannot be set
                      above 31 “Hg, true altitude will be higher than indicated altitude. Whenever
                      this occurs, a NOTAM will be published in accordance with{' '}
                      <FAR section={[91, 144]} />. Procedures for operating in the NOTAM's
                      geographic area are described by <AIM paragraph={[7, 2, 3, 'c', 1, 'b']} />;
                      in short, IFR aircraft should{' '}
                      <DetailList type="inline">
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
                      </DetailList>
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
                  </DetailList>
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
                  <DetailList type="bullet" bullet="decimal">
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
                  </DetailList>
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
                  <DetailList type="inline" logic="or">
                    <>portable voice recorders</>
                    <>electric shavers</>
                  </DetailList>
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
};
