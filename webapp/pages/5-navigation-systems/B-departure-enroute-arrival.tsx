import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  Collapse,
  Danger,
  DetailList,
  FAR,
  Image,
  Italic,
  Link,
  Paragraph,
  TaskPage,
  ToDo,
  Tooltip,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { uri } from '../../lib/references';

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(5, 'B') },
});

const DepartureEnrouteArrival: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      notes={{
        knowledge(id) {
          switch (id) {
            case '1':
              return [
                <Paragraph heading="Departure Procedures">
                  Both <Bold>Obstacle Departure Procedures (ODPs)</Bold> and{' '}
                  <Bold>Standard Instrument Departures (SIDs)</Bold> fall under the umbrella
                  category of <Bold>Departure Procedures (DPs)</Bold>. Both ODPs and SIDs are
                  procedures to follow when departing an airport IFR. See{' '}
                  <Link href={references.order_8260_46c}>FAA Order 8260-46C</Link>. In order for an
                  airport to have an approved instrument approach procedure, it must also have a DP
                  and/or takeoff minima.
                </Paragraph>,
                <>
                  Both ODPs and SIDS have associated minimum visibility and climb gradients, and may
                  have minimum ceilings as well.{' '}
                  <DetailList type="bullet" bullet="disc">
                    <>
                      <Bold>The standard takeoff weather minimum is 1 mile visibility</Bold> (for 1
                      & 2 engine aircraft; 3 & 4 engine aircraft use half a mile). Notably, this
                      does not legally apply to part 91 operators like myself, but it's a good rule
                      to follow nevertheless. See <FAR section={[91, 175, 'f', 2]} />.
                    </>
                    <Bold>The standard climb gradient is 200 ft/nm</Bold>
                    <>
                      There is no standard ceiling minimum. However, many DPs will provide an option
                      to take off with the minimum climb gradient{' '}
                      <Bold>only if the ceiling is above a minimum value.</Bold> For instance, a DP
                      may say specify a given runway's takeoff minimums as{' '}
                      <Italic>300-1 or standard with minimum climb of 350' per NM to 400</Italic>.
                      This enables any aircraft capable of climbing 350' per NM to take off
                      regardless of the ceiling, while still allowing underpowered aircraft to take
                      off if the ceiling is above 300 feet; this limitation ensures that
                      underpowered aircraft can see and avoid the obstacles of concern.
                    </>
                  </DetailList>
                </>,
                <Collapse heading="Obstacle Departure Procedures">
                  <Paragraph>
                    ODPs are DPs whose primary purpose is to{' '}
                    <Bold>provide obstacle protection.</Bold> They are always provided in textual
                    form, and{' '}
                    <Tooltip message="If an ODP's instructions require more than one turn, altitude change, or climb gradient, a graphical ODP must be developed.">
                      some are graphical as well.
                    </Tooltip>{' '}
                    The procedures are provided alongside the takeoff minima on both the FAA charts
                    and Jeppesen 10-9 pages.
                  </Paragraph>
                  <Paragraph>
                    <Image src="5/departure_procedure" width={800} />
                  </Paragraph>
                  <Paragraph>
                    An ODP must be developed when obstructions penetrate the 40:1 departure obstacle
                    clearance surface (OCS) as described in{' '}
                    <Link href={references.terps}>TERPS</Link>. Any given runway gets at most one
                    ODP, which is to be considered the default DP for that runway, to be used in the
                    absence of ATC vectors or a SID. ODPs must be designed to terminate at{' '}
                    <DetailList type="inline" logic="or">
                      <>a fix/NAVAID located within the IFR en route structure</>
                      <>
                        an altitude that will allow random IFR flight (minimum diverse vectoring
                        altitude)
                      </>
                    </DetailList>
                  </Paragraph>
                </Collapse>,
                <Collapse heading="Standard Instrument Departures">
                  <Paragraph>
                    SIDs are DPs whose primary purpose is to{' '}
                    <Bold>
                      concisely communicate an ATC clearance and thus expedite the flow of air
                      traffic
                    </Bold>
                    . Unlike ODPs,{' '}
                    <DetailList type="inline">
                      <>ATC clearance is required to fly a SID</>
                      <>they are always depicted graphically</>
                      <Danger>
                        takeoff minimums and published climb gradients are mandatory even for part
                        91 operators
                      </Danger>
                    </DetailList>
                    . Similar to ODPs, SIDs must be designed to terminate at{' '}
                    <DetailList type="inline" logic="or">
                      <>a fix/NAVAID located within the IFR en route structure</>
                      <>
                        an altitude that will allow random IFR flight (minimum diverse vectoring
                        altitude)
                      </>
                      <>a position and altitude where ATC radar service is provided</>
                    </DetailList>{' '}
                    (this last is not an option for ODP terminations).
                  </Paragraph>
                </Collapse>,
                <Collapse heading="Diverse Vector Areas & Visual Climbs Over Airport" startOpen>
                  <Paragraph>
                    Per <AIM paragraph={[5, 2, 9, 'b']} />: a{' '}
                    <Bold>
                      DVA is an area in which ATC may provide random radar vectors during an
                      uninterrupted climb from the departure runway until above the minimum
                      vectoring altitude/minimum IFR altitude
                    </Bold>
                    , established in accordance with the TERPS criteria for diverse departures. The
                    DVA provides obstacle and terrain avoidance in lieu of taking off from the
                    runway under IFR using an ODP or SID.
                  </Paragraph>

                  <Paragraph>
                    Alternatively, per <AIM paragraph={[5, 2, 9, 'e', 7]} />, a{' '}
                    <Bold>
                      VCOA procedure enables an aircraft operating in VMC equal to or greater than
                      the specified visibility and ceiling, to visually conduct climbing turns over
                      the airport to the published “at or above” altitude
                    </Bold>
                    . At this point, the pilot may proceed in IMC to the first en route fix using a
                    diverse departure.
                  </Paragraph>

                  <Paragraph>
                    <Image src="5/departure_procedure" width={800}>
                      In the procedure above, the VCOA has a minimum ceiling of 4400' and visibility
                      of 3 statute miles. Pilots flying the VCOA procedure are{' '}
                      <Bold>
                        expected to remain within 3 statute miles of the airport until reaching the
                        "at or above" altitude (in this case 9400')
                      </Bold>
                      , after which they may proceed on course according to their clearance.
                    </Image>
                  </Paragraph>

                  <Paragraph>
                    There is no minimum climb gradient for the circling maneuver (indeed it would
                    not make much sense to have one); however upon arriving at the VCOA's
                    termination altitude the aircraft is once again expected to climb at a minimum
                    of 200 per nautical mile.
                  </Paragraph>

                  <Paragraph>
                    Confoundingly, both Jeppesen and FAA charts are inconsistent in how they refer
                    to the VCOA minimums. Sometimes they describe the minimums as "for climb in
                    visual conditions" (as they do in the procedure above) while other times they
                    use the more explicit "for visual climb over airport".
                  </Paragraph>
                </Collapse>,
                <Paragraph heading="Standard Arrival Procedures">
                  <ToDo />
                </Paragraph>,
              ];
          }
        },
      }}
    />
  );
};

export default DepartureEnrouteArrival;

const references = {
  order_8260_46c: uri.faa_docs('Order/ND/8260.46C.pdf'),
  terps: uri.faa_docs('Order/FAA_Order_8260.3D1.pdf'),
};
