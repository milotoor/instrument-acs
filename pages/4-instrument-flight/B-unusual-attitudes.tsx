import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const UnusualAttitudes: ACS.Page = (props) => {
  return <TaskPage {...props} section={4} task="B" notes={{}} />;
};

export default UnusualAttitudes;
