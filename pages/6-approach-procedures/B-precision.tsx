import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Precision: ACS.Page = (props) => {
  return <TaskPage {...props} section={6} task="B" notes={{}} />;
};

export default Precision;
