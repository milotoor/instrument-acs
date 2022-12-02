import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  FAR,
  Gray,
  Info,
  InlineList,
  Italic,
  Link,
  Paragraph,
  Quotation,
  ReferenceList,
  Success,
  TaskPage,
  Term,
  Warning,
} from '../../components';
import { ACS, uri } from '../../lib';
import { getStaticPropsFn } from '../../ssr';

export const getStaticProps = getStaticPropsFn;
const Compliance: ACS.Page = (props) => {
  return (
    <TaskPage
      {...props}
      section={3}
      task="A"
      notes={{
        k1: [
          <>
            During normal IFR operations, a clearance is required for nearly all navigation. Taxi,
            takeoff, SID navigation, climbing, tracking courses, holding, descending, flying an
            approach and landing all require a clearance. Some clearances are more lenient than
            others (e.g. a descent at pilot's discretion, or the rare cruise clearance) and offer
            pilots more options in their execution.
          </>,

          <>
            It is essential for pilots and controllers to share a common understanding of a
            clearance.{' '}
            <Info>It is the agreement between parties about how the flight will proceed.</Info> This
            is why the readback is so important. The readback should be very clearly communicated,
            using standard phraseology.{' '}
            <Success>
              If you missed writing down a single item from the clearance, ask for that to be
              repeated before the complete readback.
            </Success>{' '}
            This way your readback can be delivered as one smooth statement, without interruptions
            or interjections about what you did not copy, thereby aiding comprehension on both sides
            of the mic.
          </>,

          <Paragraph heading="The structure of a clearance">
            Every IFR pilot is introduced to the <Bold>CRAFT</Bold> acronym early on:
            <BulletList type="disc">
              <>
                <Bold>C</Bold>learance limit: this is usually your destination airport
              </>
              <>
                <Bold>R</Bold>oute: the path you are expected to take to the clearance limit. This
                can include a large variety of instructions, including{' '}
                <InlineList logic={null}>
                  <>SIDs</>
                  <>VORs</>
                  <>victor/tango airways</>
                  <>GPS fixes</>
                  <>radar vectors</>
                </InlineList>{' '}
                and so on, or it could be as simple as "as filed."
              </>
              <>
                <Bold>A</Bold>ltitude: your assigned cruise altitude. Sometimes this will be a
                simple "climb maintain" instruction, other times it'll include a "expect X 5 [or 10]
                minutes after departure."
              </>
              <>
                <Bold>F</Bold>requency: the departure control or center frequency to contact once
                airborne. I'm not sure why this one frequency is provided ahead of time while all
                others are given upon hand-off to the neighboring sector/facility; perhaps to reduce
                the workload during a very stressful phase of flight?{' '}
                <Info>This may be omitted if your clearance includes a SID.</Info>
              </>
              <>
                <Bold>T</Bold>ransponder: your squawk code.
              </>
            </BulletList>
          </Paragraph>,

          <Paragraph heading="Void times" references={<AIM paragraph={[5, 2, 7, 'a', 1]} />}>
            A clearance void time may be received at a non-towered airport. This will include:
            <BulletList type="disc">
              <>
                <Bold>The current time</Bold>, just to make sure everyone is on the same page
              </>
              <>
                <Bold>The release time</Bold>, at which point you are authorized to deport
              </>
              <>
                <Bold>The void time</Bold>, beyond which your clearance is void and you must receive
                a new one before taking off. However, you can wait to check in with ATC when you're
                in a stable climb. <Danger>Never depart after the void time!</Danger> The AIM
                confusingly states{' '}
                <Gray italic>
                  "other IFR traffic for the airport where the clearance is issued is suspended
                  until the aircraft has contacted ATC or until 30 minutes after the clearance void
                  time"
                </Gray>{' '}
                as well as{' '}
                <Gray italic>
                  "pilots who depart at or after their clearance void time are not afforded IFR
                  separation."
                </Gray>{' '}
                Intuitively that sounds like separation <Italic>would be</Italic> guaranteed if you
                depart within 30 minutes after the void time. Regardless, you would be in violation
                of <FAR section={[91, 173]} /> so just don't.
              </>
              <>
                <Bold>The "if not off by" time</Bold>, beyond which ATC will initiate search and
                rescue
              </>
            </BulletList>
          </Paragraph>,
        ],
        k2: (
          <>
            In an emergency, the PIC is given authority to deviate from the rules set forth in the
            FARs, as well as instructions provided by ATC in clearances, to the extent required by
            the emergency. <FAR section={[91, 3]} /> provides the regulatory basis for this
            authority:{' '}
            <Quotation inline>
              The pilot in command of an aircraft is directly responsible for, and is the final
              authority as to, the operation of that aircraft.
            </Quotation>
          </>
        ),
        k3: (
          <>
            For lost comms procedures see <Link.Task section={7} task="A" id="k1" />
          </>
        ),
        s1: [
          <>
            <Success>Be ready to copy down the clearance the first time you call ATC.</Success>{' '}
            Prior to the call, jot down your expected clearance in the typical CRAFT format; this
            makes for less writing when receiving the clearance. However,{' '}
            <Warning>be wary of confirmation bias!</Warning> It's very easy for the brain to hear
            what it expects instead of what is said.
          </>,

          <Paragraph heading="Obtaining a clearance">
            There are a variety of different situations when you might need to obtain a clearance.
            This context has implications for how to receive the clearance as well as what the
            clearance might look like.
          </Paragraph>,

          <>
            <Bold>At a towered airport</Bold> you will usually get your clearance either from{' '}
            <Term>clearance delivery (CD)</Term> or ground control. Class B and C airports always
            have CD, as do some busier class D airports;{' '}
            <Success>unless the ATIS says otherwise that's who you should call.</Success>
          </>,

          <>
            <Bold>At a non-towered airport</Bold> you will have to first decipher who to call. These
            days this is usually a phone number for the overlying TRACON/center facility. You may
            also be able to reach the facility using your radio; per{' '}
            <Link href={references.class_e_airspace}>Boldmethod</Link>:{' '}
            <Info>
              "all airports with Class E surface areas are required to have...the ability for
              aircraft to contact ATC from the ground."
            </Info>{' '}
            The phone number and frequency can be found in the Chart Supplement. Then there are{' '}
            <Term>remote communications outlets (RCOs)</Term>...{' '}
            <Success>You should make the call after conducting pre-takeoff checks.</Success> Then
            you'll copy your clearance and read it back just like at a towered airport, only now
            there is <Term>void time</Term> to comply with.
          </>,

          <>
            You can also pick up a clearance in the air, though you probably won't need to
            demonstrate this during your check ride.
          </>,
        ],
      }}
    />
  );
};

export default Compliance;

const references = {
  class_e_airspace: uri.boldMethod.l2f('airspace', 'class-e-airspace'),
};
