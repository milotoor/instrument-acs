import { NextPage } from 'next';
import Head from 'next/head';

import { Link } from '../components';
import { getSectionStructure } from '../lib/data_loaders';
import { Structure } from '../lib/task';

type ACSProp = { taskStructure: Structure.Section[] };

export function getStaticProps(): { props: ACSProp } {
  return {
    props: {
      taskStructure: getSectionStructure(),
    },
  };
}

const Home: NextPage<ACSProp> = ({ taskStructure }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>The Instrument ACS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col justify-center md:w-[750px] px-4">
        <h1 className="text-4xl sm:text-7xl font-bold font-fancy pt-5">
          The{' '}
          <Link
            color="text-title"
            href="https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf"
          >
            Instrument ACS
          </Link>
        </h1>

        <TableOfContents taskStructure={taskStructure} />
      </main>
    </div>
  );
};

export default Home;

const TableOfContents: React.FC<ACSProp> = ({ taskStructure }) => {
  return (
    <div className="my-10 w-full">
      <ol className="list-decimal leading-8 ml-8 mt-4 text-xl font-roboto">
        {taskStructure.map(({ name, tasks, uri }) => (
          <li key={name}>
            <Link href={uri}>{name}</Link>
            <ol className="list-alpha ml-8">
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
