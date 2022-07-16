import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(7, 'A') },
});

const LossOfComm: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} flags={{ 1: 'missed' }} notes={{}} />;
};

export default LossOfComm;
