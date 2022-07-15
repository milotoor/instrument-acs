import { NextPage } from 'next';
import React from 'react';

import { Bold, DetailList, FAR, ReferenceLink, TaskPage } from '../../components';
import { getTaskFromSectionLetter } from '../../lib/data_loaders';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({ props: getTaskFromSectionLetter(1, 'A') });

const PilotQualifications: NextPage<Task> = (task) => {
  return (
    <TaskPage
      task={task}
      notes={{
        knowledge(id) {
          switch (id) {
            case '1':
              return [
                <div>
                  <Bold>Recency of experience requirements</Bold> are clearly described in{' '}
                  <FAR section={[61, 57, 'c', 1]} />. These include recording in the last 6 months:{' '}
                  <DetailList type="inline">
                    <>six instrument approaches</>
                    <>holding procedures and tasks</>
                    <>
                      intercepting and tracking courses through the use of navigational electronic
                      systems
                    </>
                  </DetailList>
                  .
                </div>,

                <div>
                  For recordkeeping, the pilot must log the{' '}
                  <Bold>location and type of each instrument approach</Bold> and the name of the
                  safety pilot if required. See <FAR section={[61, 51, 'g']} />. The FAA's{' '}
                  <ReferenceLink reference="InFO 15012" /> specifies that an approach can only be
                  logged if{' '}
                  <DetailList type="bullet">
                    <>
                      the aircraft is operated solely by reference to instruments in actual or
                      simulated IMC (one or both of "Actual IMC" and "Simulated IMC" must also be
                      logged)
                    </>
                    <>the simulated IMC continues to MDA or DA</>
                    <>
                      the approach is flown to minimums (i.e. going missed before MDA or DA is not
                      allowed)
                    </>
                    <>
                      the aircraft breaks out of IMC after the FAF, prior to or upon reaching MDA or
                      DA
                    </>
                  </DetailList>
                </div>,

                <div>
                  A <Bold>safety pilot</Bold> must{' '}
                  <DetailList type="inline">
                    <>possess a current medical certificate</>
                    <>sit in the other control seat</>
                    <>be appropriately rated in the aircraft's category and class</>
                  </DetailList>
                </div>,

                <div>
                  If your recent experience lapses, you have another six months to regain currency.
                  This can be done with a CFI or safety pilot, but until currency is regained you
                  may not operate as PIC under IFR. If <span className="italic">those</span> six
                  months lapse, your only option is an <Bold>instrument proficiency check</Bold>{' '}
                  (see <FAR section={[61, 57, 'd']} />
                  ). This basically means taking your checkride again, so don't let that happen.
                </div>,
              ];
            case '2':
              return [
                <div>
                  Per <FAR section={[61, 3]} />, having an instrument rating allows a pilot to
                  operate:
                  <DetailList type="bullet">
                    <>under IFR</>
                    <>in weather conditions less than the minima for VFR flight; and</>
                    <>in Class A airspace</>
                    <>
                      for hire (assuming the pilot has a commercial license) at night or
                      cross-country beyond 50 nautical miles
                    </>
                  </DetailList>
                </div>,
              ];
            case '3':
              return [
                <div>
                  Per <FAR section={[61, 113, 'i']} />, a private pilot with a U.S. driver's license
                  but no medical certificate may act as PIC of an aircraft if it{' '}
                  <DetailList type="inline">
                    <>is authorized to carry 6 or fewer occupants</>
                    <>weighs at most 6,000 pounds</>
                  </DetailList>
                </div>,
                <div>
                  The flight may not{' '}
                  <DetailList type="inline" logic="or">
                    <>be carried out at or above 18,000 feet</>
                    <>attain an indicated airspeed of 250 knots or greater</>
                  </DetailList>
                </div>,
                <div>
                  They are required to have the <Bold>medical examination checklist</Bold> required
                  by <FAR section={[68, 7]} /> and <Bold>medical education course certificate</Bold>{' '}
                  (see <FAR section={[68, 3]} />) in their logbook.
                </div>,
              ];
            default:
              return null;
          }
        },
      }}
    />
  );
};

export default PilotQualifications;
