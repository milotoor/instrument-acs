import { NextPage } from 'next';
import React from 'react';

import { TaskPage } from '../../components';
import { getTaskFromSectionLetter } from '../../lib/data_loaders';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({ props: getTaskFromSectionLetter(1, 'B') });

const WeatherInformation: NextPage<Task> = (task) => {
  return (
    <TaskPage
      task={task}
      notes={{
        objective: 'Hellloooo',
        knowledge: (id) => {
          if (id === '1') return <span className="text-sm">Wowowowow</span>;
        },
      }}
    />
  );
};

export default WeatherInformation;
