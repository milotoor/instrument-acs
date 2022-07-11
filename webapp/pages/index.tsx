import dirTree from 'directory-tree';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

type ACSSection = { name: string; tasks: string[] };
type ACSProp = { acs: ACSSection[] };

export function getStaticProps() {
  const tree = dirTree('../areas_of_operation');
  console.log(tree);
  const areas = tree?.children?.filter((child) => child.name.match(/\d\./));
  return {
    props: {
      acs: areas?.map(({ name, children }) => ({
        name: name.replace(/\d\. /, ''),
        tasks: children?.map(({ name }) => name.replace(/Task .\. /, '').replace('.toml', '')),
      })),
    },
  };
}

const Home: NextPage<ACSProp> = ({ acs }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold">
          The{' '}
          <a
            className="text-blue-600"
            href="https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf"
            target="_blank"
          >
            Instrument ACS
          </a>
        </h1>

        <TableOfContents acs={acs} />
      </main>
    </div>
  );
};

export default Home;

const TableOfContents: React.FC<ACSProp> = ({ acs }) => {
  return (
    <div className="mt-16 text-left w-full">
      <ol className="list-decimal leading-7 ml-8 mt-4">
        {acs.map(({ name, tasks }) => {
          const sectionUri = '/' + name.toLowerCase().replaceAll(/\s/g, '-');
          return (
            <li key={name}>
              <a className="text-blue-600" href={sectionUri}>
                {name}
              </a>
              <ol className="ml-8" css={{ listStyleType: 'lower-alpha' }}>
                {tasks.map((task) => (
                  <li key={name}>
                    <a
                      className="text-blue-600"
                      href={sectionUri + '/' + task.toLowerCase().replaceAll(/\s+/g, '-')}
                    >
                      {task}
                    </a>
                  </li>
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
