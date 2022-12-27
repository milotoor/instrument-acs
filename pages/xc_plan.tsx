import cn from 'classnames';
import React, { ChangeEvent } from 'react';

import {
  AIM,
  Bold,
  BulletList,
  FAR,
  Image,
  Info,
  InlineList,
  Katex,
  Layout,
  Link,
  NoteCard,
  Quotation,
  Success,
  Tab,
  Tabs,
  Term,
  Warning,
} from '../components';
import { ACS, capitalize, ChildProp, uri } from '../lib';
import { getStaticPropsFn } from '../ssr';

type AltitudeType = 'assigned' | 'expected';
type AltitudeInputProps = { onChange: (alt: number | undefined) => void; type: AltitudeType };
type FlightPlanProps = { className?: string; components: string[] };
type FlightPlanLegProps = Partial<ChildProp> &
  Record<AltitudeType, number | undefined> &
  ExpectedNAProp & { start: string; end: string; mia: number };

type ExpectedNAProp = { expectedNA?: boolean };
type PossibleAltitudeProps = ExpectedNAProp & {
  altitudes: Record<AltitudeType, number | undefined> & { mia: number };
  expectedNA?: boolean;
  type: AltitudeType | 'mia';
  value: number | undefined;
};

const title = 'XC Plan — KWVI to KFAT';
export const getStaticProps = getStaticPropsFn;
const CrossCountryPlan: ACS.Page = ({ rawData }) => {
  const [assigned, setAssigned] = React.useState<number>();
  const [expected, setExpected] = React.useState<number>();
  const flightPlanLegProps = { assigned, expected };
  return (
    <Layout data={rawData} title={title}>
      <Layout.Title>{title}</Layout.Title>

      <div className="pt-4">
        This page is to plan out my assigned XC flight, to discuss the "why's" and to go over the
        lost comms procedures in excruciating detail. The assignment is to fly from Watsonville
        (KWVI) to Fresno (KFAT) with a 220 pound passenger.
      </div>

      <NoteCard
        label="The route"
        note={[
          <span>My intent is to file:</span>,

          <FlightPlan
            className="sm:text-lg lg:text-2xl text-center block"
            components={['KWVI', 'WVI4.SNS', 'SNS', 'V230', 'BLEAR', 'RNAV 11L', 'KFAT']}
          />,

          <Tabs>
            <Tab heading="Route">
              <Image directory="xc" src="chart_with_route" />
            </Tab>
            <Tab heading="Unadorned">
              <Image directory="xc" src="chart" />
            </Tab>
            <Tab heading="WVI4">
              <Image directory="xc" src="wvi4" />
            </Tab>
            <Tab heading="RNAV 11L">
              <Image directory="xc" src="rnav_11l" />
            </Tab>
            <Tab heading="RNAV 11R">
              <Image directory="xc" src="rnav_11r" />
            </Tab>
          </Tabs>,
        ]}
      />

      <NoteCard
        className="mt-8"
        label="Okay, but why?"
        note={
          <>
            <span>
              It's fairly direct. It leverages the ODP out of Watsonville. It stays mostly on
              airways, providing a readily available backup navigation if the GPS fails.
            </span>
            <BulletList type="disc">
              <>
                <Bold>WVI4.SNS</Bold>: This is one of two departure procedures from WVI. The other
                is the GARLK1 departure, which also heads to SNS but is much less direct and
                involves flying over Monterey Bay for 20 miles.
              </>
              <>
                <Bold>V230</Bold>: This is the most direct route to Panoche VOR (PXN). The other
                option is V87, which is a little longer but has a lower MEA. The MEA on V230 reaches
                a maximum of 9000' between PANOS and FIDDO due to the mountainous terrain over the{' '}
                <Link href={references.diablo_range}>Diablo Range</Link> (V87 is able to keep it
                lower using a line-of-sight with PXN that peeks through a pass south of Cerro
                Colorado).
              </>
              <>
                <Bold>BLEAR</Bold>: This is a convenient fix to depart from the airway because it's
                an IAF on a feeder route for the RNAV 11L approach into KFAT.
              </>
              <>
                <Bold>RNAV 11L</Bold>: This approach makes the most sense given my approach
                direction. It has minimums equivalent to the ILS Y approach. Runway 11L-29R is also
                the longest and best-lit runway with{' '}
                <Term>high intensity runway lights (HIRL)</Term> and{' '}
                <Term>centerline lights (CL)</Term>.{' '}
                <Info>
                  If this approach is not available (e.g. opposite runway is in use) then I may have
                  to circle to land or request vectors.
                </Info>
              </>
            </BulletList>
          </>
        }
      />

      <NoteCard
        className="mt-8"
        label="Lost comms"
        note={[
          <>
            See <Link.Task section={7} task="A" id="k1" /> for a complete discussion of the
            appropriate procedures in a lost comms scenario. Refer to <FAR section="91.185" />,{' '}
            <FAR section="91.177" /> and <AIM paragraph={[6, 4]} />.
          </>,

          <>
            The absolute first thing to do if you suspect you've lost comms is to try and regain
            them. You should check that{' '}
            <InlineList>
              <>you have the correct frequency tuned in</>
              <>your volume is not turned too far down</>
              <>your headset is plugged in correctly</>
              <>the circuit breaker hasn't popped</>
            </InlineList>
            . Go back to the prior frequency and ask for a radio check.{' '}
            <Warning>Remain in VMC if at all possible!</Warning>
          </>,

          <>
            If comms are well and truly gone you should{' '}
            <Success>remain in VMC and conclude the flight as soon as practicable.</Success> But of
            course you're in IMC already, duh...
          </>,

          <>
            Once in IMC you will need to follow the standard lost comms procedures.{' '}
            <Bold>You must follow the route assigned by ATC.</Bold>{' '}
            <Info>
              This means completing the WVI4 departure, flying V230 to BLEAR and continuing to your
              clearance limit (KFAT).
            </Info>
          </>,

          <>
            Altitude is more complicated. For each flight segment,{' '}
            <Info>fly the highest of the following three altitudes:</Info>{' '}
            <InlineList>
              <>your last assigned altitude</>
              <>the minimum IFR altitude</>
              <>the altitude you have been told to expect</>
            </InlineList>
            .{' '}
            <Success>
              If you have received an "expect X in Y minutes" clearance, you should wait until Y
              minutes have passed before climbing to X.
            </Success>{' '}
            Minimum IFR altitude is defined like so:
            <Quotation padded source={<FAR section="91.177" />}>
              If both a MEA and a MOCA are prescribed for a particular route or route segment, a
              person may operate an aircraft{' '}
              <Bold>
                below the MEA down to, but not below, the MOCA, provided the applicable navigation
                signals are available.
              </Bold>{' '}
              For aircraft using VOR for navigation, this applies only when the aircraft is within
              22 nautical miles of that VOR...If no applicable minimum altitude is
              prescribed...then, in the case of operations over an area{' '}
              <Bold>
                designated as a mountainous area, an altitude of 2,000 feet above the highest
                obstacle within a horizontal distance of 4 nautical miles
              </Bold>{' '}
              from the course to be flown; or in any other case, an altitude of{' '}
              <Bold>
                1,000 feet above the highest obstacle within a horizontal distance of 4 nautical
                miles
              </Bold>{' '}
              from the course to be flown
            </Quotation>
          </>,

          <>
            Further complicating matters, this flight technically spans both designated mountainous
            and non-mountainous areas.
          </>,

          <>
            <span>
              Here is what this looks like for each leg of the flight, given the following
              assigned/expected altitudes
            </span>
            <div className="flex items-center ml-4 mt-1">
              <AltitudeInput type="assigned" onChange={setAssigned} />
              <div className="w-8" />
              <AltitudeInput type="expected" onChange={setExpected} />
            </div>
          </>,

          <>
            <BulletList type="disc">
              <>
                <FlightPlanLeg start="WVI" end="SNS" mia={4200} {...flightPlanLegProps} expectedNA>
                  The minimum IFR altitude is not immediately clear for this portion. There are a
                  couple viable options. The SNS VOR has a 3-sector MSA on the VOR-13 approach
                  chart. Departing runway 20,{' '}
                  <Bold>the DP remains in the sector with an MSA of 4200.</Bold>{' '}
                  <Warning>
                    Do not climb to the expected altitude until the given time elapses.
                  </Warning>
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="SNS" end="BASEC" mia={6000} {...flightPlanLegProps}>
                  The MCA for SNS (on V230 eastbound) is 6000, so{' '}
                  <Info>you may need to climb in the charted hold to reach that.</Info>
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="BASEC" end="PANOS" mia={5500} {...flightPlanLegProps}>
                  The MIA here is a MOCA, which is allowed because you will be using RNAV (and
                  because you're within 22 NM of SNS anyway). Also be aware that{' '}
                  <Warning>PANOS has an MCA of 8000 for eastbound traffic.</Warning>
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="PANOS" end="FIDDO" mia={9000} {...flightPlanLegProps}>
                  The MIA here is an MEA. There is no MOCA, possibly because most of the leg is
                  further than 22 NM from SNS, so NAVAID reception would be an issue.
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="FIDDO" end="PXN" mia={5800} {...flightPlanLegProps}>
                  The MIA is a MOCA again.
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="PXN" end="MENDO" mia={4500} {...flightPlanLegProps}>
                  In the middle of this leg you enter the Central Valley and exit the designated
                  mountainous area.
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="MENDO" end="BLEAR" mia={1600} {...flightPlanLegProps}>
                  The MIA is a MOCA again.
                </FlightPlanLeg>
              </>
              <>
                <FlightPlanLeg start="BLEAR" end="KFAT" mia={1700} {...flightPlanLegProps}>
                  There is no MEA or MOCA for this leg, so the MIA must be manually derived using
                  the 8-NM corridor method. Per ForeFlight, the highest obstacle within that
                  corridor is 642' high. We are out of mountainous territory, so you add 1000 and
                  get 1642 which you round up to 1700.{' '}
                  <Info>
                    It's worth pointing out that the RNAV 11R approach has an MSA of 7800; however,
                    that's because the MSA extends 25 NM to the east of the airport and into the
                    Sierra Nevada foothills.
                  </Info>{' '}
                  It's not really relevant for our purposes.
                </FlightPlanLeg>
              </>
            </BulletList>
          </>,

          <>
            Upon arriving at KFAT, you are still at your cruise altitude and must descend. The FARs
            offer some guidance:
            <Quotation padded source={<FAR section="91.185" paragraph={['c', 3, 'ii']} />}>
              If the clearance limit is not a fix from which an approach begins, leave the clearance
              limit at the expect-further-clearance time if one has been received, or if none has
              been received,{' '}
              <Bold>
                upon arrival over the clearance limit, and proceed to a fix from which an approach
                begins and commence descent or descent and approach as close as possible to the
                estimated time of arrival
              </Bold>{' '}
              as calculated from the filed or amended (with ATC) estimated time en route.
            </Quotation>
          </>,

          <>
            Stipulating that{' '}
            <InlineList>
              <>KFAT is not an IAF for the RNAV 11L approach (nor any other approach)</>
              <>you do not have an EFC time</>
            </InlineList>
            ,{' '}
            <Success>
              you should proceed to a fix from which you can commence the approach and hold until
              your ETA.
            </Success>{' '}
            We could either go back to BLEAR or to MORLA and conduct a procedure turn.
          </>,
        ]}
      />
    </Layout>
  );
};

export default CrossCountryPlan;

const chipClasses = 'rounded-md px-2 py-1 border-2';
const references = {
  diablo_range: uri.wikipedia('Diablo_Range'),
};

function AltitudeInput({ onChange, type }: AltitudeInputProps) {
  return (
    <>
      <span className="font-bold">{capitalize(type)}:</span>
      <input
        className={cn(chipClasses, 'block ml-2 text-black w-16 text-right', {
          'border-blue-500': type === 'assigned',
          'border-fuchsia-500': type === 'expected',
        })}
        onChange={handleChange}
        type="text"
      />
    </>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value.length === 0) return onChange(undefined);

    const flightLevelMatch = value.match(/^FL(\d)(\d)(\d)$/);
    if (flightLevelMatch) {
      const [tens, thousands, hundreds] = flightLevelMatch.slice(1);
      return onChange(+tens * 10_000 + +thousands * 1_000 + +hundreds * 100);
    }

    const allDigitsMatch = value.match(/^(\d+)$/);
    if (allDigitsMatch) {
      const digits = allDigitsMatch[1];
      return onChange(+digits);
    }
  }
}

const FlightPlanArrow = () => <Katex className="mx-[0.5em]">\Rightarrow</Katex>;
function FlightPlan({ className, components }: FlightPlanProps) {
  return (
    <span className={className}>
      {components.map((component, i) => (
        <span key={component}>
          {component}
          {i === components.length - 1 ? null : <FlightPlanArrow />}
        </span>
      ))}
    </span>
  );
}

function FlightPlanLeg(props: FlightPlanLegProps) {
  const { assigned, children, expectedNA, start, end, expected, mia } = props;
  const altitudes = { assigned, expected, mia };
  const possibleAltitudeProps = { altitudes, expectedNA };
  return (
    <>
      <div className="flex flex-wrap items-center mt-2">
        <Bold className="mr-6">
          <span className="w-[5ch] inline-block">{start}</span>
          <FlightPlanArrow />
          <span className="w-[5ch] inline-block">{end}</span>:
        </Bold>
        <div className="flex items-center">
          <PossibleAltitude {...possibleAltitudeProps} type="mia" value={mia} />
          <PossibleAltitude {...possibleAltitudeProps} type="assigned" value={assigned} />
          <PossibleAltitude {...possibleAltitudeProps} type="expected" value={expected} />
        </div>
      </div>
      {children && <div className="ml-4 mt-1">{children}</div>}
    </>
  );
}

function PossibleAltitude({ altitudes, type, value, expectedNA = false }: PossibleAltitudeProps) {
  const altType = type === 'mia' ? 'MIA' : capitalize(type);
  const altitudeArray = [
    altitudes.assigned ?? 0,
    altitudes.mia,
    expectedNA ? 0 : altitudes.expected ?? 0,
  ];

  const isHighest = Math.max(...altitudeArray) === value;
  const isMissing = value === undefined;
  const highestBgClasses = {
    assigned: 'bg-blue-500',
    expected: 'bg-fuchsia-500',
    mia: 'bg-green-600',
  };

  const isDisabled = isMissing || (expectedNA && type === 'expected');
  return (
    <div
      className={cn(chipClasses, 'first:ml-0 mx-2', {
        'border-green-600': type === 'mia',
        'border-blue-500': type === 'assigned',
        'border-fuchsia-500': type === 'expected',
        'border-stone-300 text-stone-400': isDisabled,
        [highestBgClasses[type]]: isHighest,
        'font-bold text-white': isHighest,
      })}
    >
      {altType}
      {value !== undefined && ':'} {value}
    </div>
  );
}
