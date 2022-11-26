import * as React from 'react';

import { Layout, Link, TableOfContents } from '../components';
import { ACS, useACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

export const getStaticProps = getStaticPropsFn;
const Home: ACS.Page = ({ rawData }) => {
  const acsData = useACS(rawData);
  return (
    <Layout acs={acsData} title="The Instrument ACS">
      <div className="max-w-[800px]">
        <h1 className="text-center sm:text-left text-7xl font-bold font-fancy pt-5 pb-10">
          The{' '}
          <Link className="text-glow-gold" href={references.acs}>
            Instrument ACS
          </Link>
        </h1>

        <TableOfContents />
      </div>
    </Layout>
  );
};

export default Home;

const references = {
  acs: 'https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf',
};
