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
            authority. The same regulation indicates that:
            <Quotation padded>
              The pilot in command of an aircraft is directly responsible for, and is the final
              authority as to, the operation of that aircraft.
            </Quotation>
          </>
        ),
        k3: [
          <ReferenceList
            references={[<FAR section={[91, 185]} />, <AIM paragraph={[6, 4, 1]} />]}
          />,

          <>
            It's worth having <FAR section={[91, 185]} /> bookmarked for the check ride, as you are{' '}
            <Bold>100% guaranteed</Bold> to get asked about lost communications procedures. For
            starters, the FAA acknowledges (in <AIM paragraph={[6, 4, 1, 'a']} />) that this is a
            tricky situation:{' '}
          </>,

          <Quotation>
            It is <Bold>virtually impossible</Bold> to provide regulations and procedures applicable
            to all possible situations associated with two‐way radio communications failure. During
            two‐way radio communications failure, when confronted by a situation not covered in the
            regulation, pilots are expected to exercise good judgment in whatever action they elect
            to take.{' '}
            <Warning>
              Should the situation so dictate they should not be reluctant to use the emergency
              action
            </Warning>{' '}
            contained in <FAR section={[91, 3, 'b']} />.
          </Quotation>,

          <>
            The specific actions to take in the event of 2-way comms failure will vary by
            circumstance:
            <BulletList type="disc">
              <>
                If the failure occurs in VFR conditions, remain in VFR conditions and land "as soon
                as practicable." In other words,{' '}
                <Success>stay out of the clouds and land soon</Success> but{' '}
                <Warning>
                  do not feel compelled to land immediately if there is good reason for continuing
                  the flight to an airport better-suited to your/your aircraft's needs.
                </Warning>{' '}
                At the same time, be mindful that your presence in the NAS while IFR and without
                comms imposes a considerable inconvenience on other aircraft and ATC, who must
                continually route traffic around you.
              </>
              <>
                If the failure occurs in IFR conditions, there is a standard procedure for
                maintaining safety of flight.
                <BulletList type="disc">
                  <>
                    <Bold>Route.</Bold>{' '}
                    <Info>You should follow the route you were assigned by ATC.</Info> If you were
                    being radar vectored, fly direct to the fix/route/airway you were being vectored
                    to. If you do not have an assigned route, fly the route that ATC has told you to
                    expect, and if you don't have that either then fly what's in your flight plan.
                  </>
                  <>
                    <Bold>Altitude.</Bold> For each flight segment,{' '}
                    <Info>fly the highest of the following three altitudes:</Info>{' '}
                    <InlineList>
                      <>your last assigned altitude</>
                      <>the minimum IFR altitude</>
                      <>the altitude you have been told to expect</>
                    </InlineList>
                    .
                  </>
                  <>
                    <Bold>Leave the clearance limit.</Bold> When you get to where you've been
                    cleared to, you will want to begin your descent and approach. The by-the-book
                    way to do this is to fly to your clearance limit--typically the destination
                    airport--and from there to an IAF. <FAR section={[91, 185, 'c', 3, 'ii']} />{' '}
                    says to{' '}
                    <Quotation inline>
                      commence descent or descent and approach as close as possible to the ETA as
                      calculated from
                    </Quotation>{' '}
                    the flight plan.
                    <div className="pt-3">
                      However, there are some serious issues with this plan that make in somewhat
                      impractical. For starters, if you are early to the destination,{' '}
                      <Warning>where are you supposed to hold?</Warning> Some IAFs have published
                      holds but certainly not all do, and there are pretty obvious reasons for not
                      rolling your own unpublished hold in the midst of what is already an
                      emergency. Furthermore,{' '}
                      <Warning>
                        ATC will neither expect this odd behavior nor be pleased when you do it.
                      </Warning>{' '}
                      They want you out of their problem. You want to be out of their problem too,
                      right? So get out of their problem and get on the ground safely.{' '}
                      <Success>
                        Fly to an IAF, stay above the MSA until established on an approach segment
                        and fly the approach.
                      </Success>
                    </div>
                    <div className="pt-3">
                      This <Link href={references.ifr_mag_lost_comms}>IFR Magazine article</Link>{' '}
                      for additional commentary and a recent history of attempts to change the rule.
                    </div>
                  </>
                </BulletList>
              </>
            </BulletList>
          </>,

          <>
            Remember, the <Info>name of the game is to be predictable!</Info> Make constant rate
            descents and standard rate turns so that ATC has the ability to predict what you're
            doing. Finally, <Danger>don't forget to squawk 7600 and run the checklist!</Danger>
          </>,
        ],
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
  ifr_mag_lost_comms: uri.ifr_mag('system', 'how-far-can-you-go'),
};
