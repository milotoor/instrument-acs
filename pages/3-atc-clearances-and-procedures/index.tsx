import { NextPage } from 'next';
import React from 'react';

import { SectionPage } from '../../components';
import { getStaticPropFns } from '../../lib/data_loaders';

export const getStaticProps = getStaticPropFns.structure;
const ATCClearancesAndProcedures: NextPage<SectionPage.TopLevelProps> = (props) => {
  return <SectionPage {...props} number={3} />;
};

export default ATCClearancesAndProcedures;
