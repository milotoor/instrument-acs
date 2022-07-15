import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getTaskFromSectionLetter } from '../../lib/data_loaders';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({ props: getTaskFromSectionLetter(4, 'A') });

const InstrumentFlight: NextPage<Task> = (task) => {
  return <TaskPage task={task} flags={{ 1: 'missed' }} notes={{}} />;
};

export default InstrumentFlight;
