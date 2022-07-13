import { NextPage } from 'next';
import Head from 'next/head';

import { Link } from '../components';
import { getSectionStructure, Section } from '../lib/data_loaders';

type ACSProp = { sections: Section[] };

export function getStaticProps(): { props: ACSProp } {
  return {
    props: {
      sections: getSectionStructure(),
    },
  };
}

const Home: NextPage<ACSProp> = ({ sections }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>The Instrument ACS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col justify-center w-[750px]">
        <h1 className="text-7xl font-bold font-fancy pt-5">
          The{' '}
          <Link
            color="text-title"
            href="https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf"
          >
            Instrument ACS
          </Link>
        </h1>

        <TableOfContents sections={sections} />
      </main>
    </div>
  );
};

export default Home;

const TableOfContents: React.FC<ACSProp> = ({ sections }) => {
  return (
    <div className="my-10 w-full">
      <ol className="list-decimal leading-8 ml-8 mt-4 text-xl font-roboto">
        {sections.map(({ name, tasks, uri }) => (
          <li key={name}>
            <Link href={uri}>{name}</Link>
            <ol className="ml-8" css={{ listStyleType: 'lower-alpha' }}>
              {tasks.map((task) => (
                <li key={task.name}>
                  <Link href={task.uri}>{task.name}</Link>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};
