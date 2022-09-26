import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  FAR,
  Info,
  Link,
  Paragraph,
  Quotation,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { referenceURIs, uri } from '../../lib/references';

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
          <Paragraph
            heading="Meteorological factors"
            references={[<AIM paragraph={[7, 1, 13]} />, <FAR section={[91, 175, 'h']} />]}
          >
            A crucial consideration on every IAP so <Term>flight visibility</Term> and{' '}
            <Term>runway visual range (RVR)</Term>.{' '}
            <Info>
              All approaches have a minimum visibility requirement, defined either in terms of
              statute miles or RVR (in meters).
            </Info>
          </Paragraph>,

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
              The lowest authorized ILS minimums...are: (a) Category I Decision Height (DH) 200 feet
              and RVR 2,400 feet (with touchdown zone and centerline lighting, RVR 1,800 feet).
            </Bold>
          </Quotation>,

          <>
            RVR values are computed by sensors mounted on poles near the runway which transmit light
            at a known intensity and measure the extent of dissipation. Per{' '}
            <FAR section={[91, 175, 'h']} />{' '}
            <Info>
              If RVR equipment is inoperative, an approach's minimum RVR requirement may be met by
              converting to ground visibility.
            </Info>{' '}
            2,400 RVR should be converted to ½SM.
          </>,

          <Paragraph heading="Landing requirements" references={<FAR section={[91, 175]} />}>
            There are three requirements that must be met prior to descending below MDA or DA:
            <BulletList>
              <>
                The aircraft must be{' '}
                <Info>
                  continuously in a position to land (on the intended runway) using a normal rate of
                  descent and normal maneuvers.
                </Info>{' '}
                Part 121 and 135 operators must additionally land in the touchdown zone.
              </>
              <>
                The <Info>required flight visibility is present</Info>
              </>
              <>
                One or more of the following 10 references is <Info>visible and identifiable</Info>{' '}
                to the pilot:
                <BulletList type="square">
                  <>
                    Approach light system. This one is special:{' '}
                    <Warning>
                      with only the approach lights in view, you may only descend to 100 feet above{' '}
                      <Term>touchdown zone elevation (TDZE)</Term>
                    </Warning>{' '}
                    <Bold italic>UNLESS</Bold> the <Danger>red terminating bars</Danger> or the{' '}
                    <Danger>red side row bars</Danger> (only present for ALSF-1 and ALSF-2 systems)
                    are also distinctly visible and identifiable (in which case you may descend to
                    land)
                  </>
                  <>Runway threshold</>
                  <>Threshold markings</>
                  <>
                    Threshold lights (the <Success>green row of lights</Success> at the runway
                    threshold)
                  </>
                  <>
                    Runway end identifier lights (REILs; the two blinking white lights on either
                    side of the threshold)
                  </>
                  <>Visual glideslope indicator (i.e. VASI or PAPI)</>
                  <>Touchdown zone or touchdown zone markings</>
                  <>Touchdown zone lights</>
                  <>Runway or runway markings</>
                  <>Runway lights</>
                </BulletList>
                <div className="pt-3">
                  See this <Link href={references.landing_references}>Boldmethod article</Link> for
                  illustrations of each item
                </div>
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Landing hazards">
            There are a whole host of hazards particular to the approach and landing phase of
            flight. These include:
            <BulletList>
              <>
                <Bold>Wake turbulence</Bold>: this is a significant concern whenever landing behind
                (or taking off after) a larger aircraft. When an aircraft is{' '}
                <Warning>heavy, clean and slow</Warning> it generates significant wing tip vortices.
                Flying into these vortices at low altitude can cause dramatic and unrecoverable
                upsets. To avoid this, light aircraft should{' '}
                <Success>land beyond the touchdown point</Success> and{' '}
                <Success>rotate/lift off prior to the rotation point</Success> of larger aircraft in
                front. <Warning>Light, quartering tailwinds</Warning> tend to keep the upwind vortex
                over the runway and in the landing zone.
              </>
              <>
                <Bold>Hydroplaning</Bold>: this is caused by{' '}
                <Info>standing water on the runway</Info> and is exacerbated by excessive speed.
                Smooth runways are more vulnerable than grooved ones. When hydroplaning, the wheels
                are not in touch with the ground even though the aircraft is not flying; hence,{' '}
                <Danger>braking and directional control are virtually nonexistent</Danger>.
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Straight-in approaches">
            A word of caution about the straight-in approach at non-towered airports:{' '}
            <Danger>be very careful to communicate clearly with VFR traffic in the pattern!</Danger>
          </Paragraph>,

          <Quotation source={['AC 90-66B §9.5', referenceURIs['AC 90-66B']]}>
            The FAA encourages pilots to use the standard traffic pattern when arriving or departing
            a non-towered airport or a part-time-towered airport when the control tower is not
            operating,{' '}
            <Bold>
              particularly when other traffic is observed or when operating from an unfamiliar
              airport.
            </Bold>
          </Quotation>,

          <>
            Immediately following this excerpt, however, it is acknowledged that a visual approach
            at the end of an instrument approach is one such time when a straight-in may be
            desirable.
          </>,

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
  landing_references: uri.boldMethod.blog(
    'lists',
    '2022',
    '03',
    'approved-visual-references-instrument-approach-landing-fars-10-items'
  ),
  rvr_explainer: uri.faa.nav_services('lsg/rvr'),
  wvi_accident: 'http://www.kathrynsreport.com/2022/08/cessna-340a-n740wj-fatal-accident.html',
};
