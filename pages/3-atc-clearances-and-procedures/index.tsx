import React from 'react';

import { SectionPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const ATCClearancesAndProcedures: ACS.Page = (props) => {
  return <SectionPage {...props} number={3} />;
};

export default ATCClearancesAndProcedures;
