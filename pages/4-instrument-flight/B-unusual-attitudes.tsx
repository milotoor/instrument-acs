import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStaticPropFns } from '../../server';

export const getStaticProps = getStaticPropFns.task(4, 'B');
const UnusualAttitudes: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default UnusualAttitudes;
