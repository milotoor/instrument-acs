import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  Danger,
  DetailList,
  Emphasize,
  FAR,
  Image,
  Katex,
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
                  go-to), the <Link href={references.awc.home}>Aviation Weather Center</Link> and{' '}
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
                  {'stationary front'.split('').map((l, i) => (
                    <Bold color={i % 2 === 0 ? 'cold-front' : 'warm-front'} key={i}>
                      {l}
                    </Bold>
                  ))}
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
              return [
                <>
                  Turbulence is reported with four intensity levels:{' '}
                  <DetailList type="inline">
                    <>light</>
                    <>moderate</>
                    <>severe</>
                    <>extreme</>
                  </DetailList>
                  . Severe turbulence causes the aircraft to be momentarily out of control, while
                  extreme turbulence may cause structural damage.
                </>,
                <>
                  When encountering severe or extreme turbulence, it's important to reduce aircraft
                  speed to the{' '}
                  <Bold>
                    design maneuvering speed (<Katex inline>V_a</Katex>)
                  </Bold>{' '}
                  to lessen airframe stresses.
                </>,
              ];
            case '3h': // Thunderstorms/microbursts
              return [
                <>
                  Thunderstorms are extremely hazardous to all aircraft and great care should be
                  taken to avoid them. There are three necessary ingredients:{' '}
                  <DetailList type="inline">
                    <>sufficiently moist air</>
                    <>an unstable atmosphere (i.e. a steep lapse rate)</>
                    <>a lifting force</>
                  </DetailList>
                  .
                </>,
                <>
                  There are three stages to thunderstorms:{' '}
                  <DetailList type="inline">
                    <>
                      the cumulus stage (characterized by updrafts and low pressure at the surface)
                    </>
                    <>
                      the mature stage (the most intense stage, characterized by updrafts,
                      downdrafts and precipitation)
                    </>
                    <>the dissipating stage (characterized by downdrafts)</>
                  </DetailList>
                </>,
                <>
                  A <Bold>squall line</Bold> is a nonfrontal band of thunderstorms, typically
                  preceding a cold front in moist, unstable air. These multicell or supercell
                  thunderstorms are extremely hazardous and difficult to navigate around (due to
                  their height and breadth).
                </>,
                <>
                  The most significant hazards associated with thunderstorms are{' '}
                  <DetailList type="inline">
                    <>turbulence</>
                    <>microbursts</>
                    <>
                      hail, particularly beneath the <Bold>anvil</Bold>
                    </>
                  </DetailList>
                  . Additionally, lighting can damage avionics equipment, temporarily blind the
                  pilot and induce permanent errors in the magnetic compass. Near the ground (i.e.
                  after takeoff, on an approach or while landing){' '}
                  <Bold>adverse winds and windshear</Bold> can be catastrophic.
                </>,
                <>
                  Finally, <Bold>embedded thunderstorms</Bold> are especially dangerous to IFR
                  aircraft because they are, by their nature, difficult to foresee and avoid. If you
                  do end up inside a thunderstorm, the recommended recover procedure is:
                  <DetailList type="bullet">
                    <>
                      Try to maintain a constant <Emphasize italic>attitude</Emphasize>; do not try
                      to maintain a constant <Emphasize italic>altitude</Emphasize> as this will
                      only add stress to the aircraft
                    </>
                    <>
                      The way out is through; making a 180° turn likely prolongs your time in the
                      storm and places additional stress on the aircraft
                    </>
                    <>Maintain power settings for a reduced airspeed (maneuvering speed or less)</>
                    <>
                      Keep your eyes inside and on the instruments; looking outside can be blinding
                    </>
                  </DetailList>
                </>,
                <Paragraph heading="Microbursts">
                  Microbursts are short-lived, intense downdrafts which become strong horizontal
                  winds near the surface. The downdrafts may be up to <Bold>6,000fpm</Bold>!
                  Microbursts are particularly hazardous because an aircraft transiting through one
                  will first experience a sudden increase in airspeed and performance followed by an
                  equally sudden (and even more dramatic) decrease. The horizontal winds may be up
                  to 45 knots, which means that the{' '}
                  <Danger>
                    headwind-to-tailwind shear experienced in the middle of the microburst may be as
                    much as 90 knots!
                  </Danger>
                </Paragraph>,
                <>
                  An individual microburst typically does not last more than 15 minutes. The most
                  intense horizontal winds last only a few minutes.
                </>,
                <Image src="/img/microburst.webp" dimensions={[968, 535]} width={600} noMargin />,
              ];
            case '3i': // Icing and freezing level
              return [
                <>
                  The Aviation Weather Center provides information about current icing conditions (
                  <Link href={references.awc.icing_sigmet}>SIGMETs</Link> and{' '}
                  <Link href={references.awc.icing_pirep}>PIREPs</Link>),{' '}
                  <Link href={references.awc.forecast_icing}>forecast icing</Link> and{' '}
                  <Link href={references.awc.freezing_level}>freezing level</Link>
                </>,
                <Paragraph heading="Icing Conditions">
                  For ice to form, there must be <Bold>visible moisture</Bold> and the air must be{' '}
                  <Bold>cooled to a temperature of 0°C or less</Bold>. Even if the ambient air
                  temperature is greater than 0°C, aerodynamic cooling can lower the temperature of
                  an airfoil below freezing.
                </Paragraph>,
                <Paragraph heading="Types of Icing" hr>
                  There are three types of structural icing:
                  <DetailList type="bullet">
                    <>
                      Clear ice forms when{' '}
                      <Bold>
                        large droplets or freezing rain contact the airframe and spread over the
                        surfaces
                      </Bold>
                      . This is the most dangerous form of icing as it is{' '}
                      <Danger>difficult to see</Danger>.
                    </>
                    <>
                      Rime ice forms{' '}
                      <Bold>
                        if the droplets are small and freeze immediately when contacting the
                        airframe
                      </Bold>
                      . It has a rough appearance and tends to accumulate on leading-edge surfaces.
                    </>
                    <>
                      Mixed ice is a mixture of clear and rime ice and forms when the conditions for
                      both clear and rime ice are present simultaneously.
                    </>
                  </DetailList>
                </Paragraph>,
                <>
                  When certain weather phenomena are encountered, it's possible to make inferences
                  about the air temperature at a higher altitude:{' '}
                  <DetailList type="inline" delimeter=";" logic={null}>
                    <>
                      freezing rain indicates higher temperatures above you; the rain forms as
                      liquid water and then falls into a freezing layer but does not itself freeze
                      until making contact with the aircraft
                    </>
                    <>wet snow indicates that the freezing level is above you</>
                    <>ice pellets indicate freezing rain above</>
                  </DetailList>
                  .
                </>,
                <Paragraph heading="Hazards of Structural Icing" hr>
                  There are numerous hazards associated with structural icing:
                  <DetailList type="bullet" bullet="alpha">
                    <>
                      Ice affects the shape of the airfoil, which in turn reduces the coefficient of
                      lift and the critical angle of attack;{' '}
                      <Danger>the aircraft can stall at significantly higher airspeeds</Danger>.
                    </>
                    <>
                      Ice simultaneously <Danger>reduces the amount of lift</Danger> produced by the
                      airfoil and <Danger>increases the drag</Danger> dramatically.
                    </>
                    <>
                      Ice can <Danger>restrict or completely lock control surfaces.</Danger>
                    </>
                    <>
                      Water is heavy! The added weight can{' '}
                      <Danger>prevent an aircraft from taking off or maintaining altitude</Danger>.{' '}
                      <Bold>
                        Regulations prohibit takeoff when snow, ice or frost is on the wings.
                      </Bold>
                    </>
                    <>
                      Severe ice accumulation in front of the ailerons may result in a{' '}
                      <Danger>roll upset</Danger>, in which the aircraft experiences an uncommanded
                      and uncontrolled roll. This is primarily a concern for pilots of aircraft with
                      FIKI capability.
                    </>
                    <>
                      Ice on the horizontal stabilizer can lead to a{' '}
                      <Danger>tailplane stall</Danger>, in which the airplane experiences an
                      uncommanded pitch down (because the tailplane is no longer applying its
                      compensatory up force).
                    </>
                  </DetailList>
                </Paragraph>,
                <>
                  <Bold italic>Changing the flap configuration may aggrevate the problem!</Bold>{' '}
                  When your airplane is not approved for FIKI and you are accumulating ice,{' '}
                  <Danger>you are now a test pilot!</Danger> If you are concerned that the aircraft
                  is contaminated, but it is currently under control,{' '}
                  <Bold>do not jeopardize that by making unnecessary configuration changes</Bold>.
                </>,
              ];
            case '3j': // Fog/mist
            case '3k': // Frost
              return (
                <>
                  Frost is defined as ice deposits formed on a surface when the surface temperature
                  is at or below the dew point and the dew point is below freezing. Frost must be
                  removed prior to flight, as it can reduce lift up to 30% and increase drag up to
                  40%.
                </>
              );
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
  awc: {
    home: 'https://www.aviationweather.gov/',
    forecast_icing: 'https://www.aviationweather.gov/icing/fip',
    freezing_level: 'https://www.aviationweather.gov/icing/frzlvl',
    icing_pirep: 'https://www.aviationweather.gov/airep/plot?region=us&type=ice',
    icing_sigmet: 'https://www.aviationweather.gov/sigmet/plot?type=icing',
  },
  gfa: 'https://www.aviationweather.gov/gfa',
  gfa_symbols: 'https://www.aviationweather.gov/metar/symbol',
  isa: 'https://en.wikipedia.org/wiki/International_Standard_Atmosphere#:~:text=The%20International%20Standard%20Atmosphere%20(ISA,range%20of%20altitudes%20or%20elevations.',
  jeppesen10_9:
    'https://www.boldmethod.com/learn-to-fly/navigation/how-to-use-the-jeppesen-airport-10-9-page/',
  taf_metar_key:
    'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#mnH1e0JACK',
  wx_brief: 'https://www.1800wxbrief.com/',
};
