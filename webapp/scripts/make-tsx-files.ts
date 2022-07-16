#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

import { getSectionStructure } from '../lib/data_loaders';

const rootPath = path.join(__dirname, '..');
const sections = getSectionStructure(rootPath);

// For each section...
sections?.forEach(({ number, tasks, uri }) => {
  // Create the section directory if it doesn't exist
  const sectionDirName = uri.split('/').at(-1);
  const sectionPath = path.join(rootPath, `webapp/pages/${sectionDirName}`);
  if (!fs.existsSync(sectionPath)) fs.mkdirSync(sectionPath);

  // For each task in the section...
  tasks.map(({ letter, uri }) => {
    const taskFileName = uri.split('/').at(-1) + '.tsx';
    const taskPath = path.join(sectionPath, taskFileName);

    // Create its `.tsx` file if it doesn't exist
    if (!fs.existsSync(taskPath)) fs.writeFileSync(taskPath, makeFileContent(number, letter, uri));
  });
});

function makeFileContent(n: number, l: string, uri: string) {
  // Converts a URI like "/preflight-preparation/pilot-qualifications" into "PilotQualifications"
  // which is suitable for a React component name
  const name = uri
    .split('/')
    .at(-1)!
    .split('-')
    .slice(1)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');

  return `import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(${n}, '${l}') },
});

const ${name}: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default ${name};
`;
}
