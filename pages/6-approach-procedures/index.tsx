import React from 'react';

import { SectionPage, Success, Term } from '../../components';
import { ACS } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const ApproachProcedures: ACS.Page = (props) => {
  return (
    <SectionPage
      {...props}
      number={6}
      note={[
        <>
          <Term>Instrument approach procedures (IAPs)</Term> are at the heart of instrument
          training. <Success>They are how we get on the ground safely</Success> and require a great
          deal of precision during one of the most critical phases of flight. The tasks in this
          section cover various aspects of IAPs; this page will discuss information and procedures
          that are applicable across multiple phases of the approach.
        </>,
      ]}
    />
  );
};

export default ApproachProcedures;
