import { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';

import { Layout, Link } from '../components';
import { getStaticPropFns } from '../lib/data_loaders';
import { Structure } from '../lib/types';

type ACSProp = { structure: Structure.AppData };

export const getStaticProps = getStaticPropFns.structure;
const Home: NextPage<ACSProp> = ({ structure }) => {
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

        <TableOfContents structure={structure} />
      </main>
    </Layout>
  );
};

export default Home;

const TableOfContents: React.FC<ACSProp> = ({ structure }) => {
  return (
    <div className="my-10 w-full">
      <ol className="list-decimal leading-7 ml-8 mt-4 text-lg">
        {structure.sections.map(({ name, tasks }) => (
          <li key={name}>
            {name}
            <ol className="list-alpha ml-8">
              {tasks.map((task) => (
                <Link href={task.uri} key={task.name}>
                  <li>{task.name}</li>
                </Link>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};
