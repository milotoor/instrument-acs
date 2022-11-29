import React from 'react';

import { SectionPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../server/ssr';

export const getStaticProps = getStaticPropsFn;
const InstrumentFlight: ACS.Page = (props) => {
  return <SectionPage {...props} number={4} />;
};

export default InstrumentFlight;
