import { NextPage, GetStaticProps } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getSectionStructure, getTaskFromNames } from '../../lib/data_loaders';
import { Task } from '../../lib/task';

type TaskDynamicPath = { section: string; task: string };

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

export const getStaticProps: GetStaticProps<Task, TaskDynamicPath> = ({ params }) => {
  if (!params) throw Error();
  return { props: getTaskFromNames(params.section, params.task) };
};

const GenericTaskPage: NextPage<Task> = (task) => <TaskPage task={task} />;
export default GenericTaskPage;
