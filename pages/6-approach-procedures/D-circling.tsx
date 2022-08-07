import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(6, 'D') },
});

const Circling: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default Circling;
