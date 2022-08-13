import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(4, 'A') },
});

const InstrumentFlight: NextPage<TaskPage.TopLevelProps> = (props) => {
  return <TaskPage {...props} flags={{ missed: ['1'] }} notes={{}} />;
};

export default InstrumentFlight;
