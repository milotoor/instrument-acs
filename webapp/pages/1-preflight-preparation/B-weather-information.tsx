import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  Color,
  DetailList,
  FAR,
  Image,
  Link,
  Paragraph,
  ReferenceLink,
  TaskPage,
} from '../../components';
import { getSectionStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';

export const getStaticProps = () => ({
  props: { structure: getSectionStructure(), task: getTaskFromSectionLetter(1, 'B') },
});

const WeatherInformation: NextPage<TaskPage.TopLevelProps> = (props) => {
  return (
    <TaskPage
      {...props}
      flags={{ '3i': 'missed' }}
      notes={{
        knowledge(id) {
          switch (id) {
            case '1': // Sources of weather data
              return [
                <>
                  The most reliable way to get weather information is to call Flight Service at
                  1-800-WX-BRIEF; this way you will speak with a weather specialist who knows your
                  area/route of flight well. There are also online resources, such as ForeFlight (my
                  go-to), the <Link href={references.awc}>Aviation Weather Center</Link> and{' '}
                  <Link href={references.wx_brief}>1800wxbrief.com</Link> (run by Leidos).
                </>,
                <>
                  There are also resources available inflight, including ADS-B In (
                  <Link href={references.ads_b_fis_b}>which leverages FIS-B</Link>
                  ), Hazardous In-flight Weather Advisory Service (HIWAS) and other automated
                  reporting services. Pilots can also subscribe to SiriusXM for weather broadcasts
                  from satellites, which can provide coverage at lower altitudes where ground-based
                  transmitters can't reach.
                </>,
              ];
            case '2': // Weather products
              return (
                <>
                  A very large variety of weather products exist to aid in flight planning. Many of
                  these are available in ForeFlight; additionally, the NWS provides the{' '}
                  <Link href={references.gfa}>Graphical Forecasts for Aviation</Link> (GFA for
                  short).
                </>
              );
            case '3': // Meteorology in general
              return (
                <>
                  There is a <span className="italic">tremendous</span> amount to say about weather
                  and its various aspects. Notes in this section will concentrate on weather
                  elements that are likely to come up in the oral portion of the test. For
                  discussion of local weather phenomena see the following task.
                </>
              );
            case '3a': // Atmospheric composition and stability
              return [
                <>
                  The{' '}
                  <Link href={references.isa}>
                    <Bold>International Standard Atmosphere (ISA)</Bold>{' '}
                  </Link>
                  is central to understanding how the FAA talks about the atmosphere. On a "standard
                  day" the sea level pressure is 29.92"Hg and the air temperature is 15°C. For every
                  thousand feet of elevation gain, the pressure drops 1"Hg and the temperature drops
                  2°C.
                </>,
                <>
                  <Bold>Atmospheric stability</Bold> is defined as "the resistance of the atmosphere
                  to vertical perturbation." If the ambient lapse rate is greater than the{' '}
                  <Bold>dry adiabatic lapse rate of 3°C per thousand feet</Bold>--that is, if air
                  temperature decreases at a rate greater than 3°C/1000ft--then a parcel of air
                  displace upwards won't cool as quickly as the air around it and thus will be
                  pushed further upwards. This is an unstable parcel.
                </>,
                <>
                  The general characteristics of unstable air include{' '}
                  <DetailList type="inline">
                    <>good visibility</>
                    <>showery precipitation</>
                    <>cumuliform-type clouds</>
                    <>turbulent air</>
                  </DetailList>
                  . By contrast, characteristics of stable air include{' '}
                  <DetailList type="inline">
                    <>poor visibility</>
                    <>steady precipitation</>
                    <>stratus-type clouds</>
                    <>smooth air</>
                  </DetailList>
                  .
                </>,
              ];
            case '3b': // Wind
              return [
                <>
                  Wind has many impacts on aviation. In this part of the country they are
                  predominantly north-westerly. During departure and arrival the winds are crucial
                  consideration for runway selection. En route they can push you faster, slow you
                  down or simply blow you off course.
                </>,
                <>
                  {' '}
                  Phenomena like{' '}
                  <Bold>
                    <ReferenceLink reference="AC 00-54" text="wind shear" />
                  </Bold>{' '}
                  or{' '}
                  <Bold>
                    <ReferenceLink reference="AC 00-57" text="mountain wave" />
                  </Bold>{' '}
                  can be extremely hazardous: countless GA accidents have occurred simply because
                  pilots (especially instrument pilots!) forget that downwind of a mountain range is
                  a high-risk environment.
                </>,
                <>
                  The <Bold>jetstream</Bold> is defined as a wind of 50 knots or greater associated
                  with the tropopause. It shifts seasonally, extending farther south (and blowing
                  more strongly) in the winter.
                </>,
              ];
            case '3c': // Temperature
              return [
                <>
                  Temperature has multiple profound effects on aviation, including{' '}
                  <DetailList type="inline">
                    <>density altitude</>
                    <>atmospheric stability</>
                    <>water absorption</>
                  </DetailList>
                  .
                </>,
                <>
                  A <Bold>temperature inversion</Bold> occurs when a layer of cold air is trapped
                  beneath a layer of warmer air. An inversion is most frequently produced by ground
                  radiation on clear nights with light or no winds. This forms a stable layer of air
                  and prevents convection and mixing, leading to poor visibility at the surface.
                  Wind shear may be a concern when passing through the inversion.
                </>,
              ];
            case '3d': // Moisture/precipitation
              return [
                <>
                  There is always moisture in the air. Moisture becomes precipitation when the air
                  is cooled to its <Bold>dew point</Bold>, at which temperature the air is said to
                  have a relative humidity of 100% and thus is saturated.
                </>,
                <>
                  The type of precipitation that forms when water condenses depends on several
                  factors.
                </>,
              ];
            case '3e': // Weather system formation
              return [
                <>
                  An air mass is{' '}
                  <Bold>
                    a body of air that covers an extensive area and has fairly uniform properties of
                    temperature and moisture
                  </Bold>
                  . They form when air is allowed to rest or move slowly over a large geographical
                  area, when the air acquires the properties of the ground. When an air mass then
                  leaves its formation area, it comes into contact with other air masses with
                  different properties. The interface between the two masses is known as a{' '}
                  <Bold>frontal zone</Bold> or simply a <Bold>front</Bold>.
                </>,
                <>
                  Across a front, temperature, humidity and wind often change rapidly over short
                  distances. The three typical types of fronts are the{' '}
                  <Bold color="cold-front">cold front</Bold>, the{' '}
                  <Bold color="warm-front">warm front</Bold> and the{' '}
                  <Bold>
                    {'stationary front'.split('').map((l, i) => (
                      <Color color={i % 2 === 0 ? 'cold-front' : 'warm-front'}>{l}</Color>
                    ))}
                  </Bold>
                  . An <Bold color="occluded-front">occluded front</Bold> forms when a fast-moving
                  cold front catches up to a slower-moving warm front.
                </>,
                <>
                  Quoting from <ReferenceLink reference="AC 00-6" /> (chapter 10.3): "A{' '}
                  <Bold>wave cyclone</Bold> is a low pressure circulation that forms and moves along
                  a front. The circulation about the cyclone center tends to produce a wavelike kink
                  along the front.{' '}
                  <Bold>Wave cyclones are the primary weather producers in the mid-latitudes</Bold>.
                  They are large lows that generally travel from west to east along a front. They
                  last from a few days to more than a week."
                </>,
                <Image
                  src="/img/cyclogenesis.webp"
                  dimensions={[1600, 810]}
                  width={700}
                  noMargin
                />,
              ];
            case '3f': // Clouds
              return [
                <>
                  Clouds are grouped into four families:{' '}
                  <DetailList type="inline">
                    <>high</>
                    <>middle</>
                    <>low</>
                    <>those with extensive vertical development</>
                  </DetailList>
                  . High clouds are mostly ice crystals and the least likely to be an icing concern.
                  Clouds with extensive vertical development are indications of unstable air and are
                  very turbulent.
                </>,
                <>
                  Cloud formation differs by altitude and atmospheric stability. In an unstable
                  atmosphere, clouds will tend to grow vertically and be more cumuliform; in a
                  stable atmosphere, clouds will be more stratiform.
                </>,
              ];
            case '3g': // Turbulence
            case '3h': // Thunderstorms/microbursts
              return null;
            case '3i': // Icing and freezing level
              return [
                <>
                  When certain weather phenomena are encountered, it's possible to make inferences
                  about the air temperature at a greater altitude:{' '}
                  <DetailList type="inline" delimeter=";" logic={null}>
                    <>wet snow indicates that the freezing level is above you</>
                    <>ice pellets indicate freezing rain above</>
                  </DetailList>
                  .
                </>,
              ];
            case '3j': // Fog/mist
            case '3k': // Frost
            case '3l': // Obstructions to visibility
              return null;
          }
        },
        skills(id) {
          switch (id) {
            case '2':
              return (
                <>
                  It's important to understand the coded language of{' '}
                  <Link href={references.taf_metar_key}>METARs and TAFs</Link>. Know how to read the
                  most common symbols on the graphical forecast charts; the legend is availabe{' '}
                  <Link href={references.gfa_symbols}>here</Link>.
                </>
              );
            case '4':
              return [
                <Paragraph heading="Determining the necessity">
                  Use the <Bold>1-2-3</Bold> rule to determine if you need to file an alternate: If,
                  within <Bold>1 hour</Bold> before or after your ETA, the ceiling at your
                  destination is less than <Bold>2000 feet</Bold> or the visibility less than{' '}
                  <Bold>3 statute miles</Bold>, you must file an alternate. Additionally, you must
                  file an alternate{' '}
                  <Bold>if your destination doesn't have any instrument approaches</Bold>.
                </Paragraph>,
                <Paragraph heading="Regulatory requirements" hr>
                  The process looks like this:
                  <DetailList type="bullet">
                    <>
                      Determine the forecast weather at the proposed alternate at the time you would
                      arrive there
                    </>
                    <>
                      Determine which runway(s) would be acceptable for landing given the forecast
                      winds and runway lengths
                    </>
                    <>
                      Determine which procedures to these runways you and your aircraft are able to
                      fly
                    </>
                    <>
                      Of these procedures, determine which has the lowest ceiling and visibility
                      minimums. Standard minimums are{' '}
                      <DetailList type="inline">
                        <>
                          ceiling 600 feet and visibility 2 statute miles for a precision approach
                        </>
                        <>
                          ceiling 800 feet and visibility 2 statute miles for a nonprecision
                          approach
                        </>
                      </DetailList>
                    </>
                    <>
                      <Bold>
                        If these lowest minima are less than the forecast ceiling and visibility at
                        the proposed alternate, then the airport is legally acceptable as an
                        alternate.
                      </Bold>
                    </>
                  </DetailList>
                </Paragraph>,
                <>
                  If the proposed alternate doesn't have any IAPs, it may still be filed as an
                  alternate if the ceiling and visibility at the time of arrival at the alternate
                  would allow a descent from the MEA under basic VFR. See{' '}
                  <FAR section={[91, 169, 'c', 2]} />
                </>,
                <>
                  Jeppesen charts are great for determining if an airport is suitable as an
                  alternate, because their <Link href={references.jeppesen10_9}>10-9 pages</Link>{' '}
                  list out all approaches at the airport and their associated minima. The FAA makes
                  this information available too, in the "Alternate Minimums" section of TERPS, but
                  it's not as easy to decipher and approaches with standard minima aren't included
                  at all.
                </>,
                <Image src="/img/jeppesen-10-9.webp" dimensions={[1590, 330]} width={800} />,
                <Paragraph heading="GPS and WAAS" hr>
                  This is where things get a little messy.
                  <DetailList type="bullet">
                    <>
                      If you have a WAAS-capable aircraft,{' '}
                      <Bold>
                        you are allowed to plan to use an RNAV approach at both the destination and
                        alternate
                      </Bold>
                      , though you must use nonprecision minima for planning purposes. See{' '}
                      <AIM paragraph={[1, 1, 18]} />.
                    </>
                    <>
                      If your aircraft is not WAAS capable, you are allowed to plan to use an RNAV
                      approach at{' '}
                      <Bold>
                        either the destination or the alternate,{' '}
                        <span className="italic">but not both</span>
                      </Bold>
                      . Additionally, the aircraft must be equipped with fault detection and
                      exclusion (FDE) and the pilot must perform a preflight RAIM check. See{' '}
                      <AIM paragraph={[1, 1, 17]} /> (b)(5)(c).
                    </>
                  </DetailList>{' '}
                </Paragraph>,
              ];
            default:
              return null;
          }
        },
      }}
    />
  );
};

export default WeatherInformation;

const references = {
  ads_b_fis_b:
    'https://www.aopa.org/news-and-media/all-news/2019/october/flight-training-magazine/weather-ads-b-and-fis-b',
  aim_waas:
    'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap1_section_1.html#$paragraph1-1-18',
  awc: 'https://www.aviationweather.gov/',
  gfa: 'https://www.aviationweather.gov/gfa',
  gfa_symbols: 'https://www.aviationweather.gov/metar/symbol',
  isa: 'https://en.wikipedia.org/wiki/International_Standard_Atmosphere#:~:text=The%20International%20Standard%20Atmosphere%20(ISA,range%20of%20altitudes%20or%20elevations.',
  jeppesen10_9:
    'https://www.boldmethod.com/learn-to-fly/navigation/how-to-use-the-jeppesen-airport-10-9-page/',
  taf_metar_key:
    'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#mnH1e0JACK',
  wx_brief: 'https://www.1800wxbrief.com/',
};
