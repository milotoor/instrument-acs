import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { Link } from '../../components';
import { getSectionStructure, getTaskFromNames } from '../../lib/data_loaders';
import { Task, TaskJSON, TaskTOML } from '../../lib/task';

type DataSectionProps = { data: TaskTOML.DataList; heading: string };
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
  const { knowledge, meta, risk_management, skills } = task.json;
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-16">
      <Head>
        <title>{meta.name}</title>
      </Head>

      <div className="fixed top-2 left-3 font-roboto text-lg">
        <Link href="/">← Home</Link>
      </div>

      <main className="flex flex-1 flex-col w-[1000px]">
        <h3 className="text-2xl font-bold font-roboto-mono">
          Section {meta.section.numeral}. {meta.section.name}
        </h3>
        <h1 className="text-4xl font-bold font-roboto-mono text-yellow-400 [text-shadow:0_0_30px_rgba(0,0,0,1)] -indent-12 pl-12 mt-2">
          Task {meta.letter}. {meta.name}
        </h1>

        <SectionContainer heading="References">{meta.references.join(', ')}</SectionContainer>
        <SectionContainer heading="Objective">{meta.objective}</SectionContainer>
        <DataSection heading="Knowledge" data={knowledge} />
        <DataSection heading="Risk Management" data={risk_management} />
        <DataSection heading="Skills" data={skills} />
      </main>
    </div>
  );
};

export default TaskPage;

function DataSection({ data, heading }: DataSectionProps) {
  const sorted = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  return (
    <SectionContainer heading={heading}>
      <ol className="list-decimal ml-8">
        {sorted.map(([num, datum]) => (
          <li key={num}>{datum}</li>
        ))}
      </ol>
    </SectionContainer>
  );
}

function SectionContainer({ children, heading }: SectionContainerProps) {
  return (
    <div className="w-[500px] pt-6">
      <div className="text-3xl font-fancy mb-2 text-fuchsia-500">{heading}</div>
      <div className="text-lg font-roboto-mono">{children}</div>
    </div>
  );
}
