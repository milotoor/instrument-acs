import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  Danger,
  Info,
  Italic,
  Link,
  Paragraph,
  Quotation,
  TaskPage,
  Term,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { uri } from '../../lib/references';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(6, 'E') },
});

const Landing: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        // Pilot responsibilities and landing factors
        k1: [
          <Paragraph heading="Meteorological factors" references={<AIM paragraph={[7, 1, 13]} />}>
            A crucial consideration on every IAP so <Term>flight visibility</Term> and{' '}
            <Term>runway visual range (RVR)</Term>.{' '}
            <Info>
              All approaches have a minimum visibility requirement, defined either in terms of
              statute miles or RVR (in meters).
            </Info>{' '}
            <Quotation source={['FAA', references.rvr_explainer]}>
              [RVR] is required to support precision landing and takeoff operations in the NAS. The
              system measures visibility, background luminance, and runway light intensity{' '}
              <Bold>
                to determine the [horizontal] distance a pilot should be able to see down the runway
              </Bold>
              ...Each RVR system consists of the following functional elements: Visibility Sensor,
              Ambient Light Sensor, Runway Light Intensity Monitor, Data Processing Unit and
              Controller Display(s). The RVR interfaces with the Automated Surface Observing System
              (ASOS), Enhanced Traffic Management System (ETMS), and Maintenance Processing System
              (MPS)...
              <Bold>
                The lowest authorized ILS minimums...are: (a) Category I Decision Height (DH) 200
                feet and RVR 2,400 feet (with touchdown zone and centerline lighting, RVR 1,800
                feet).
              </Bold>
            </Quotation>
            RVR values are computed by sensors mounted on poles near the runway which transmit light
            at a known intensity and measure the extent of dissipation.
          </Paragraph>,

          <Paragraph heading="Straight-In Approaches">
            A word of caution about the straight-in approach at non-towered airports:{' '}
            <Danger>be very careful to communicate clearly with VFR traffic in the pattern!</Danger>{' '}
            Per <Link.Reference reference="AC 90-66B" /> §9.5:{' '}
            <Italic>
              "The FAA encourages pilots to use the standard traffic pattern when arriving or
              departing a non-towered airport or a part-time-towered airport when the control tower
              is not operating,{' '}
              <Bold>
                particularly when other traffic is observed or when operating from an unfamiliar
                airport."
              </Bold>
            </Italic>{' '}
            (However, immediately following this excerpt they acknowledge that a visual approach at
            the end of an instrument approach is one such time when a straight-in may be desirable.)
          </Paragraph>,

          <>
            At none other than Watsonville airport (where I will meet my DPE for the instrument
            checkride) there was a{' '}
            <Link href={references.wvi_accident}>midair collision on 18 August, 2022</Link>,
            involving a very fast twin Cessna performing a straight-in approach and a 152 in the
            pattern. The 152 may have made an error in judgment by turning base in front of the
            twin, but it seems clear to me that the fault lies with the twin: (a) it elected to
            perform a straight-in approach with VFR traffic in the pattern, and (b) it was traveling
            at a blistering <Bold>180 knot groundspeed!!!</Bold> Regardless of whose fault it is,
            three people and a dog were lost...
          </>,
        ],
      }}
    />
  );
};

export default Landing;

const references = {
  rvr_explainer: uri.faa.nav_services('lsg/rvr'),
  wvi_accident: 'http://www.kathrynsreport.com/2022/08/cessna-340a-n740wj-fatal-accident.html',
};
