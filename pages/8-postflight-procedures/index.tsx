import React from 'react';

import { SectionPage } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const PostflightProcedures: ACS.Page = (props) => {
  return <SectionPage {...props} number={8} />;
};

export default PostflightProcedures;
