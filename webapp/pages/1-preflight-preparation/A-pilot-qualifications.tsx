import { NextPage } from 'next';
import React from 'react';

import { Bold, BulletList, FAR, Quote, TaskPage } from '../../components';
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
                <p>
                  <Bold>Recency of experience requirements</Bold> are clearly described in{' '}
                  <FAR section={[61, 57, 'c', 1]} />. These include recording, in the last 6 months:{' '}
                  <Quote>
                    six instrument approaches; holding procedures and tasks; and intercepting and
                    tracking courses through the use of navigational electronic systems.
                  </Quote>
                </p>,

                <p>
                  For recordkeeping, the pilot must log the{' '}
                  <Bold>location and type of each instrument approach</Bold> and the name of the
                  safety pilot if required. See <FAR section={[61, 51, 'g']} />.
                </p>,

                <p>
                  If your recent experience lapses, you have another six months to regain currency.
                  This can be done with a CFI or safety pilot, but until currency is regained you
                  may not operate as PIC under IFR. If <span className="italic">those</span> six
                  months lapse, your only option is an <Bold>instrument proficiency check</Bold>{' '}
                  (see <FAR section={[61, 57, 'd']} />
                  ). This basically means taking your checkride again, so don't let that happen.
                </p>,
              ];
            case '2':
              return [
                <p>
                  Per <FAR section={[61, 3]} />, having an instrument rating allows a pilot to
                  operate:
                  <BulletList>
                    <>under IFR</>
                    <>in weather conditions less than the minima for VFR flight; and</>
                    <>in Class A airspace</>
                    <>
                      for hire (assuming the pilot has a commercial license) at night or
                      cross-country beyond 50 nautical miles
                    </>
                  </BulletList>
                </p>,
              ];
            case '3':
              return [
                <p>
                  Per <FAR section={[61, 113, 'i']} />, a private pilot with a U.S. driver's license
                  but no medical certificate may act as PIC of an aircraft if it:
                  <BulletList>
                    <>is authorized to carry 6 or fewer occupants; and</>
                    <>weighs at most 6,000 pounds</>
                  </BulletList>
                </p>,
                <p>
                  The flight may not:
                  <BulletList>
                    <>be carried out at or above 18,000 feet; or'</>
                    <>attain an indicated airspeed of 250 knots or greater'</>
                  </BulletList>
                </p>,
                <p>
                  They are required to have the <Bold>medical examination checklist</Bold> required
                  by <FAR section={[68, 7]} /> and <Bold>medical education course certificate</Bold>{' '}
                  (see <FAR section={[68, 3]} />) in their logbook.
                </p>,
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
