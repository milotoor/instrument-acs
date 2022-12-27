import React from 'react';

import { Bold, Layout, Link, NoteCard, Paragraph } from '../components';
import { ACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

type ResourceSectionProps = { label: string; resources: Resource[] };
type Resource = { title: string; uri: string; summary: React.ReactNode };

const youtube_playlist = (id: string) => `https://www.youtube.com/playlist?list=${id}`;
const references = {
  boldmethod_live: youtube_playlist('PLOj66yRmYgTV_XwFiS8tw9GMcjlVbdUS6'),
  code_7700: 'https://www.code7700.com/doa_strategy.htm',
  flight_insight: youtube_playlist('PLWCnp9tjvIPfgCAysvaUdcqqqdd4VhICb'),
  the_finer_points: youtube_playlist('PLKUseji879jPGPjkl2Ho22TNF91_rZsoT'),
  vsl_aviation: youtube_playlist('PLPXQn2xPjpDf-EilZNCGy7REsOKE-wkx6'),
};

const readings: Resource[] = [
  {
    title: 'IFR Procedures: A Pilot-Friendly Manual',
    uri: 'https://pilotworkshop.com/products/ifr-procedures-pfm/',
    summary: (
      <>
        this is a fantastic catalogue of practical tips for flying IFR. It assumes the reader
        already has some knowledge of instrument flying, so it may not be the best resource for a
        brand new instrument student. It takes the reader through every phase of an IFR flight,
        discusses the challenges faced in each, what to be mindful of, what you can do, what you
        definitely shouldn't do, and so on. An easy to read, informational document.
      </>
    ),
  },
  {
    title: 'IFR Magazine',
    uri: 'https://www.ifr-magazine.com/',
    summary: (
      <>
        This is one terrific magazine. One issue per month, each packed with articles to improve
        your understanding of IFR flying. Just about every issue has something new to share about
        ATC, seasonal weather, peculiar charts, etc. Most articles are behind a paywall, but
        compared to the cost of a CFII's time it's an absolute steal.
      </>
    ),
  },
  {
    title: 'Boldmethod',
    uri: 'https://www.boldmethod.com/',
    summary: (
      <>
        Whenever I find myself wondering about some nuance of IFR flying, I google it and inevitably
        Boldmethod shows up in the results. They've got TONS of published articles for students and
        aviators of all stripes. I also highly recommend their YouTube channel, and in particular
        their <Link href={references.boldmethod_live}>"Boldmethod Live"</Link> playlist in which
        they take deep-dives into select subjects. These folks have flown throughout the NAS and
        have lots to teach.
      </>
    ),
  },
  {
    title: 'Code 7700',
    uri: 'https://www.code7700.com/',
    summary: (
      <>
        This is a fun website with plenty of opinionated articles on all kinds of topics. It's not
        my first resource when trying to learn a new subject, but it's definitely a go-to when I
        want the nitty-gritty details. The author, James Albright, makes many references to
        regulatory documents, so the opinions are at least informed. See, for instance, the thorough
        discussion of <Link href={references.code_7700}>departure procedures</Link>.
      </>
    ),
  },
];

const watchings: Resource[] = [
  {
    title: 'Seth Lake / VSL Aviation',
    uri: 'https://www.youtube.com/@SethLakeDPE',
    summary: (
      <>
        Seth is a DPE and knows IFR flying inside and out. His{' '}
        <Link href={references.vsl_aviation}>"Instrument Pilot ACS"</Link> playlist is mandatory
        viewing for instrument trainees. In over 3 hours of material he walks through the ACS bit by
        bit to discuss what the standard is, what the DPE will be looking for and what you can do to
        prepare. <Bold>This is a MUST WATCH!!</Bold>
      </>
    ),
  },
  {
    title: 'FlightInsight',
    uri: 'https://www.youtube.com/@flightinsight9111',
    summary: (
      <>
        Two videos per week and they're frequently on relevant IFR topics. In particular, check out
        the <Link href={references.flight_insight}>"IFR Training"</Link> playlist. The videos are
        accessible, bite-size and instructional.
      </>
    ),
  },
  {
    title: 'The Finer Points',
    uri: 'https://www.youtube.com/@TheFinerPoints',
    summary: (
      <>
        Jason Miller introduces himself in every episode: "a full time, professional flight
        instructor." He brings you "tips and tricks that [he's] learned from 20 years on the flight
        line." The majority of his videos are not specific to IFR but still packed with useful info.
        Check out the <Link href={references.the_finer_points}>"Instrument Flight Training"</Link>{' '}
        playlist.
      </>
    ),
  },
];

const listenings: Resource[] = [
  {
    title: 'Opposing Bases',
    uri: 'https://www.opposingbases.com/',
    summary: (
      <>
        Two air traffic controllers (who are both also pilots) talk about miscellaneous aspects of
        the ATC system. They're highly entertaining to listen to and have a very deep familiarity
        with the NAS. I have learned a great deal about what goes on the other side of the mic from
        them.
      </>
    ),
  },
  {
    title: "Max Trescott's Aviation News Talk podcast",
    uri: 'https://aviationnewstalk.com/',
    summary: (
      <>
        Max was the National CFI of the Year in 2008. His podcast is superb and safety-oriented. Not
        every episode will be relevant to IFR flying but I learn something every time regardless.
      </>
    ),
  },
];

export const getStaticProps = getStaticPropsFn;
const Resources: ACS.Page = ({ rawData }) => {
  return (
    <Layout data={rawData} title="Resources">
      <Layout.Title>Resources</Layout.Title>

      <div className="pt-4">
        This page provides links to resources that I found useful during my instrument training.
        These include books, YouTube channels, official publications and more.
      </div>

      <ResourceSection label="Reading" resources={readings} />
      <ResourceSection label="Watching" resources={watchings} />
      <ResourceSection label="Listening" resources={listenings} />
    </Layout>
  );
};

export default Resources;

function ResourceSection({ label, resources }: ResourceSectionProps) {
  return (
    <NoteCard
      className="my-10"
      label={label}
      note={resources.map(({ summary, title, uri }, i) => (
        <Paragraph hr={i > 0}>
          <div className="-indent-2 ml-2">
            <Link bold href={uri}>
              {title}
            </Link>
            : {summary}
          </div>
        </Paragraph>
      ))}
    />
  );
}
