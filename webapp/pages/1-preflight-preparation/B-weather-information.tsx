import { NextPage } from 'next';
import React from 'react';

import { Link, TaskPage } from '../../components';
import { getTaskFromSectionLetter } from '../../lib/data_loaders';
import { acURI, referenceNames } from '../../lib/references';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({ props: getTaskFromSectionLetter(1, 'B') });

const WeatherInformation: NextPage<Task> = (task) => {
  return (
    <TaskPage
      task={task}
      notes={{
        knowledge(id) {
          switch (id) {
            case '3b':
              return <Link href={acURI('00-54')}>AC 00-54 ({referenceNames['AC 00-54']})</Link>;
            default:
              return null;
          }
        },
      }}
    />
  );
};

export default WeatherInformation;
