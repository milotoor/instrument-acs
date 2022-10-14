import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Gray,
  Image,
  Info,
  Link,
  Paragraph,
  SectionPage,
  Success,
  Term,
  Warning,
} from '../../components';
import { getStaticPropFns } from '../../server';

export const getStaticProps = getStaticPropFns.structure;
const ApproachProcedures: NextPage<SectionPage.TopLevelProps> = (props) => {
  return (
    <SectionPage
      {...props}
      number={6}
      note={[
        <>
          <Term>Instrument approach procedures (IAPs)</Term> are at the heart of instrument
          training. <Success>They are how we get on the ground safely</Success> and require a great
          deal of precision during one of the most critical phases of flight. The tasks in this
          section cover various aspects of IAPs; this page will discuss information and procedures
          that are applicable across multiple phases of the approach.
        </>,

        <Paragraph
          heading="CDI scaling"
          references={[
            <AIM paragraph={[1, 1, 17, 'b', 5, 'e', '3-5']} />,
            <Link.Reference reference="g1000" />,
          ]}
        >
          When using GPS as the active navigation source, the CDI scale varies depending on the
          phase of flight:
        </Paragraph>,

        <Image src="gps_cdi_scaling_phases" />,

        <>
          As seen above, the CDI changes scale several times during flight. What's most important
          here is how the scaling——and, thus, the meaning of full-scale deflection——changes during
          an approach. In particular:
          <BulletList type="disc">
            <>
              When 30nm from the departure airport, the scaling shifts from{' '}
              <Info>enroute mode (which has 2nm sensitivity)</Info> to{' '}
              <Info>terminal mode (1nm)</Info>. This scale ramp-down occurs over a distance of 1nm.
            </>
            <>
              When 2nm from the <Term>final approach fix (FAF)</Term>, the CDI scale changes
              gradually again to <Info>approach mode (1nm sensitivity)</Info>. This can sometimes be
              confusing:{' '}
              <Warning>
                if you are on a heading to intercept final approach at an angle which is shallower
                than the CDI scaling's taper, the CDI may indicate that you are drifting further
                from final approach when in fact you are getting closer!
              </Warning>{' '}
              For this reason, <AIM paragraph={[1, 1, 17, 'b', 5, 'e', '5']} /> says:{' '}
              <Gray italic>
                "requesting or accepting vectors which will cause the aircraft to intercept the
                final approach course within 2 NM of the FAWP is not recommended."
              </Gray>{' '}
              <div className="pt-3">
                In the G1000, this scaling should occur automatically once the approach procedure is
                activated or if vectors to final are selected.{' '}
                <Info>
                  The way in which the CDI scales in approach mode varies by the approach type:
                </Info>
              </div>
            </>
          </BulletList>
        </>,

        <Image.Row>
          <Image src="lnav_cdi_scaling">Typical LNAV and LNAV+V Approach CDI Scaling</Image>
          <Image src="lpv_cdi_scaling">Typical LNAV/VNAV, LPV, and LP Approach CDI Scaling</Image>
        </Image.Row>,

        <>
          Finally, the CDI scale shifts back to{' '}
          <Info>0.3nm when the missed approach is activated.</Info>
        </>,
      ]}
    />
  );
};

export default ApproachProcedures;
