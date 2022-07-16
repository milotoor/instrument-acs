import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(5, 'A') },
});

const InterceptingAndTracking: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default InterceptingAndTracking;
