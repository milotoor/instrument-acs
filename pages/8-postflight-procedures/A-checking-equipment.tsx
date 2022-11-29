import React from 'react';

import { TaskPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const CheckingEquipment: ACS.Page = (props) => {
  return <TaskPage {...props} section={8} task="A" notes={{}} />;
};

export default CheckingEquipment;
