import cn from 'classnames';
import React from 'react';

import { ACS, makeAnchorId, objectHasProperty, referenceURIs } from '../../lib';
import { NoteContext } from '../context';
import { Layout } from '../Layout';
import { Link } from '../Link';
import { Tooltip, WrapParagraph } from '../Typography';

// Component prop types
type ItemHeadingProps = { marker: string; id: string; text: string };
type ReferencesSectionProps = { references: string[] };
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskPageProps = ACS.TopLevelProps &
  FlagsProp & { notes?: NotesObject; section: ACS.Section.Number; task: ACS.Task.Letter };
type DataSectionProps = FlagsProp & {
  heading: ACS.Section.Heading;
  notes?: NotesObject;
  task: ACS.Task;
};

// Flag types
type FlagType = 'missed';
type FlagsProp = { flags?: Partial<Record<FlagType, ACS.Item.ID[]>> };

// Note types
type NoteCardProps = { heading: ACS.Section.Heading; id: ACS.Item.ID; notes: NotesObject };
type NotesObject = Record<ACS.Item.ID, React.ReactNode>;

export function TaskPage(props: TaskPageProps) {
  const { flags = {}, notes, rawData, section: sectionNumber, task: taskLetter } = props;
  const acsData = new ACS(rawData);
  const section = acsData.getSection(sectionNumber);
  const task = acsData.getTask(sectionNumber, taskLetter);
  const dataSectionProps = { task, notes };
  return (
    <Layout acs={acsData} section={sectionNumber} task={taskLetter} title={task.name}>
      <Link className="text-subtitle" color={null} href={section.uri}>
        Section {section.numeral}. {section.name}
      </Link>
      <h1 className="text-title text-glow-gold mt-2">
        Task {task.letter}. {task.name}
      </h1>

      <div>
        <ReferencesSection references={task.meta.references} />
        <SectionContainer heading="Objective">{task.meta.objective}</SectionContainer>
        <DataSection heading="Knowledge" flags={flags} {...dataSectionProps} />
        <DataSection heading="Risk Management" {...dataSectionProps} />
        <DataSection heading="Skills" {...dataSectionProps} />
      </div>
    </Layout>
  );
}

function ReferencesSection({ references }: ReferencesSectionProps) {
  const linkProps = {
    bold: true,
    color: 'text-cyan-500',
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

function DataSection({ flags, heading, notes = {}, task }: DataSectionProps) {
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
              <NoteCard {...noteCardProps} id={num} />
            </div>
          );

        // Otherwise we need to render the sublist
        const { general, specific } = datum;
        return (
          <div key={num}>
            <ItemHeading marker={num} id={id} text={general} />
            <NoteCard {...noteCardProps} id={num} />
            {specific.map((text, i) => {
              // Char code 97 is "a", 98 is "b", etc.
              const letter = String.fromCharCode(97 + i);
              const itemId = num + letter;
              const id = makeAnchorId(heading, itemId);
              return (
                <div key={i}>
                  <ItemHeading marker={letter} id={id} text={text} />
                  <NoteCard {...noteCardProps} id={itemId} />
                </div>
              );
            })}
          </div>
        );
      })}
    </SectionContainer>
  );

  function applyFlags(id: ACS.Item.ID, text: string) {
    const wasMissed = flags?.missed?.includes(id);
    const hoverText = wasMissed ? 'Missed on knowledge test!' : undefined;
    return (
      <Tooltip noUnderline message={hoverText}>
        <span className={cn('text-lg', { 'bg-red-500/50': wasMissed })}>{text}</span>
      </Tooltip>
    );
  }
}

function ItemHeading({ id, marker, text }: ItemHeadingProps) {
  return (
    <div id={id} className="flex items-baseline">
      <div>{marker}.</div>
      <div className="flex-grow pl-2">
        <a href={`#${id}`}>
          <span className="text-lg">{text}</span>
        </a>
      </div>
    </div>
  );
}

function SectionContainer({ children, heading }: SectionContainerProps) {
  return (
    <div className="pt-6">
      <div className="text-3xl font-fancy mb-2 text-fuchsia-500">{heading}</div>
      <div>{children}</div>
    </div>
  );
}

function NoteCard({ heading, id, notes }: NoteCardProps) {
  const notePrefix = heading[0].toLowerCase();
  const note = notes[`${notePrefix}${id}`];
  if (!note || (Array.isArray(note) && note.length === 0)) return null;
  return (
    <div className="note-card">
      <NoteContext.Provider value={{ heading, item: id }}>
        <WrapParagraph content={note} />
      </NoteContext.Provider>
    </div>
  );
}
