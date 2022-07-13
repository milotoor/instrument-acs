import cn from 'classnames';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { Link } from '../../components';
import { getSectionStructure, getTaskFromNames } from '../../lib/data_loaders';
import { GroupHeading, NoteID, Task, TaskJSON } from '../../lib/task';

type Position = number;
type ActiveNoteArgs = { id: NoteID; position: Position };
type ActiveNoteProps = { note?: ActiveNoteArgs; task: Task };
type SetActiveNoteProp = (args: ActiveNoteArgs) => void;
type DataSectionProps = {
  activeNoteID?: NoteID;
  heading: GroupHeading;
  setActiveNote: SetActiveNoteProp;
  task: Task;
};

type ListItemProps = {
  hasNote: boolean;
  id: NoteID;
  isActive: boolean;
  setActiveNote: SetActiveNoteProp;
  text: string;
};

type ReferencesSectionProps = { references: string[] };
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskDynamicPath = { section: string; task: string };
type TaskPageProps = { taskJSON: TaskJSON };

export function getStaticPaths() {
  const sections = getSectionStructure();
  return {
    fallback: false,
    paths: sections?.flatMap(({ tasks }) =>
      tasks.map((task) => {
        const [_, sectionName, taskName] = task.uri.split('/');
        return { params: { section: sectionName, task: taskName } };
      })
    ),
  };
}

export const getStaticProps: GetStaticProps<TaskPageProps, TaskDynamicPath> = async ({
  params,
}) => {
  if (!params) throw Error();
  const task = getTaskFromNames(params.section, params.task);
  return { props: { taskJSON: task.toJSON() } };
};

const TaskPage: NextPage<TaskPageProps> = ({ taskJSON }) => {
  const task = React.useMemo(() => new Task(taskJSON), [taskJSON]);
  const [activeNote, setActiveNote] = React.useState<ActiveNoteArgs>();
  const { meta } = task.json;
  const dataSectionProps = { activeNoteID: activeNote?.id, setActiveNote, task };
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-start py-16"
      onClick={() => setActiveNote(undefined)}
    >
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

        <div className="grid grid-cols-2 gap-4 relative">
          <div>
            <ReferencesSection references={meta.references} />
            <SectionContainer heading="Objective">{meta.objective}</SectionContainer>
            <DataSection heading="Knowledge" {...dataSectionProps} />
            <DataSection heading="Risk Management" {...dataSectionProps} />
            <DataSection heading="Skills" {...dataSectionProps} />
          </div>

          <div>
            <ActiveNote note={activeNote} task={task} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskPage;

const acURI = (acNum: string) =>
  `https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_${acNum}.pdf`;

const farURIs = {
  61: 'https://www.law.cornell.edu/cfr/text/14/part-61',
  91: 'https://www.law.cornell.edu/cfr/text/14/part-91',
};

const referenceURIs = {
  '14 CFR part 61': farURIs[61],
  '14 CFR part 91': farURIs[91],
  'AC 00-45': acURI('00-45H'),
  'AC 00-6': acURI('00-6b'),
  'AC 120-108': acURI('120-108'),
  'AC 68-1': acURI('68-1'),
  'AC 91-74': acURI('91-74B'),
  'AC 91.21-1': acURI('91.21-1D'),
  'AIM': 'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/',
  'FAA-H-8083-2': 'https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf',
  'FAA-H-8083-3':
    'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/airplane_handbook/00_afh_full.pdf',
  'FAA-H-8083-15':
    'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/FAA-H-8083-15B.pdf',
  'FAA-H-8083-16':
    'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/instrument_procedures_handbook/FAA-H-8083-16B.pdf',
  'FAA-H-8083-25': 'https://www.faa.gov/sites/faa.gov/files/2022-03/pilot_handbook.pdf',
  'IFP': 'https://www.faa.gov/air_traffic/flight_info/aeronav/procedures/',
};

const referenceNames = {
  'AC 00-45': 'Aviation Weather Services',
  'AC 00-6': 'Aviation Weather',
  'AC 120-108': 'Continuous Descent Final Approach',
  'AC 68-1': 'Alternative Pilot Physical Examination and Education Requirements',
  'AC 91-74': 'Pilot Guide: Flight in Icing Conditions',
  'AC 91.21-1': 'Use of Portable Electronic Devices Aboard Aircraft',
  'FAA-H-8083-2': 'Risk Management Handbook',
  'FAA-H-8083-3': 'Airplane Flying Handbook',
  'FAA-H-8083-15': 'Instrument Flying Handbook',
  'FAA-H-8083-16': 'Instrument Procedures Handbook',
  'FAA-H-8083-25': 'PHAK',
  'IFP': 'Instrument Flight Procedures',
};

function objectHasProperty<T>(obj: T, prop: any): prop is keyof T {
  return prop in obj;
}

function ReferencesSection({ references }: ReferencesSectionProps) {
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
              <Link color={linkColor} href={farURIs[61]}>
                61
              </Link>{' '}
              and{' '}
              <Link color={linkColor} href={farURIs[61]}>
                91
              </Link>
            </span>
          );
        }

        return (
          <>
            {link}
            {i === arr.length - 1 ? '' : ', '}
          </>
        );
      })}
    </SectionContainer>
  );
}

function DataSection({ activeNoteID, heading, setActiveNote, task }: DataSectionProps) {
  const [data, notes] = task.getGroup(heading);
  const sorted = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  return (
    <SectionContainer heading={heading}>
      <ol className="list-decimal ml-8">
        {sorted.map(([num, datum]) => {
          // If the datum is not the beginning of a sub-list, render it
          if (typeof datum === 'string') {
            return <ListItem {...getListItemProps(datum, [heading, num])} />;
          }

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num}>
              {general}
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const sectionId = num + String.fromCharCode(97 + i);
                  return <ListItem {...getListItemProps(text, [heading, sectionId])} />;
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </SectionContainer>
  );

  function getListItemProps(text: string, noteId: NoteID) {
    const sectionId = noteId[1];
    return {
      hasNote: Boolean(notes && sectionId in notes),
      id: noteId,
      isActive: Boolean(activeNoteID?.every((v, i) => v === noteId[i])),
      key: sectionId,
      setActiveNote,
      text,
    };
  }
}

function ListItem({ hasNote, id, isActive, setActiveNote, text }: ListItemProps) {
  const activeColor = 'bg-yellow-500/75';
  return (
    <li>
      <span
        onClick={
          hasNote
            ? (e) => {
                e.stopPropagation();
                setActiveNote({
                  id: id,
                  position: (e.target as HTMLElement).offsetTop,
                });
              }
            : undefined
        }
        className={cn({
          'cursor-pointer': hasNote,
          [activeColor]: isActive,
          [`bg-yellow-500/50 hover:${activeColor}`]: hasNote && !isActive,
        })}
      >
        {text}
      </span>
    </li>
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

function ActiveNote({ note, task }: ActiveNoteProps) {
  if (!note) return null;
  const { id, position } = note;
  return (
    <div
      className="absolute bg-white text-black p-3 rounded"
      css={{ top: position }}
      onClick={(e) => e.stopPropagation()}
    >
      {task.getNote(id)}
    </div>
  );
}
