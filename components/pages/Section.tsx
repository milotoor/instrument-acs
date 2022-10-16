import React from 'react';

import { numberToNumeral, Section, Structure } from '../../lib';
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
    <Layout section={section} structure={structure} title={title}>
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
    </Layout>
  );
};

// Exported under the same name as the component so only one import is required
export namespace SectionPage {
  export type TopLevelProps = { structure: Structure.AppData };
}
