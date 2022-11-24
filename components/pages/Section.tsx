import React from 'react';

import { ACS } from '../../lib';
import { Layout, TaskList } from '../Layout';
import { NoteCard } from '../Typography';

type SectionPageProps = ACS.TopLevelProps & {
  note?: React.ReactNode;
  number: ACS.Section.Number;
};

export function SectionPage({ note, number, rawData }: SectionPageProps) {
  const acsData = React.useMemo(() => new ACS(rawData), []);
  const section = acsData.getSection(number);
  const { name, numeral } = section;
  const title = `Section ${numeral}. ${name}`;
  return (
    <Layout acs={acsData} section={number} title={title}>
      <h1 className="text-title text-glow-gold">{title}</h1>

      <div className="my-10">
        <h3 className="text-subtitle">Tasks</h3>
        <TaskList className="ml-12 mt-2 text-lg" tasks={section.tasks} />
      </div>

      <NoteCard>{note}</NoteCard>
    </Layout>
  );
}
