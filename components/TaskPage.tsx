import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { referenceURIs } from '../lib/references';
import { ChildProp, Item, OneOrMore, Section, Structure, Task } from '../lib/types';
import { makeItemID, objectHasProperty } from '../lib/util';
import { Layout } from './Layout';
import { Link, LinkProps } from './Link';
import { Bold, Tooltip } from './Typography';

// Component prop types
type ObjectiveSectionProps = { objective: string } & RenderNoteElementProp;
type ParagraphReferenceProps = { references?: OneOrMore<React.ReactElement<LinkProps>> };
type ParagraphProps = ChildProp & ParagraphReferenceProps & { heading?: string; hr?: boolean };
type ReferencesSectionProps = { references: string[] } & RenderNoteElementProp;
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskPageProps = TaskPage.TopLevelProps & FlagsProp & { notes?: RenderNoteProps };
type DataSectionProps = { heading: Section.Headings.List; task: Task } & RenderNoteListProp &
  FlagsProp;

// Flag types
type FlagType = 'missed';
type FlagsProp = { flags?: Partial<Record<FlagType, Item.ID[]>> };

// Note types
type RenderNoteElementProp = { note?: React.ReactNode | React.ReactNode[] };
type RenderNoteListProp = { notes?: RenderNoteListFunction };
type RenderNoteListFunction = (id: Item.ID) => React.ReactNode | undefined;
type RenderNoteProps = Partial<{
  knowledge: RenderNoteListFunction;
  objective: React.ReactNode;
  references: React.ReactNode;
  risk: RenderNoteListFunction;
  skills: RenderNoteListFunction;
}>;

export const TaskPage: React.FC<TaskPageProps> = ({ task, structure, flags = {}, notes }) => {
  const { meta } = task;
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
          <ReferencesSection references={meta.references} note={notes?.references} />
          <ObjectiveSection objective={meta.objective} note={notes?.objective} />
          <DataSection heading="Knowledge" task={task} flags={flags} notes={notes?.knowledge} />
          <DataSection heading="Risk Management" task={task} notes={notes?.risk} />
          <DataSection heading="Skills" task={task} notes={notes?.skills} />
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

function ReferencesSection({ references, note }: ReferencesSectionProps) {
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
      <NoteCard note={note} />
    </SectionContainer>
  );
}

function ObjectiveSection({ objective, note }: ObjectiveSectionProps) {
  return (
    <SectionContainer heading="Objective">
      {objective}
      <NoteCard note={note} />
    </SectionContainer>
  );
}

function DataSection({ flags, heading, notes = () => null, task }: DataSectionProps) {
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
  return (
    <SectionContainer heading={heading}>
      <ol className="list-decimal ml-8">
        {sorted.map(([num, datum]) => {
          // If the datum is not the beginning of a sub-list, render it
          const id = makeItemID(heading, num);
          if (typeof datum === 'string')
            return (
              <li key={num} id={id}>
                <a href={`#${id}`}>{applyFlags(num, datum)}</a>
                <NoteCard note={notes(num)} />
              </li>
            );

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num} id={id}>
              <a href={`#${id}`}>{general}</a>
              <NoteCard note={notes(num)} />
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const itemId = num + String.fromCharCode(97 + i);
                  const id = makeItemID(heading, itemId);
                  return (
                    <li key={i} id={id}>
                      <a href={`#${id}`}>{applyFlags(itemId, text)}</a>
                      <NoteCard note={notes(itemId)} />
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

function NoteCard({ note }: RenderNoteElementProp) {
  if (!note || (Array.isArray(note) && note.length === 0)) return null;

  const cardContent = (() => {
    if (!Array.isArray(note)) return note;
    return note.map((paragraph, i) => {
      if (React.isValidElement(paragraph)) {
        if (paragraph.type === Paragraph) {
          return React.cloneElement(paragraph, { key: i });
        }
      }

      return <Paragraph key={i}>{paragraph}</Paragraph>;
    });
  })();

  return (
    <div className="w-full bg-white text-black p-2 my-5 rounded-lg shadow-[0px_5px_25px] shadow-yellow-400 text-sm">
      {cardContent}
    </div>
  );
}

export function Paragraph({ children, heading, hr, references }: ParagraphProps) {
  return (
    <div className="mt-5 first:mt-0">
      {hr ? <hr className="w-4/5 m-auto mb-5" /> : null}
      <div className={cn('flex flex-row items-center mb-1', { hidden: !heading })}>
        <span className="bg-indigo-500 px-2 py-1 inline-block rounded-xl text-white text-xs">
          <Bold>{heading}</Bold>
        </span>
        <ParagraphReferences references={references} />
      </div>
      {children}
    </div>
  );
}

function ParagraphReferences({ references }: ParagraphReferenceProps) {
  if (!references) return null;

  const referenceArray = Array.isArray(references) ? references : [references];
  if (referenceArray.length === 0) return null;

  return (
    <div className="inline ml-4">
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
