import { NextPage } from 'next';
import React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  Image,
  Info,
  Italic,
  Paragraph,
  Tab,
  Tabs,
  TaskPage,
  Warning,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(4, 'A') },
});

const InstrumentFlight: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      flags={{ missed: ['1'] }}
      notes={{
        knowledge(id) {
          switch (id) {
            case '1':
              return [
                <>
                  In the Instrument Flying Handbook (ch. 6), the FAA discusses two methods for
                  learning/thinking about attitude instrument flying: the{' '}
                  <Bold>control and performance method</Bold> and the{' '}
                  <Bold>primary and supporting method</Bold>. The main difference is the importance
                  of the attitude indicator.
                </>,

                <Tabs>
                  <Tab heading="Control and Performance Method">
                    <Paragraph>
                      This method divides the instruments into three categories:{' '}
                      <BulletList>
                        <>
                          <Bold>Control instruments</Bold> depict immediate attitude and power
                          changes; these include the attitude indicator, manifold pressure gauge and
                          the tachometer.
                        </>
                        <>
                          <Bold>Performance instruments</Bold> include the ASI, altimeter, VSI,
                          heading indicator and slip/skid indicator. They reflect a change in
                          acceleration, i.e. they indicate when the aircraft is changing airspeed,
                          altitude or heading.
                        </>
                        <>
                          <Bold>Navigation instruments</Bold> include GPS, VOR, localizer and
                          glideslope receivers/indicators. Their common purpose is to indicate the
                          aircraft's position relative to navigational facilities or fixes, using
                          ground- or space-based radio signals.
                        </>
                      </BulletList>
                    </Paragraph>

                    <Paragraph>
                      This method also emphasizes a four step process for changing attitude:{' '}
                      <BulletList>
                        <>
                          <Bold>Establish:</Bold> change the aircraft's pitch and/or bank in
                          conjunction with power. Reference the AI and the tach/MPG while doing so.
                        </>
                        <>
                          <Bold>Trim:</Bold> eliminate the need to apply force to the control yoke.
                          This enables the pilot to focus on other tasks.
                        </>
                        <>
                          <Bold>Cross-Check:</Bold> visually scan the instruments and interpret the
                          indications to verify the desired performance
                        </>
                        <>
                          <Bold>Adjust:</Bold> if any deviations in performance were identified
                          during the cross-check, make adjustments in{' '}
                          <Italic>small increments</Italic>
                        </>
                      </BulletList>
                    </Paragraph>
                  </Tab>

                  <Tab heading="Primary and Supporting Method">
                    <>
                      This method focuses on the instruments that depict the most accurate and
                      relevant information for the maneuver being performed. For example: though the
                      AI may give an immediate and obvious indication that the aircraft is in a
                      bank, there are other instruments which can more precisely indicate the rate
                      of turn.{' '}
                      <Bold>
                        Frequently, the primary instrument is meant to be held constant for the
                        duration of a maneuver; the supporting instruments indicate a flight
                        parameter's trend.
                      </Bold>
                      <BulletList bullet="disc">
                        <>
                          <Bold>Pitch:</Bold> during straight and level flight, the primary
                          instrument is the <Info>altimeter</Info>. Supporting instruments include
                          the <Warning>ASI</Warning>, <Warning>VSI</Warning> and{' '}
                          <Warning>altitude trend tape</Warning>. When straight and level, the ASI
                          will be fixed, the VSI will indicate 0, the trend tape will not be shown.
                          When a deviation occurs, the ASI will decrease or inclease (for climbs and
                          descents, respectively) and the VSI/altitude trend tape will show the
                          trend.
                        </>
                        <>
                          <Bold>Bank:</Bold> primary instrument is the{' '}
                          <Info>heading indicator</Info>. Supporting instruments include the{' '}
                          <Warning>turn rate trend indicator</Warning>.
                        </>
                        <>
                          <Bold>Yaw:</Bold> primary instrument is the{' '}
                          <Info>slip/skid indicator</Info>. Indeed it is the only instrument
                          providing yaw information.
                        </>
                        <>
                          <Bold>Power:</Bold> primary instrument is the <Info>ASI</Info>, as the
                          main purpose of power is to maintain a desired airspeed.
                        </>
                      </BulletList>
                    </>
                  </Tab>
                </Tabs>,

                <Paragraph heading="Cross-Check and Scanning" hr>
                  Instrument cross-checking and scanning is fundamental to safe instrument attitude
                  flight. The IFH defines cross-checking as "the continuous observation of the
                  indications on the control and performance instruments."{' '}
                  <Bold>No specific scanning method is recommended</Bold>; the FAA emphasizes the
                  need for pilots to individually determine which instruments give them the most
                  pertinent information for each phase of a maneuver.
                </Paragraph>,
                <>
                  With that said, the <Bold>selected radial cross-check</Bold> technique is standard
                  for glass panels and is the only technique discussed in the IFH chapter 6 part 2.
                  This scan keeps the pilot's eyes on the AI 80-90% of the time. This is not
                  difficulty to achieve given the large size of the AI on the PFD.
                </>,

                <Image noShadow src="pfd_scan">
                  The <Bold>selected radial</Bold> method
                </Image>,

                <>
                  Common errors in the scan include <Danger>Fixation</Danger> (in which the pilot
                  stares at one instrument), <Danger>Omission</Danger> (in which one or more
                  instruments is dropped completely from the scan—standby instruments and the
                  compass are particularly common) and <Danger>Emphasis</Danger> (where the pilot
                  elevates the importance of one instrument above others).{' '}
                  <Warning>
                    Do not forget to include the engine instrumentation and moving map display on
                    the MFD!
                  </Warning>
                </>,
              ];
            default:
              return null;
          }
        },
        risk(id) {
          switch (id) {
            case '2':
              return [
                <>
                  The close proximity of instruments on the PFD minimizes the amount of head/eye
                  movement required during scanning. This mitigates vulnerability to certain
                  illusions.
                </>,
              ];
            default:
              return null;
          }
        },
      }}
    />
  );
};

export default InstrumentFlight;
