import { NextPage } from 'next';
import React from 'react';

import { Link, TaskPage, ReferenceLink } from '../../components';
import { getTaskFromSectionLetter } from '../../lib/data_loaders';
import { acURI, referenceNames } from '../../lib/references';
import { Task } from '../../lib/task';

export const getStaticProps = () => ({ props: getTaskFromSectionLetter(1, 'B') });

const WeatherInformation: NextPage<Task> = (task) => {
  return (
    <TaskPage
      task={task}
      flags={{ '3i': 'missed' }}
      notes={{
        knowledge(id) {
          switch (id) {
            case '3b':
              return <ReferenceLink reference="AC 00-54" />;
            default:
              return null;
          }
        },
      }}
    />
  );
};

export default WeatherInformation;
