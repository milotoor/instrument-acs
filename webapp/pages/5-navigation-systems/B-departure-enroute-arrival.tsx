import { NextPage } from 'next';
import React from 'react';

import { Bold, Gray, Image, Link, Paragraph, TaskPage, ToDo, Tooltip } from '../../components';
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
                  <Gray>
                    DPs must not require a turn prior to reaching 400 feet above the departure end
                    of runway (DER) elevation.
                  </Gray>
                </>,
                <Paragraph heading="Obstacle Departure Procedures">
                  ODPs are DPs whose primary purpose is to <Bold>provide obstacle protection.</Bold>{' '}
                  They are always provided in textual form, and{' '}
                  <Tooltip message="If an ODP's instructions require more than one turn, altitude change, or climb gradient, a graphical ODP must be developed.">
                    some are graphical as well.
                  </Tooltip>{' '}
                  The procedures are provided alongside the takeoff minima on both the FAA charts
                  and Jeppesen 10-9 pages.
                </Paragraph>,
                <Image src="5/departure_procedure" dimensions={[1166, 525]} width={800} />,
                <>
                  An ODP must be developed when obstructions penetrate the 40:1 departure obstacle
                  clearance surface (OCS) as described in <Link href={references.terps}>TERPS</Link>
                  . Any given runway gets at most one ODP, which is to be considered the default DP
                  for that runway, to be used in the absence of ATC vectors or a SID.
                </>,
                <Paragraph heading="Standard Instrument Departures">
                  SIDs are DPs whose primary purpose is to{' '}
                  <Bold>
                    concisely communicate an ATC clearance and thus expedite the flow of air traffic
                  </Bold>
                  . Unlike ODPs, ATC clearance is required to fly a SID, and they are always
                  depicted graphically.
                </Paragraph>,
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
