import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(2, 'B') },
});

const Instruments: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} notes={{}} />;
};

export default Instruments;