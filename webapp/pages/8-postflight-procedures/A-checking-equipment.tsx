import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getTaskFromSectionLetter } from '../../lib/data_loaders';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({ props: getTaskFromSectionLetter(8, 'A') });

const CheckingEquipment: NextPage<Task> = (task) => {
  return (
    <TaskPage
      task={task}
      notes={{}}
    />
  );
};

export default CheckingEquipment;