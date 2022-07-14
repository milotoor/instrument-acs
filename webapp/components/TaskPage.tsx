import Head from 'next/head';
import React from 'react';

import { Item, Section, Task } from '../lib/task';
import { Link } from './Link';

type DataSectionProps = { heading: Section.Headings.List; task: Task } & RenderNoteListProp;
type ObjectiveSectionProps = { objective: string } & RenderNoteElementProp;
type ReferencesSectionProps = { references: string[] } & RenderNoteElementProp;
type SectionContainerProps = { children: React.ReactNode; heading: string };
type TaskPageProps = { task: Task; notes?: RenderNoteProps };

type RenderNoteListFunction = (id: Item.ID) => React.ReactNode | undefined;
type RenderNoteProps = Partial<{
  knowledge: RenderNoteListFunction;
  objective: React.ReactNode;
  references: React.ReactNode;
  risk: RenderNoteListFunction;
  skills: RenderNoteListFunction;
}>;

type RenderNoteElementProp = { note?: React.ReactNode };
type RenderNoteListProp = { notes?: RenderNoteListFunction };

export const TaskPage: React.FC<TaskPageProps> = ({ task, notes }) => {
  const { meta } = task;
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-16">
      <Head>
        <title>{meta.name}</title>
      </Head>

      <div className="fixed top-2 left-3 font-roboto text-lg">
        <Link href="/">← Home</Link>
      </div>

      <main className="flex flex-1 flex-col md:w-[1000px] px-4">
        <h3 className="text-xl md:text-2xl font-bold font-roboto-mono">
          Section {meta.section.numeral}. {meta.section.name}
        </h3>
        <h1 className="text-2xl md:text-4xl font-bold font-roboto-mono text-title -indent-12 pl-12 mt-2">
          Task {meta.letter}. {meta.name}
        </h1>

        <div>
          <ReferencesSection references={meta.references} note={notes?.references} />
          <ObjectiveSection objective={meta.objective} note={notes?.objective} />
          <DataSection heading="Knowledge" task={task} notes={notes?.knowledge} />
          <DataSection heading="Risk Management" task={task} notes={notes?.risk} />
          <DataSection heading="Skills" task={task} notes={notes?.skills} />
        </div>
      </main>
    </div>
  );
};

const acURI = (acNum: string) =>
  `https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_${acNum}.pdf`;

const farURIs = {
  61: 'https://www.law.cornell.edu/cfr/text/14/part-61',
  91: 'https://www.law.cornell.edu/cfr/text/14/part-91',
};

const referenceURIs = {
  '14 CFR part 61': farURIs[61],
  '14 CFR part 91': farURIs[91],
  'AC 00-45': acURI('00-45H'),
  'AC 00-6': acURI('00-6b'),
  'AC 120-108': acURI('120-108'),
  'AC 68-1': acURI('68-1'),
  'AC 91-74': acURI('91-74B'),
  'AC 91.21-1': acURI('91.21-1D'),
  'AIM': 'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/',
  'FAA-H-8083-2': 'https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf',
  'FAA-H-8083-3':
    'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/airplane_handbook/00_afh_full.pdf',
  'FAA-H-8083-15':
    'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/FAA-H-8083-15B.pdf',
  'FAA-H-8083-16':
    'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/instrument_procedures_handbook/FAA-H-8083-16B.pdf',
  'FAA-H-8083-25': 'https://www.faa.gov/sites/faa.gov/files/2022-03/pilot_handbook.pdf',
  'IFP': 'https://www.faa.gov/air_traffic/flight_info/aeronav/procedures/',
};

const referenceNames = {
  'AC 00-45': 'Aviation Weather Services',
  'AC 00-6': 'Aviation Weather',
  'AC 120-108': 'Continuous Descent Final Approach',
  'AC 68-1': 'Alternative Pilot Physical Examination and Education Requirements',
  'AC 91-74': 'Pilot Guide: Flight in Icing Conditions',
  'AC 91.21-1': 'Use of Portable Electronic Devices Aboard Aircraft',
  'FAA-H-8083-2': 'Risk Management Handbook',
  'FAA-H-8083-3': 'Airplane Flying Handbook',
  'FAA-H-8083-15': 'Instrument Flying Handbook',
  'FAA-H-8083-16': 'Instrument Procedures Handbook',
  'FAA-H-8083-25': 'PHAK',
  'IFP': 'Instrument Flight Procedures',
};

function objectHasProperty<T>(obj: T, prop: any): prop is keyof T {
  return prop in obj;
}

function ReferencesSection({ references, note }: ReferencesSectionProps) {
  return (
    <SectionContainer heading="References">
      {references.map((reference, i, arr) => {
        let name = reference;
        if (objectHasProperty(referenceNames, reference)) {
          if (reference.startsWith('AC')) {
            name = `${reference} (${referenceNames[reference]})`;
          } else {
            name = referenceNames[reference];
          }
        }

        let link: React.ReactNode = name;
        const linkColor = 'text-emerald-500';
        if (objectHasProperty(referenceURIs, reference)) {
          link = (
            <Link color={linkColor} href={referenceURIs[reference]}>
              {name}
            </Link>
          );
        } else if (reference === '14 CFR parts 61, 91') {
          link = (
            <span>
              14 CFR parts{' '}
              <Link color={linkColor} href={farURIs[61]}>
                61
              </Link>{' '}
              and{' '}
              <Link color={linkColor} href={farURIs[61]}>
                91
              </Link>
            </span>
          );
        }

        return (
          <span key={i}>
            {link}
            {i === arr.length - 1 ? '' : ', '}
          </span>
        );
      })}
      <NoteCard note={note} />
    </SectionContainer>
  );
}

function ObjectiveSection({ objective, note }: ObjectiveSectionProps) {
  return (
    <SectionContainer heading="Objective">
      {objective}
      <NoteCard note={note} />
    </SectionContainer>
  );
}

function DataSection({ heading, notes = () => null, task }: DataSectionProps) {
  const data = (() => {
    switch (heading) {
      case 'Knowledge':
        return task.knowledge;
      case 'Risk Management':
        return task.risk_management;
      case 'Skills':
        return task.skills;
    }
  })();

  const sorted = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  return (
    <SectionContainer heading={heading}>
      <ol className="list-decimal ml-8">
        {sorted.map(([num, datum]) => {
          // If the datum is not the beginning of a sub-list, render it
          if (typeof datum === 'string')
            return (
              <li key={num}>
                {datum}
                <NoteCard note={notes(num)} />
              </li>
            );

          // Otherwise we need to render the sublist
          const { general, specific } = datum;
          return (
            <li key={num}>
              {general}
              <ol className="list-alpha ml-8">
                {specific.map((text, i) => {
                  // Char code 97 is "a", 98 is "b", etc.
                  const itemId = num + String.fromCharCode(97 + i);
                  return (
                    <li key={i}>
                      {text}
                      <NoteCard note={notes(itemId)} />
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </SectionContainer>
  );
}

function SectionContainer({ children, heading }: SectionContainerProps) {
  return (
    <div className="pt-6">
      <div className="text-3xl font-fancy mb-2 text-fuchsia-500">{heading}</div>
      <div className="text-lg font-roboto-mono">{children}</div>
    </div>
  );
}

function NoteCard({ note }: RenderNoteElementProp) {
  if (!note) return null;
  return (
    <div className="w-full bg-white text-black p-2 my-5 rounded-lg shadow-[0px_5px_25px] shadow-yellow-400">
      {note}
    </div>
  );
}
