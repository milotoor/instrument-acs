import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { referenceURIs } from '../lib/references';
import { ChildProp, Item, OneOrMore, Section, Structure, Task } from '../lib/types';
import { makeAnchorId, objectHasProperty } from '../lib/util';
import { NoteContext } from './context';
import { Layout } from './Layout';
import { Link, LinkProps } from './Link';
import { Bold, Tooltip } from './Typography';

// Component prop types
type WrapParagraphProps = { content: React.ReactNode };
type ParagraphProps = ChildProp & ReferenceListProps & { heading?: string; hr?: boolean };
export type ReferenceListProps = {
  className?: string;
  references?: OneOrMore<React.ReactElement<LinkProps>>;
};

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
  return (
    <Layout structure={structure} task={task}>
      <Head>
        <title>{meta.name}</title>
      </Head>

      <main className="flex flex-1 flex-col w-full lg:w-large px-4 mb-8">
        <h3 className="text-xl md:text-2xl font-bold font-roboto-mono">
          Section {meta.section.numeral}. {meta.section.name}
        </h3>
        <h1 className="text-2xl md:text-4xl font-bold font-roboto-mono text-title -indent-12 pl-12 mt-2">
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
    <div className="w-full bg-white text-black p-2 my-5 rounded-lg shadow-[0px_5px_25px] shadow-yellow-400 text-sm">
      <NoteContext.Provider value={{ heading, item: id }}>
        <WrapParagraph content={note} />
      </NoteContext.Provider>
    </div>
  );
}

export function Paragraph({ children, heading, hr, references }: ParagraphProps) {
  const { heading: sectionHeading, item } = React.useContext(NoteContext);

  let id;
  if (heading) {
    const sanitizedHeading = heading.toLowerCase().split(' ').join('_');
    id = makeAnchorId(sectionHeading, item, sanitizedHeading);
  }

  return (
    <div className="mt-5 first:mt-0" id={id}>
      {hr ? <hr className="w-4/5 m-auto mb-5" /> : null}
      <div className={cn('flex flex-row items-center mb-1', { hidden: !heading })}>
        <a href={`#${id}`}>
          <span className="bg-indigo-500 px-2 py-1 inline-block rounded-xl text-white text-xs">
            <Bold>{heading}</Bold>
          </span>
        </a>
        <ReferenceList className="ml-4" references={references} />
      </div>
      {children}
    </div>
  );
}

export function ReferenceList({ className, references }: ReferenceListProps) {
  if (!references) return null;

  const referenceArray = Array.isArray(references) ? references : [references];
  if (referenceArray.length === 0) return null;

  return (
    <div className={cn('inline', className)}>
      {referenceArray.map((reference, i) => {
        const isLast = i === referenceArray.length - 1;
        const textColor = 'text-slate-400';
        return (
          <span className={cn('text-xs', textColor, { 'mr-2': !isLast })} key={i}>
            {React.cloneElement(reference, {
              ...reference.props,
              bold: false,
              className: cn('hover:text-slate-500', textColor),
            })}
            {isLast ? null : ','}
          </span>
        );
      })}
    </div>
  );
}

export function WrapParagraph({ content }: WrapParagraphProps) {
  return (
    <>
      {React.Children.map(content, (child, i) => {
        if (React.isValidElement(child) && child.type === Paragraph) {
          return React.cloneElement(child, { key: i });
        }

        return <Paragraph key={i}>{child}</Paragraph>;
      })}
    </>
  );
}
