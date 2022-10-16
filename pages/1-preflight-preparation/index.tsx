import { NextPage } from 'next';
import React from 'react';

import { SectionPage } from '../../components';
import { getStaticPropFns } from '../../ssr';

export const getStaticProps = getStaticPropFns.structure;
const PreflightPreparation: NextPage<SectionPage.TopLevelProps> = (props) => {
  return <SectionPage {...props} number={1} />;
};

export default PreflightPreparation;
