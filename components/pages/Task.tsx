import { DateTime } from 'luxon';
import React from 'react';

import {
  ACS,
  ArbitraryID,
  ChildProp,
  makeAnchorId,
  objectHasProperty,
  referenceURIs,
  uri,
  useACS,
} from '../../lib';
import { NoteContext } from '../context';
import { Layout } from '../Layout';
import { Link } from '../Link';
import { Bold, NoteCard } from '../Typography';

// Component prop types
type DataSectionProps = { heading: ACS.Section.Heading; notes?: NotesObject; task: ACS.Task };
type ItemHeadingProps = ArbitraryID & { marker: string; text: string };
type LastUpdatedWidgetProps = { task: ACS.Task };
type ReferencesSectionProps = { references: string[] };
type SectionContainerProps = ChildProp & { heading: string };
type TaskPageProps = ACS.Page.DataProps & {
  notes?: NotesObject;
  section: ACS.Section.Number;
  task: ACS.Task.Letter;
};

// Note types
type NoteCardProps = { heading: ACS.Section.Heading; id: ACS.Item.ID; notes: NotesObject };
type NotesObject = Record<ACS.Item.ID, React.ReactNode>;

export function TaskPage(props: TaskPageProps) {
  const { notes, rawData, section: sectionNumber, task: taskLetter } = props;
  const acsData = useACS(rawData);
  const section = acsData.getSection(sectionNumber);
  const task = acsData.getTask(sectionNumber, taskLetter);
  const dataSectionProps = { task, notes };
  return (
    <Layout data={rawData} section={sectionNumber} task={taskLetter} title={task.name}>
      <Link className="text-subtitle" color={null} href={section.uri}>
        Section {section.numeral}. {section.name}
      </Link>
      <Layout.Title className="mt-2">
        Task {task.letter}. {task.name}
      </Layout.Title>

      <LastUpdatedWidget task={task} />

      <div>
        <ReferencesSection references={task.meta.references} />
        <SectionContainer heading="Objective">{task.meta.objective}</SectionContainer>
        <DataSection heading="Knowledge" {...dataSectionProps} />
        <DataSection heading="Risk Management" {...dataSectionProps} />
        <DataSection heading="Skills" {...dataSectionProps} />
      </div>
    </Layout>
  );
}

function LastUpdatedWidget({ task }: LastUpdatedWidgetProps) {
  const [updated, sha] = task.updated;
  const date = DateTime.fromRFC2822(updated);
  return (
    <Link className="text-sm mt-1" color="text-slate-300" href={uri.github('commit', sha)}>
      <span>Last updated:</span> <Bold>{date.toLocaleString(DateTime.DATE_FULL)}</Bold>
    </Link>
  );
}

function ReferencesSection({ references }: ReferencesSectionProps) {
  const linkProps = {
    bold: true,
    color: 'text-cyan-400',
  };

  return (
    <SectionContainer heading="References">
      {references.map((reference, i, arr) => {
        let link: React.ReactNode = reference;
        if (objectHasProperty(referenceURIs, reference)) {
          link = <Link.Reference reference={reference} {...linkProps} />;
        } else if (reference === '14 CFR parts 61, 91') {
          link = (
            <span>
              14 CFR parts <Link.Reference reference="14 CFR part 61" text={61} {...linkProps} />{' '}
              and <Link.Reference reference="14 CFR part 91" text={91} {...linkProps} />
            </span>
          );
        }

        return (
          <span key={i}>
            {link}
            {i === arr.length - 1 ? '' : ', '}
          </span>
        );
      })}
    </SectionContainer>
  );
}

function DataSection({ heading, notes = {}, task }: DataSectionProps) {
  const data = (() => {
    switch (heading) {
      case 'Knowledge':
        return task.knowledge;
      case 'Risk Management':
        return task.risk_management;
      case 'Skills':
        return task.skills;
    }
  })();

  const sorted = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  const noteCardProps = { heading, notes };
  return (
    <SectionContainer heading={heading}>
      {sorted.map(([num, datum]) => {
        // If the datum is not the beginning of a sub-list, render it
        const id = makeAnchorId(heading, num);
        if (typeof datum === 'string')
          return (
            <div key={num}>
              <ItemHeading id={id} marker={num} text={datum} />
              <ItemCard {...noteCardProps} id={num} />
            </div>
          );

        // Otherwise we need to render the sublist
        const { general, specific } = datum;
        return (
          <div key={num}>
            <ItemHeading marker={num} id={id} text={general} />
            <ItemCard {...noteCardProps} id={num} />
            {specific.map((text, i) => {
              // Char code 97 is "a", 98 is "b", etc.
              const letter = String.fromCharCode(97 + i);
              const itemId = num + letter;
              const id = makeAnchorId(heading, itemId);
              return (
                <div key={i}>
                  <ItemHeading marker={letter} id={id} text={text} />
                  <ItemCard {...noteCardProps} id={itemId} />
                </div>
              );
            })}
          </div>
        );
      })}
    </SectionContainer>
  );
}

function ItemHeading({ id, marker, text }: ItemHeadingProps) {
  return (
    <div className="flex items-baseline">
      <div>{marker}.</div>
      <div className="flex-grow pl-2">
        <Link.ToSelf color={null} className="text-lg" id={id}>
          {text}
        </Link.ToSelf>
      </div>
    </div>
  );
}

function SectionContainer({ children, heading }: SectionContainerProps) {
  const sectionId = heading.toLowerCase();
  return (
    <div className="pt-6">
      <Link.ToSelf id={sectionId} color="text-indigo-400" className="text-3xl font-fancy mb-2">
        {heading}
      </Link.ToSelf>
      <div>{children}</div>
    </div>
  );
}

function ItemCard({ heading, id, notes }: NoteCardProps) {
  const notePrefix = heading[0].toLowerCase();
  const note = notes[`${notePrefix}${id}`];
  return (
    <NoteContext.Provider value={{ heading, item: id }}>
      <NoteCard note={note} />
    </NoteContext.Provider>
  );
}
