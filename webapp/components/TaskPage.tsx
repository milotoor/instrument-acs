import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { referenceURIs } from '../lib/references';
import { ChildProp, Item, Section, Structure, Task } from '../lib/types';
import { objectHasProperty } from '../lib/util';
import { AppContext } from './context';
import { Layout } from './Layout';
import { Bold, Link, ReferenceLink, Tooltip } from './Typography';

// Component prop types
type ObjectiveSectionProps = { objective: string } & RenderNoteElementProp;
type ParagraphProps = ChildProp & { heading?: string; hr?: boolean };
type ReferencesSectionProps = { references: string[] } & RenderNoteElementProp;
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskLinkProps = { section: Section.Number; task: Task.Letter; id: Item.ID };
type TaskPageProps = TaskPage.TopLevelProps & FlagsProp & { notes?: RenderNoteProps };
type DataSectionProps = { heading: Section.Headings.List; task: Task } & RenderNoteListProp &
  FlagsPropInternal;

// Flag types
type FlagType = 'missed';
type FlagsProp = { flags?: Record<Item.ID, FlagType> };
type FlagsPropInternal = { flags?: Map<Item.ID, FlagType> };

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
  const flagMap = React.useMemo(() => new Map(Object.entries(flags)), [flags]);
  return (
    <Layout structure={structure} task={task}>
      <Head>
        <title>{meta.name}</title>
      </Head>

      <main className="flex flex-1 flex-col md:w-[1000px] px-4 mb-8">
        <h3 className="text-xl md:text-2xl font-bold font-roboto-mono">
          Section {meta.section.numeral}. {meta.section.name}
        </h3>
        <h1 className="text-2xl md:text-4xl font-bold font-roboto-mono text-title -indent-12 pl-12 mt-2">
          Task {meta.letter}. {meta.name}
        </h1>

        <div>
          <ReferencesSection references={meta.references} note={notes?.references} />
          <ObjectiveSection objective={meta.objective} note={notes?.objective} />
          <DataSection heading="Knowledge" task={task} flags={flagMap} notes={notes?.knowledge} />
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
          link = <ReferenceLink reference={reference} {...linkProps} />;
        } else if (reference === '14 CFR parts 61, 91') {
          link = (
            <span>
              14 CFR parts <ReferenceLink reference="14 CFR part 61" text={61} {...linkProps} /> and{' '}
              <ReferenceLink reference="14 CFR part 91" text={91} {...linkProps} />
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

const flagClasses = {
  missed: ['bg-red-500/50', 'Missed on knowledge test!'],
};

function makeItemID(heading: Section.Headings.List, id: Item.ID) {
  const shorthand = heading === 'Risk Management' ? 'risk' : heading.toLowerCase();
  return [shorthand, id].join('-');
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
          if (typeof datum === 'string')
            return (
              <li key={num} id={makeItemID(heading, num)}>
                {applyFlags(num, datum)}
                <NoteCard note={notes(num)} />
              </li>
            );

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num} id={makeItemID(heading, num)}>
              {general}
              <NoteCard note={notes(num)} />
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const itemId = num + String.fromCharCode(97 + i);
                  return (
                    <li key={i} id={makeItemID(heading, itemId)}>
                      {applyFlags(itemId, text)}
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
    const itemFlag = flags?.get(id);
    if (!itemFlag) return text;
    const [className, description] = flagClasses[itemFlag];
    return (
      <span className={className} title={description}>
        {text}
      </span>
    );
  }
}

function SectionContainer({ children, heading }: SectionContainerProps) {
  return (
    <div className="pt-6">
      <div className="text-3xl font-fancy mb-2 text-fuchsia-500">{heading}</div>
      <div className="text-lg font-roboto-mono">{children}</div>
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

export function Paragraph({ children, heading, hr }: ParagraphProps) {
  return (
    <div className="mt-5 first:mt-0">
      {hr ? <hr className="w-4/5 m-auto mb-5" /> : null}
      <div className={cn({ hidden: !heading })}>
        <span className="bg-indigo-500 px-2 py-1 inline-block rounded-xl mb-1 text-white text-xs">
          <Bold>{heading}</Bold>
        </span>
      </div>
      {children}
    </div>
  );
}

export function TaskLink({ section, task, id }: TaskLinkProps) {
  const { sections } = React.useContext(AppContext);
  const taskData = sections[section].tasks.find(({ letter }) => letter === task);
  if (!taskData) return null;

  const dataSection = id[0].toLowerCase();
  const itemId = id.slice(1);
  const heading =
    dataSection === 'k' ? 'Knowledge' : dataSection === 'r' ? 'Risk Management' : 'Skills';

  return (
    <Tooltip message={taskData.name}>
      <Link href={`${taskData.uri}#${makeItemID(heading, itemId)}`}>
        <span>
          Section {section}, Task {task}
        </span>
      </Link>
    </Tooltip>
  );
}
