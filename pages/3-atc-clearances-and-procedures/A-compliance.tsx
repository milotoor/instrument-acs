import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Compliance: ACS.Page = (props) => {
  return <TaskPage {...props} section={3} task="A" notes={{}} />;
};

export default Compliance;
