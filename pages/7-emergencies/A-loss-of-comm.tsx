import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStaticPropFns } from '../../lib/data_loaders';

export const getStaticProps = getStaticPropFns.task(7, 'A');
const LossOfComm: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} flags={{ missed: ['1'] }} notes={{}} />;
};

export default LossOfComm;
