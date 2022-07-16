import { NextPage } from 'next';
import React from 'react';

import { TaskPage, ReferenceLink } from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(1, 'B') },
});

const WeatherInformation: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
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
