import React from 'react';

import { FAR, Layout, NoteCard } from '../components';
import { ACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

type FARIdentifiers = [number, string];
type NotableFARsProps = { part: keyof typeof notableFARs };
type ReferenceRowProps = { reference: React.ReactNode; name: string };

const notableFARs: Record<number, FARIdentifiers[]> = {
  61: [
    [3, 'Requirement for certificates, ratings, and authorizations'],
    [23, 'Medical certificates: Requirement and duration'],
    [51, 'Pilot logbooks'],
    [57, 'Recent flight experience: Pilot in command'],
    [65, 'Instrument rating requirements'],
    [113, 'Private pilot privileges and limitations: Pilot in command'],
    [195, 'Flight instructor limitations and qualifications'],
  ],
  91: [
    [3, 'Responsibility and authority of the pilot in command'],
    [103, 'Preflight action'],
    [109, 'Flight instruction; Simulated instrument flight and certain flight tests'],
    [155, 'Basic VFR weather minimums'],
    [167, 'Fuel requirements for flight in IFR conditions'],
    [169, 'IFR flight plan: Information required'],
    [171, 'VOR equipment check for IFR operations'],
    [173, 'ATC clearance and flight plan required'],
    [175, 'Takeoff and landing under IFR'],
    [177, 'Minimum altitudes for IFR operations'],
    [185, 'IFR operations: Two-way radio communications failure'],
    [205, 'Instrument and equipment requirements'],
    [211, 'Supplemental oxygen'],
    [213, 'Inoperative instruments and equipment'],
    [215, 'ATC transponder and altitude reporting equipment and use'],
    [225, 'Automatic Dependent Surveillance-Broadcast (ADS-B) Out equipment and use'],
    [409, 'Inspections'],
    [411, 'Altimeter system and altitude reporting equipment tests and inspections'],
    [413, 'ATC transponder tests and inspections'],
    [417, 'Maintenance records'],
  ],
};

export const getStaticProps = getStaticPropsFn;
const FARQuickReference: ACS.Page = ({ rawData }) => {
  return (
    <Layout data={rawData} title="Regulatory Quick Reference">
      <h1 className="text-title text-glow-gold">Regulatory Quick Reference</h1>

      <div className="pt-4">
        This page provides rapid access to some of the most commonly-cited passages in the FAR/AIM
        and other FAA publications.
      </div>

      <NotableFARs part={61} />
      <NotableFARs part={91} />
    </Layout>
  );
};

export default FARQuickReference;

function NotableFARs({ part }: NotableFARsProps) {
  return (
    <div className="my-8">
      <NoteCard
        label={`Part ${part}`}
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
                {notableFARs[part].map(([section, title]) => (
                  <ReferenceRow
                    key={section}
                    reference={<FAR section={[part, section]} />}
                    name={title}
                  />
                ))}
              </tbody>
            </table>
          </>
        }
      />
    </div>
  );
}

function ReferenceRow({ name, reference }: ReferenceRowProps) {
  return (
    <tr>
      <th scope="row" className="pr-10 text-left whitespace-nowrap align-top">
        {reference}
      </th>
      <td>{name}</td>
    </tr>
  );
}
