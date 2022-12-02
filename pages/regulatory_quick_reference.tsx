import React from 'react';

import { BulletList, Layout, NoteCard } from '../components';
import { ACS, useACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

export const getStaticProps = getStaticPropsFn;
const FARQuickReference: ACS.Page = ({ rawData }) => {
  const acsData = useACS(rawData);
  return (
    <Layout acs={acsData} title="Regulatory Quick Reference">
      <h1 className="text-title text-glow-gold">Regulatory Quick Reference</h1>

      <div className="pt-4">
        This page provides rapid access to some of the most commonly-cited passages in the FAR/AIM
        and other FAA publications.
      </div>

      <BulletList type="disc">
        <>FAR 61.51 -- Pilot logbooks</>
        <>FAR 91.105 -- Required equipment</>
        <>FAR 91.109 -- Flight instruction; Simulated instrument flight and certain flight tests</>
      </BulletList>
    </Layout>
  );
};

export default FARQuickReference;
