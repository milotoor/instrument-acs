import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { farURI, referenceNames, referenceURIs } from '../lib/references';
import { Item, Section, Task } from '../lib/task';
import { Link } from './Link';

type DataSectionProps = { heading: Section.Headings.List; task: Task } & RenderNoteListProp;
type ObjectiveSectionProps = { objective: string } & RenderNoteElementProp;
type ReferencesSectionProps = { references: string[] } & RenderNoteElementProp;
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskPageProps = { task: Task; notes?: RenderNoteProps };

type RenderNoteListFunction = (id: Item.ID) => React.ReactNode | undefined;
type RenderNoteProps = Partial<{
  knowledge: RenderNoteListFunction;
  objective: React.ReactNode;
  references: React.ReactNode;
  risk: RenderNoteListFunction;
  skills: RenderNoteListFunction;
}>;

type RenderNoteElementProp = { note?: React.ReactNode | React.ReactNode[] };
type RenderNoteListProp = { notes?: RenderNoteListFunction };

export const TaskPage: React.FC<TaskPageProps> = ({ task, notes }) => {
  const { meta } = task;
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-16">
      <Head>
        <title>{meta.name}</title>
      </Head>

      <div className="fixed top-2 left-3 font-roboto text-lg">
        <Link href="/">← Home</Link>
      </div>

      <main className="flex flex-1 flex-col md:w-[1000px] px-4">
        <h3 className="text-xl md:text-2xl font-bold font-roboto-mono">
          Section {meta.section.numeral}. {meta.section.name}
        </h3>
        <h1 className="text-2xl md:text-4xl font-bold font-roboto-mono text-title -indent-12 pl-12 mt-2">
          Task {meta.letter}. {meta.name}
        </h1>

        <div>
          <ReferencesSection references={meta.references} note={notes?.references} />
          <ObjectiveSection objective={meta.objective} note={notes?.objective} />
          <DataSection heading="Knowledge" task={task} notes={notes?.knowledge} />
          <DataSection heading="Risk Management" task={task} notes={notes?.risk} />
          <DataSection heading="Skills" task={task} notes={notes?.skills} />
        </div>
      </main>
    </div>
  );
};

function objectHasProperty<T>(obj: T, prop: any): prop is keyof T {
  return prop in obj;
}

function ReferencesSection({ references, note }: ReferencesSectionProps) {
  return (
    <SectionContainer heading="References">
      {references.map((reference, i, arr) => {
        let name = reference;
        if (objectHasProperty(referenceNames, reference)) {
          if (reference.startsWith('AC')) {
            name = `${reference} (${referenceNames[reference]})`;
          } else {
            name = referenceNames[reference];
          }
        }

        let link: React.ReactNode = name;
        const linkColor = 'text-emerald-500';
        if (objectHasProperty(referenceURIs, reference)) {
          link = (
            <Link color={linkColor} href={referenceURIs[reference]}>
              {name}
            </Link>
          );
        } else if (reference === '14 CFR parts 61, 91') {
          link = (
            <span>
              14 CFR parts{' '}
              <Link color={linkColor} href={farURI(61)}>
                61
              </Link>{' '}
              and{' '}
              <Link color={linkColor} href={farURI(91)}>
                91
              </Link>
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

function DataSection({ heading, notes = () => null, task }: DataSectionProps) {
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
                {datum}
                <NoteCard note={notes(num)} />
              </li>
            );

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num}>
              {general}
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const itemId = num + String.fromCharCode(97 + i);
                  return (
                    <li key={i}>
                      {text}
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
      const marginTop = 'mt-3';
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
    <div className="w-full bg-white text-black p-2 my-5 rounded-lg shadow-[0px_5px_25px] shadow-yellow-400">
      {cardContent}
    </div>
  );
}
