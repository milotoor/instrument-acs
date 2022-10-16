import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStaticPropFns } from '../../ssr';

export const getStaticProps = getStaticPropFns.task(2, 'C');
const FlightDeckCheck: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default FlightDeckCheck;
