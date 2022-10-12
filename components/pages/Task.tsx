import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { referenceURIs } from '../../lib/references';
import { Item, Section, Structure, Task } from '../../lib/types';
import { makeAnchorId, numeralToNumber, objectHasProperty } from '../../lib/util';
import { NoteContext } from '../context';
import { Layout } from '../Layout';
import { Link } from '../Link';
import { Tooltip, WrapParagraph } from '../Typography';

// Component prop types
type ReferencesSectionProps = { references: string[] };
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskPageProps = TaskPage.TopLevelProps & FlagsProp & { notes?: NotesObject };
type DataSectionProps = FlagsProp & {
  heading: Section.Headings.List;
  notes?: NotesObject;
  task: Task;
};

// Flag types
type FlagType = 'missed';
type FlagsProp = { flags?: Partial<Record<FlagType, Item.ID[]>> };

// Note types
type NoteCardProps = { heading: Section.Headings.List; id: Item.ID; notes: NotesObject };
type NotesObject = Record<Item.ID, React.ReactNode>;

export const TaskPage: React.FC<TaskPageProps> = ({ task, structure, flags = {}, notes }) => {
  const { meta } = task;
  const dataSectionProps = { task, notes };
  const section = structure.sections[numeralToNumber(meta.section.numeral) - 1];
  return (
    <Layout structure={structure} task={task}>
      <Head>
        <title>{meta.name}</title>
      </Head>

      <main className="flex flex-1 flex-col w-full lg:w-large px-4 mb-8">
        <Link className={null} href={section.uri}>
          <h3 className="text-subtitle text-white">
            Section {meta.section.numeral}. {meta.section.name}
          </h3>
        </Link>
        <h1 className="text-title text-glow-gold mt-2">
          Task {meta.letter}. {meta.name}
        </h1>

        <div>
          <ReferencesSection references={meta.references} />
          <SectionContainer heading="Objective">{meta.objective}</SectionContainer>
          <DataSection heading="Knowledge" flags={flags} {...dataSectionProps} />
          <DataSection heading="Risk Management" {...dataSectionProps} />
          <DataSection heading="Skills" {...dataSectionProps} />
        </div>
      </main>
    </Layout>
  );
};

// Exported under the same name as the component so only one import is required
export namespace TaskPage {
  export type TopLevelProps = {
    task: Task;
    structure: Structure.AppData;
  };
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
      <ol className="list-decimal ml-8">
        {sorted.map(([num, datum]) => {
          // If the datum is not the beginning of a sub-list, render it
          const id = makeAnchorId(heading, num);
          if (typeof datum === 'string')
            return (
              <li key={num} id={id}>
                <a href={`#${id}`}>{applyFlags(num, datum)}</a>
                <NoteCard {...noteCardProps} id={num} />
              </li>
            );

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num} id={id}>
              <a href={`#${id}`}>{general}</a>
              <NoteCard {...noteCardProps} id={num} />
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const itemId = num + String.fromCharCode(97 + i);
                  const id = makeAnchorId(heading, itemId);
                  return (
                    <li key={i} id={id}>
                      <a href={`#${id}`}>{applyFlags(itemId, text)}</a>
                      <NoteCard {...noteCardProps} id={itemId} />
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </SectionContainer>
  );

  function applyFlags(id: Item.ID, text: string) {
    const wasMissed = flags?.missed?.includes(id);
    const hoverText = wasMissed ? 'Missed on knowledge test!' : undefined;
    return (
      <Tooltip noUnderline message={hoverText}>
        <span className={cn('text-lg', { 'bg-red-500/50': wasMissed })}>{text}</span>
      </Tooltip>
    );
  }
}

function SectionContainer({ children, heading }: SectionContainerProps) {
  return (
    <div className="pt-6">
      <div className="text-3xl font-fancy mb-2 text-fuchsia-500">{heading}</div>
      <div className="font-roboto-mono">{children}</div>
    </div>
  );
}

function NoteCard({ heading, id, notes }: NoteCardProps) {
  const notePrefix = heading[0].toLowerCase();
  const note = notes[`${notePrefix}${id}`];
  if (!note || (Array.isArray(note) && note.length === 0)) return null;
  return (
    <div className="w-full bg-white text-black my-5 rounded-lg shadow-[0px_5px_25px] shadow-yellow-400 text-sm">
      <NoteContext.Provider value={{ heading, item: id }}>
        <WrapParagraph content={note} />
      </NoteContext.Provider>
    </div>
  );
}
