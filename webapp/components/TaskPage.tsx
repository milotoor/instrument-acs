import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { referenceURIs } from '../lib/references';
import { Item, Section, Structure, Task } from '../lib/task';
import { objectHasProperty } from '../lib/util';
import { Layout } from './Layout';
import { ReferenceLink } from './Typography';

// Component prop types
type ObjectiveSectionProps = { objective: string } & RenderNoteElementProp;
type ReferencesSectionProps = { references: string[] } & RenderNoteElementProp;
type SectionContainerProps = { children: React.ReactNode; heading: string };
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
  export type TopLevelProps = { task: Task; structure: Structure.Section[] };
}

function ReferencesSection({ references, note }: ReferencesSectionProps) {
  const linkColor = 'text-emerald-500';
  return (
    <SectionContainer heading="References">
      {references.map((reference, i, arr) => {
        let link: React.ReactNode = reference;
        if (objectHasProperty(referenceURIs, reference)) {
          link = <ReferenceLink color={linkColor} reference={reference} />;
        } else if (reference === '14 CFR parts 61, 91') {
          link = (
            <span>
              14 CFR parts <ReferenceLink color={linkColor} reference="14 CFR part 61" text={61} />{' '}
              and <ReferenceLink color={linkColor} reference="14 CFR part 91" text={91} />
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
              <li key={num}>
                {applyFlags(num, datum)}
                <NoteCard note={notes(num)} />
              </li>
            );

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num}>
              {general}
              <NoteCard note={notes(num)} />
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const itemId = num + String.fromCharCode(97 + i);
                  return (
                    <li key={i}>
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
      // If the child is an element (e.g. the note is wrapped in a <p> tag) then we simply extend
      // its className to provide margin with the paragraph above. If not, we wrap the child in a
      // <p> tag with that same margin
      const marginTop = 'mt-5';
      if (React.isValidElement(paragraph)) {
        return React.cloneElement(paragraph, {
          className: cn(paragraph.props.className, { [marginTop]: i !== 0 }),
          key: i,
        });
      } else {
        return (
          <p key={i} className={marginTop}>
            {paragraph}
          </p>
        );
      }
    });
  })();

  return (
    <div className="w-full bg-white text-black p-2 my-5 rounded-lg shadow-[0px_5px_25px] shadow-yellow-400 text-sm">
      {cardContent}
    </div>
  );
}
