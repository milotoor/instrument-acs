import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const LossOfPfd: ACS.Page = (props) => {
  return <TaskPage {...props} section={7} task="D" notes={{}} />;
};

export default LossOfPfd;
