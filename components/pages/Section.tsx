import Head from 'next/head';
import React from 'react';

import { Section, Structure } from '../../lib/types';
import { numberToNumeral } from '../../lib/util';
import { Layout } from '../Layout';

type SectionPageProps = SectionPage.TopLevelProps;

export const SectionPage: React.FC<SectionPageProps> = ({ number, structure }) => {
  const section = structure.sections[number - 1];
  const { name } = section;
  const title = `Section ${numberToNumeral(number)}. ${name}`;
  return (
    <Layout structure={structure}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex flex-1 flex-col w-full lg:w-large px-4 mb-8">
        <h1 className="text-title text-glow-gold">{title}</h1>
      </main>
    </Layout>
  );
};

// Exported under the same name as the component so only one import is required
export namespace SectionPage {
  export type TopLevelProps = {
    number: Section.Number;
    structure: Structure.AppData;
  };
}
