import Head from 'next/head';
import React from 'react';

import { Section, Structure } from '../../lib/types';
import { numberToNumeral } from '../../lib/util';
import { Layout } from '../Layout';
import { TaskList } from '../Tasks';
import { WrapParagraph } from '../Typography';

type SectionPageProps = SectionPage.TopLevelProps & {
  note?: React.ReactNode;
  number: Section.Number;
};

export const SectionPage: React.FC<SectionPageProps> = ({ note, number, structure }) => {
  const section = structure.sections[number - 1];
  const { name } = section;
  const title = `Section ${numberToNumeral(number)}. ${name}`;
  return (
    <Layout section={section} structure={structure}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex flex-1 flex-col w-full lg:w-large px-4 mb-8">
        <h1 className="text-title text-glow-gold">{title}</h1>

        <div className="my-10">
          <h3 className="text-subtitle">Tasks</h3>
          <TaskList className="ml-12 mt-2 text-lg" tasks={section.tasks} />
        </div>

        {note && (
          <div className="note-card">
            <WrapParagraph content={note} />
          </div>
        )}
      </main>
    </Layout>
  );
};

// Exported under the same name as the component so only one import is required
export namespace SectionPage {
  export type TopLevelProps = { structure: Structure.AppData };
}
