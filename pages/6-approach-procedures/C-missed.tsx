import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const Missed: ACS.Page = (props) => {
  return <TaskPage {...props} section={6} task="C" notes={{}} />;
};

export default Missed;
