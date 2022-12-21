import React from 'react';

import { AIM, FAR, Layout, Link, NoteCard } from '../components';
import { aim } from '../data';
import { ACS, ChildProp, uri } from '../lib';
import { getStaticPropsFn } from '../ssr';

type NotableAIMChapter = keyof typeof notableAIMParagraphs;
type NotableAIMProps = { chapter: NotableAIMChapter };
type NotableFARsProps = { part: keyof typeof notableFARs };
type ReferenceRowProps = { reference: React.ReactNode; name: string };

const notableFARs = {
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
    [123, 'Compliance with ATC clearances and instructions'],
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
} as const;

const notableAIMParagraphs = {
  1: {
    1: [3, 4, 8, 9, 17, 18],
    2: [1, 2, 3],
  },
  2: {
    1: [2, 6],
    3: [3, 4, 5],
  },
  3: {
    1: [4],
  },
  4: {
    1: [19, 20],
    3: [3, 21],
    4: [1, 3, 7, 8, 11, 14],
    5: [1, 7],
  },
  5: {
    1: [2, 6, 15, 16],
    2: [3, 6, 7, 9],
    3: [2, 4, 6, 8],
    4: [1, 5, 6, 7, 9, 20, 21, 23],
    5: [4, 5, 8, 13, 14, 16],
  },
  6: {
    1: [1],
    2: [4],
    4: [1],
  },
  7: {
    1: [4, 13, 24, 26, 28],
    2: [2, 3],
    3: [1, 5],
    6: [15],
  },
  8: {
    1: [5, 6],
  },
};

export const getStaticProps = getStaticPropsFn;
const FARQuickReference: ACS.Page = ({ rawData }) => {
  return (
    <Layout data={rawData} title="Regulatory Quick Reference">
      <Layout.Title>Regulatory Quick Reference</Layout.Title>

      <div className="pt-4">
        This page provides rapid access to some of the most commonly-cited passages in the FAR/AIM
        and other FAA publications.
      </div>

      <div className="text-subtitle my-8">FARs</div>
      <NotableFARs part={61} />
      <NotableFARs part={91} />

      <div className="text-subtitle">AIM</div>
      {Object.keys(notableAIMParagraphs).map((chapter) => (
        <NotableAIM chapter={+chapter as NotableAIMChapter} />
      ))}
    </Layout>
  );
};

export default FARQuickReference;

function NotableFARs({ part }: NotableFARsProps) {
  return (
    <NoteCard
      label={`Part ${part}`}
      padding="lg"
      note={
        <ReferenceTable>
          {notableFARs[part].map(([section, title]) => (
            <ReferenceRow
              key={section}
              reference={<FAR section={[part, section]} />}
              name={title}
            />
          ))}
        </ReferenceTable>
      }
    />
  );
}

function NotableAIM({ chapter }: NotableAIMProps) {
  const chapterTitle = aim[chapter].name;
  return (
    <NoteCard
      label={`Chapter ${chapter}: ${chapterTitle}`}
      padding="lg"
      note={
        <>
          {Object.entries(notableAIMParagraphs[chapter]).map(([sectionStr, paragraphs]) => {
            const section = +sectionStr;
            const aimSection = aim[chapter][section];
            return (
              <div className="pt-4 first:pt-2" key={section}>
                <Link
                  className="max-w-full font-bold block -indent-3 pl-3"
                  href={uri.aim(chapter, section)}
                >
                  Section {section}: {aimSection.name}
                </Link>
                <div className="ml-6">
                  <ReferenceTable>
                    {paragraphs.map((paragraph) => (
                      <ReferenceRow
                        key={section}
                        reference={<AIM paragraph={[chapter, section, paragraph]} />}
                        name={aimSection[paragraph]}
                      />
                    ))}
                  </ReferenceTable>
                </div>
              </div>
            );
          })}
        </>
      }
    />
  );
}

function ReferenceTable({ children }: ChildProp) {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
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
