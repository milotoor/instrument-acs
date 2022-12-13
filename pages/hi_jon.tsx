import React from 'react';

import { Image, Layout, NoteCard } from '../components';
import { ACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

export const getStaticProps = getStaticPropsFn;
const HiJon: ACS.Page = ({ rawData }) => {
  return (
    <Layout data={rawData} title="Hi, Jon!">
      <Layout.Title>Hi, JT!</Layout.Title>

      <Image.Row align="center">
        <NoteCard
          note={
            <div className="text-xl">
              <span>Hey Jon,</span>
              <div className="mt-6">
                My name is Milo and if you're reading this it's because I'm sitting across the table
                from you in your office on December 18th, 2022 for my instrument check ride.
              </div>
              <div className="mt-6">Thanks for scheduling the test. I hope I do well!!!</div>
              <div className="mt-6 ml-4">-- Milo</div>
            </div>
          }
        />
        <Image directory="misc" src="milo-wave" type="gif" />
      </Image.Row>
    </Layout>
  );
};

export default HiJon;
