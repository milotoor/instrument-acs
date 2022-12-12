import * as React from 'react';

import {
  Bold,
  BulletList,
  Danger,
  Layout,
  Link,
  NoteCard,
  Success,
  Term,
  Warning,
} from '../components';
import { ACS, ChildProp, uri } from '../lib';
import { getStaticPropsFn } from '../ssr';

type FAQCardProps = ChildProp & { question: string };

export const getStaticProps = getStaticPropsFn;
const Home: ACS.Page = ({ rawData }) => {
  return (
    <Layout data={rawData} title="The Instrument ACS">
      <div className="max-w-[800px]">
        <h1 className="text-center sm:text-left text-7xl font-bold font-fancy pt-5 pb-10">
          The{' '}
          <Link className="text-glow-gold" href={references.acs}>
            Instrument ACS
          </Link>
        </h1>

        <NoteCard
          note={[
            <FAQ question="What is this?">
              Hi! My name is Milo. I am an FAA-certificated private pilot. For most of 2022 I have
              been studying <Term>attitude instrument flying</Term>, with the goal of adding an{' '}
              <Term>instrument rating</Term> to my pilot license. The final exam for this rating,
              colloquially called the "instrument check ride", is an oral and practical exam in
              which I will demonstrate to an FAA-certified{' '}
              <Term>designated pilot examiner (DPE)</Term> that I am sufficiently knowledgeable
              about and capable of instrument flying. This exam is graded according to rubric known
              as the{' '}
              <Link bold href={references.acs}>
                Instrument Airman Certification Standards (ACS)
              </Link>
              . This website is my attempt to prepare for the check ride in a comprehensive and
              shareable way.
            </FAQ>,

            <FAQ question="What is the ACS?">
              The Airmen Certification Standards is the rubric by which pilots are graded when they
              take their check ride (see link above). It is an official document published by the
              FAA which prescribes what knowledge and skills applicants must demonstrate in order to
              pass the test. In the instrument ACS there are 8 sections (known as "Areas of
              Operation"), each with between 1 and 5 subtasks. This website is oriented around these
              sections and subtasks; they can be accessed using the table of contents in the main
              menu.
            </FAQ>,

            <FAQ question="Who is this for?">
              Principally, myself. This has been a several-month-long project to catalogue and
              organize all of the information I want to know for my check ride in December 2022. The
              check ride consists of an oral portion and a flight portion. During the oral portion I
              will have access to notes; these are my notes.
              <div className="pt-3">
                These notes are also for other students to use and learn from, should they so
                desire. However, anyone who uses this site should understand that{' '}
                <Warning>I am not a CFII nor an instrument ground instructor!</Warning> The
                information presented on this website has been procured from various sources, many
                of which are explicitly cited where appropriate. HOWEVER, my own opinions and
                preferences are also presented here, and it is left to the reader to determine which
                information is fact or fiction. <Success>Use the cited sources</Success> and{' '}
                <Danger>trust me at your own peril!</Danger>
              </div>
            </FAQ>,

            <FAQ question="But ____ is clearly wrong...">
              Did I get something blatantly incorrect? Am I over-simplifying and/or missing some
              nuance? Yes, I probably am. I remind the reader that I am only a student! Importantly,{' '}
              <Bold>this project was developed in the fall/winter of 2022.</Bold> However, the FARs
              and ACS are evolving documents. It's unclear to me at this time how much effort it
              will be to maintain this resource into the future: how often will the FAR/AIM change
              substantively? How often do sections/paragraphs get renumbered? The answers to these
              will have a profound impact on the maintainability of the website, and I just don't
              know yet.
              <div className="pt-3">
                If you see something that is clearly wrong (or which could use more
                elaboration/discussion), please let me know! There are two great ways to do that, in
                order of preference:
                <BulletList type="decimal">
                  <>
                    Open an <Link href={references.github.issues}>issue</Link> (or, better yet, a{' '}
                    <Link href={references.github.pull_requests}>pull request</Link>) on GitHub.
                    This will require you to have a GitHub account.
                  </>
                  <>
                    Contact me using the <Link href="/contact">contact form</Link>
                  </>
                </BulletList>
              </div>
            </FAQ>,
          ]}
        />
      </div>
    </Layout>
  );
};

export default Home;

function FAQ({ children, question }: FAQCardProps) {
  return (
    <>
      <div className="text-2xl font-fancy text-blue-500">{question}</div>
      <div className="mt-2">{children}</div>
    </>
  );
}

const references = {
  acs: 'https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf',
  github: {
    issues: uri.github('issues'),
    pull_requests: uri.github('pulls'),
  },
};
