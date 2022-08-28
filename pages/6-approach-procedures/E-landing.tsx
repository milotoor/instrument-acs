import { NextPage } from 'next';
import React from 'react';

import { Bold, Danger, Italic, Link, Paragraph, TaskPage } from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(6, 'E') },
});

const Landing: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        // Pilot responsibilities and landing factors
        k1: [
          <Paragraph heading="Straight-In Approaches">
            A word of caution about the straight-in approach at non-towered airports:{' '}
            <Danger>be very careful to communicate clearly with VFR traffic in the pattern!</Danger>{' '}
            Per <Link.Reference reference="AC 90-66B" /> §9.5:{' '}
            <Italic>
              "The FAA encourages pilots to use the standard traffic pattern when arriving or
              departing a non-towered airport or a part-time-towered airport when the control tower
              is not operating,{' '}
              <Bold>
                particularly when other traffic is observed or when operating from an unfamiliar
                airport."
              </Bold>
            </Italic>{' '}
            (However, immediately following this excerpt they acknowledge that a visual approach at
            the end of an instrument approach is one such time when a straight-in may be desirable.)
          </Paragraph>,
          <>
            At none other than Watsonville airport (where I will meet my DPE for the instrument
            checkride) there was a{' '}
            <Link href={references.wvi_accident}>midair collision on 18 August, 2022</Link>,
            involving a very fast twin Cessna performing a straight-in approach and a 152 in the
            pattern. The 152 may have made an error in judgment by turning base in front of the
            twin, but it seems clear to me that the fault lies with the twin: (a) it elected to
            perform a straight-in approach with VFR traffic in the pattern, and (b) it was traveling
            at a blistering <Bold>180 knot groundspeed!!!</Bold> Regardless of whose fault it is,
            three people and a dog were lost...
          </>,
        ],
      }}
    />
  );
};

export default Landing;

const references = {
  wvi_accident: 'http://www.kathrynsreport.com/2022/08/cessna-340a-n740wj-fatal-accident.html',
};
