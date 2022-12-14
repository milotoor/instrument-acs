import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  FAR,
  Image,
  Info,
  Link,
  Paragraph,
  Quotation,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { ACS, referenceURIs, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Landing: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={6}
      task="E"
      notes={{
        // Pilot responsibilities and landing factors
        k1: [
          <Paragraph
            heading="Meteorological factors"
            references={[<AIM paragraph={[7, 1, 13]} />, <FAR section="91.175" paragraph="h" />]}
          >
            A crucial consideration on every IAP so <Term>flight visibility</Term> and{' '}
            <Term>runway visual range (RVR)</Term>.{' '}
            <Info>
              All approaches have a minimum visibility requirement, defined either in terms of
              statute miles or RVR (in meters).
            </Info>
          </Paragraph>,

          <Quotation
            source={[
              'FAA, "Lighting Systems — Runway Visual Range (RVR)"',
              references.rvr_explainer,
            ]}
          >
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
            <FAR section="91.175" paragraph="h" />{' '}
            <Info>
              If RVR equipment is inoperative, an approach's minimum RVR requirement may be met by
              converting to ground visibility.
            </Info>{' '}
            2,400 RVR should be converted to ½SM.
          </>,

          <Paragraph heading="Landing requirements" references={<FAR section="91.175" />}>
            There are three requirements that must be met prior to descending below MDA or DA:
            <BulletList type="decimal">
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
            <BulletList type="decimal">
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
            check ride) there was a{' '}
            <Link href={references.wvi_accident}>midair collision on 18 August, 2022</Link>,
            involving a very fast twin Cessna performing a straight-in approach and a 152 in the
            pattern. The 152 may have made an error in judgment by turning base in front of the
            twin, but it seems clear to me that the fault lies with the twin: (a) it elected to
            perform a straight-in approach with VFR traffic in the pattern, and (b) it was traveling
            at a blistering <Bold>180 knot groundspeed!!!</Bold> Regardless of whose fault it is,
            three people and a dog were lost...
          </>,
        ],
        k2: [
          <Paragraph
            heading="Visual glideslope indicators"
            references={<AIM paragraph={[2, 1, 2]} />}
          >
            When transitioning to the visual segment of the approach (below MDA/DA) be on the
            lookout for a <Term>visual glideslope indicator (VGSI)</Term>. The two canonical VGSI
            systems are the <Term>precision approach path indicator (PAPI)</Term> and the{' '}
            <Term>visual approach slope indicator (VASI)</Term> (though there are others as well,
            such as the{' '}
            <Bold>
              <span className="text-amber-700">tri</span>
              <span className="text-green-600">-co</span>
              <span className="text-red-600">lor</span>
            </Bold>
            , <PVASI /> and{' '}
            <Bold>
              el<sub>em</sub>ent-ali<sup>gnm</sup>ent
            </Bold>{' '}
            systems). These lighting systems are located on one side of the runway, usually the left
            (though large, 12- or 16-bar VASI systems may occupy both sides).{' '}
            <Info>These systems usually indicate a 3° glideslope.</Info>
          </Paragraph>,

          <Image src="vgsi" type="svg">
            OLS refers to the <Link href={references.ols}>optical landing system</Link> which is
            used aboard aircraft carriers
          </Image>,

          <Quotation source={<AIM paragraph={[2, 1, 2, 'a/b']} />}>
            The visual glide path of the VASI provides safe obstruction clearance within plus or
            minus 10 degrees of the extended runway centerline and to 4 NM from the runway
            threshold.... The visual glide path of the PAPI typically provides safe obstruction
            clearance within plus or minus 10 degrees of the extended runway centerline and to 3.4
            NM from the runway threshold.
          </Quotation>,

          <>
            If the PAPI lights are flashing <Danger>do not land!</Danger> This is an element of the{' '}
            <Term>runway status light (RWSL) system</Term> (formerly called the{' '}
            <Term>final approach runway occupancy signal (FAROS)</Term>).{' '}
            <Warning>
              The flashing PAPI indicates that the runway is occupied by another aircraft or ground
              vehicle and it is unsafe to land.
            </Warning>{' '}
            See <AIM paragraph={[2, 1, 6]} />.
          </>,
        ],
      }}
    />
  );
};

export default Landing;

function PVASI() {
  const textRed = 'text-red-600 bg-white';
  const textWhite = 'text-white bg-red-600';
  return (
    <Bold>
      <span className={textRed}>p</span>
      <span className={textWhite}>u</span>
      <span className={textRed}>l</span>
      <span className={textWhite}>s</span>
      <span className={textRed}>a</span>
      <span className={textWhite}>t</span>
      <span className={textRed}>i</span>
      <span className={textWhite}>n</span>
      <span className={textRed}>g</span>
    </Bold>
  );
}

const references = {
  landing_references: uri.boldMethod.blog(
    'lists',
    '2022',
    '03',
    'approved-visual-references-instrument-approach-landing-fars-10-items'
  ),
  ols: uri.wikipedia('Optical_landing_system'),
  rvr_explainer: uri.faa.nav_services('lsg/rvr'),
  wvi_accident: 'http://www.kathrynsreport.com/2022/08/cessna-340a-n740wj-fatal-accident.html',
};
