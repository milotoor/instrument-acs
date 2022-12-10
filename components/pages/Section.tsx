import React from 'react';

import { ACS, useACS } from '../../lib';
import { Layout, TaskList } from '../Layout';
import { Bold, NoteCard } from '../Typography';

type SectionPageProps = ACS.Page.DataProps & {
  note?: React.ReactNode;
  number: ACS.Section.Number;
};

export function SectionPage({ note, number, rawData }: SectionPageProps) {
  const acsData = useACS(rawData);
  const section = acsData.getSection(number);
  const { name, numeral } = section;
  const title = `Section ${numeral}. ${name}`;
  return (
    <Layout data={rawData} section={number} title={title}>
      <h1 className="text-title text-glow-gold">{title}</h1>

      <div className="my-10">
        <h3 className="text-subtitle">Tasks</h3>
        <Bold>
          <TaskList className="ml-12 mt-2 text-lg" tasks={section.tasks} />
        </Bold>
      </div>

      <NoteCard note={note} />
    </Layout>
  );
}
