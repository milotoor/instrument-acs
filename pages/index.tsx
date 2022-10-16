import { NextPage } from 'next';
import * as React from 'react';

import { Layout, Link, TableOfContents } from '../components';
import { Structure } from '../lib';
import { getStaticPropFns } from '../ssr';

type HomeProps = { structure: Structure.AppData };

export const getStaticProps = getStaticPropFns.structure;
const Home: NextPage<HomeProps> = ({ structure }) => {
  return (
    <Layout centered home structure={structure} title="The Instrument ACS">
      <div className="max-w-[800px]">
        <h1 className="text-7xl font-bold font-fancy pt-5 pb-10">
          The{' '}
          <Link className="text-glow-gold" href={references.acs}>
            Instrument ACS
          </Link>
        </h1>

        <TableOfContents structure={structure} />
      </div>
    </Layout>
  );
};

export default Home;

const references = {
  acs: 'https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf',
};
