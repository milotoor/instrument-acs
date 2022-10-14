import { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';

import { Layout, Link, TableOfContents } from '../components';
import { getStaticPropFns } from '../server';
import { Structure } from '../lib/types';

type HomeProps = { structure: Structure.AppData };

export const getStaticProps = getStaticPropFns.structure;
const Home: NextPage<HomeProps> = ({ structure }) => {
  return (
    <Layout home structure={structure}>
      <Head>
        <title>The Instrument ACS</title>
      </Head>

      <main className="flex flex-1 flex-col justify-center md:w-medium px-4">
        <h1 className="text-4xl sm:text-7xl font-bold font-fancy pt-5">
          The{' '}
          <Link
            className="text-glow-gold"
            href="https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf"
          >
            Instrument ACS
          </Link>
        </h1>

        <div className="my-10 w-full">
          <TableOfContents structure={structure} />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
