import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(7, 'B') },
});

const OneEngineInop: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default OneEngineInop;
