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
type DataSectionProps = {
  activeNoteID?: NoteID;
  heading: GroupHeading;
  setActiveNote: (args: ActiveNoteArgs) => void;
  task: Task;
};

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
        <h1 className="text-2xl md:text-4xl font-bold font-roboto-mono text-yellow-400 [text-shadow:0_0_30px_rgba(0,0,0,1)] -indent-12 pl-12 mt-2">
          Task {meta.letter}. {meta.name}
        </h1>

        <div className="grid grid-cols-2 gap-4 relative">
          <div>
            <SectionContainer heading="References">{meta.references.join(', ')}</SectionContainer>
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

function DataSection({ activeNoteID, heading, setActiveNote, task }: DataSectionProps) {
  const [data, notes] = task.getGroup(heading);
  const sorted = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  const activeColor = 'bg-yellow-500/75';
  return (
    <SectionContainer heading={heading}>
      <ol className="list-decimal ml-8">
        {sorted.map(([num, datum]) => {
          const noteId: NoteID = [heading, parseInt(num)];
          const hasNote = Boolean(notes && num in notes);
          const isActive = Boolean(activeNoteID?.every((v, i) => v === noteId[i]));
          return (
            <li key={num}>
              <span
                onClick={
                  hasNote
                    ? (e) => {
                        e.stopPropagation();
                        setActiveNote({
                          id: noteId,
                          position: getPosition(e.target as HTMLElement),
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
                {datum}
              </span>
            </li>
          );
        })}
      </ol>
    </SectionContainer>
  );

  function getPosition(el: HTMLElement): Position {
    return el.offsetTop!;
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
