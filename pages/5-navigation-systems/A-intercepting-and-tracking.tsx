import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const InterceptingAndTracking: ACS.Page = (props) => {
  return <TaskPage {...props} section={5} task="A" notes={{}} />;
};

export default InterceptingAndTracking;
