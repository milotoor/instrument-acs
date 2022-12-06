import React from 'react';

import { FAR, Layout, NoteCard } from '../components';
import { ACS, useACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

type ReferenceRowProps = { reference: React.ReactNode; name: string };

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

      <NoteCard
        note={
          <>
            <table>
              <thead>
                <tr>
                  <th scope="col">Reference</th>
                  <th scope="col" className="text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <ReferenceRow reference={<FAR section={[61, 51]} />} name="Pilot logbooks" />
                <ReferenceRow
                  reference={<FAR section={[91, 109]} />}
                  name="Flight instruction; Simulated instrument flight and certain flight tests"
                />
                <ReferenceRow
                  reference={<FAR section={[91, 185]} />}
                  name="IFR operations: Two-way radio communications failure"
                />
                <ReferenceRow reference={<FAR section={[91, 205]} />} name="Required equipment" />
              </tbody>
            </table>
          </>
        }
      />
    </Layout>
  );
};

export default FARQuickReference;

function ReferenceRow({ name, reference }: ReferenceRowProps) {
  return (
    <tr>
      <th scope="row" className="pr-10">
        {reference}
      </th>
      <td>{name}</td>
    </tr>
  );
}
