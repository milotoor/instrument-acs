import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const OneEngineInop: ACS.Page = (props) => {
  return <TaskPage {...props} section={7} task="B" notes={{}} />;
};

export default OneEngineInop;
