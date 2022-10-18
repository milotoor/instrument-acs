import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const FlightDeckCheck: ACS.Page = (props) => {
  return <TaskPage {...props} section={2} task="C" notes={{}} />;
};

export default FlightDeckCheck;
