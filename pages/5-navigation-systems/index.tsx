import { NextPage } from 'next';
import React from 'react';

import { SectionPage } from '../../components';
import { getStaticPropFns } from '../../server';

export const getStaticProps = getStaticPropFns.structure;
const NavigationSystems: NextPage<SectionPage.TopLevelProps> = (props) => {
  return <SectionPage {...props} number={5} />;
};

export default NavigationSystems;