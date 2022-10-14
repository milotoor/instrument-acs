import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStaticPropFns } from '../../server';

export const getStaticProps = getStaticPropFns.task(7, 'C');
const OneEngineInopApproaches: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default OneEngineInopApproaches;
