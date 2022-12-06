import React from 'react';

import { AIM, Info, Paragraph, Success, TaskPage, Term } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const LossOfPfd: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={7}
      task="D"
      notes={{
        k2: [
          <Paragraph
            heading="No-gyro approaches"
            references={<AIM paragraph={[5, 4, 11, 'c', 3]} />}
          >
            When a pilot loses all heading information--e.g. the directional gyro and compass are
            both inoperative--they may request a <Term>no-gyro approach</Term> from ATC.{' '}
            <Info>This service can only be provided in a radar environment.</Info> The controller
            will issue a series of simple turning instructions, indicating when a turn should begin,
            which direction the turn should be in and when to stop.{' '}
            <Success>All turns should be made at standard rate.</Success> When a{' '}
            <Term>radar precision approach (PAR)</Term> or{' '}
            <Term>surveillance radar approach (ASR)</Term> is performed, the pilot will be advised
            when they are on final approach and{' '}
            <Info>from that point onward turns should be made half-standard rate.</Info>
          </Paragraph>,
        ],
      }}
    />
  );
};

export default LossOfPfd;
