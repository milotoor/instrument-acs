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
  Italic,
  Katex,
  Link,
  Paragraph,
  ReferenceLink,
  TaskPage,
} from '../../components';
import { getStructure, getTaskFromSectionLetter } from '../../lib/data_loaders';
import { uri } from '../../lib/references';

type FrontProps = { plural?: boolean };

export const getStaticProps = () => ({
  props: { structure: getStructure(), task: getTaskFromSectionLetter(1, 'B') },
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
              return [
                <>
                  A very large variety of weather products exist to aid in flight planning. Many of
                  these are available in ForeFlight; additionally, the NWS provides the{' '}
                  <Link href={references.gfa}>Graphical Forecasts for Aviation</Link> (GFA for
                  short).
                </>,
                <>
                  To focus on a few:{' '}
                  <DetailList type="bullet">
                    <>
                      <Link bold href={references.awc.graphical_airmet}>
                        Graphical AIRMET
                      </Link>{' '}
                      and{' '}
                      <Link bold href={references.awc.sigmet}>
                        SIGMET
                      </Link>{' '}
                      charts indicate the location and boundaries for active AIRMETs and SIGMETs. As
                      a reminder, SIGMETs are issued for significant weather hazards that are of
                      concern to all aircraft, while AIRMETs are primarily of concern to lighter
                      aircraft; the AWC is responsible for issuing both AIRMETs and SIGMETs. AIRMETs
                      come in three flavors:{' '}
                      <DetailList type="inline">
                        <>Sierra (mountain obscuration or IFR)</>
                        <>Tango (turbulence)</>
                        <>Zulu (icing)</>
                      </DetailList>
                      .
                    </>
                    <>
                      <Bold>Significant Weather charts</Bold> come in{' '}
                      <Link bold href={references.awc.sigwx.low}>
                        low (below FL240)
                      </Link>{' '}
                      and{' '}
                      <Link bold href={references.awc.sigwx.high}>
                        high
                      </Link>{' '}
                      varieties. The low SIGWX chart shows freezing levels, turbulence, and low
                      cloud ceilings. The high SIGWX chart shows thunderstorms, tropical cyclones,
                      moderate or severe turbulence, jetstreams, volcanic eruptions and more.
                    </>
                    <>
                      The{' '}
                      <Link bold href={references.awc.surface_analysis}>
                        Surface Analysis Chart
                      </Link>{' '}
                      shows useful information regarding front positions, pressure systems, wind
                      intensities and precipitation.
                    </>
                  </DetailList>
                </>,
                <Image src="1/surface_analysis_chart" width={700} noMargin />,
              ];
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
                  <Link bold href={references.isa}>
                    International Standard Atmosphere (ISA)
                  </Link>{' '}
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
                  Phenomena like <ReferenceLink bold reference="AC 00-54" text="wind shear" /> or{' '}
                  <ReferenceLink bold reference="AC 00-57" text="mountain wave" /> can be extremely
                  hazardous: countless GA accidents have occurred simply because pilots (especially
                  instrument pilots!) forget that downwind of a mountain range is a high-risk
                  environment.
                </>,
                <>
                  The <Bold>jetstream</Bold> is defined as a wind of 50 knots or greater associated
                  with the tropopause. It shifts seasonally, extending farther south (and blowing
                  more strongly) in the winter.
                </>,
                <>
                  For reasons not entirely clear to me, <Bold>wind shear</Bold> patterns vary
                  between front types:
                  <DetailList type="bullet" bullet="alpha">
                    <>
                      with a <ColdFront />, it occurs just after the front passes and for a short
                      period thereafter
                    </>
                    <>
                      with a <WarmFront />, it occurs just before the front passes
                    </>
                    <>
                      <WarmFront plural /> seem to produce much greater wind shear than{' '}
                      <ColdFront plural /> do
                    </>
                  </DetailList>
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
                  distances. The three typical types of fronts are the <ColdFront />, the{' '}
                  <WarmFront /> and the{' '}
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
                <Image src="1/cyclogenesis" width={700} noMargin />,
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
                    design maneuvering speed (<Katex>V_a</Katex>)
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
                  <Bold>adverse winds and wind shear</Bold> can be catastrophic.
                </>,
                <>
                  Finally, <Bold>embedded thunderstorms</Bold> are especially dangerous to IFR
                  aircraft because they are, by their nature, difficult to foresee and avoid. If you
                  do end up inside a thunderstorm, the recommended recover procedure is:
                  <DetailList type="bullet">
                    <>
                      Try to maintain a constant <Italic>attitude</Italic>; do not try to maintain a
                      constant <Italic>altitude</Italic> as this will only add stress to the
                      aircraft
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
                <Image src="1/microburst" width={600} noMargin />,
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
                <Paragraph heading="Pilot Response to Icing" hr>
                  If still on the ground, the response is simple: don't take off until all the ice,
                  frost and snow is cleared, and seriously consider not flying at all. If in the air
                  in an aircraft unequipped with FIKI capabilities, the first priority is exiting
                  icing conditions. <Bold>The fastest way out is not always a descent</Bold>. Flying
                  up through a temperature inversion or into a region cooler than -10°C is
                  sufficient.
                </Paragraph>,
                <>
                  Periodically disconnecting the autopilot and hand-flying is a good idea whenever
                  flying in the vicinity of icing conditions. The autopilot may mask an abnormal
                  control surface state; disconnecting it will make this apparent.
                </>,
                <>
                  <Bold italic>Changing the flap configuration may aggrevate the problem!</Bold>{' '}
                  When your airplane is not approved for FIKI and you are accumulating ice,{' '}
                  <Danger>you are now a test pilot!</Danger> If you are concerned that the aircraft
                  is contaminated, but it is currently under control,{' '}
                  <Bold>do not jeopardize that by making unnecessary configuration changes</Bold>.
                </>,
                <>
                  Finally, carry a bit of extra speed on approach. With ice contaminatio the
                  aircraft's stall speed may be significantly higher, potentially greater than the
                  typical final approach speed. Discovering this 300 feet AGL is bad.
                </>,
              ];
            case '3j': // Fog/mist
              return [
                <>
                  Fog is, in effect, a cloud at ground level. It is particularly common in
                  industrial areas to the prevalence of condensation nuclei from combustion
                  products.
                </>,
                <>
                  Fog is <Link href={references.fog.types}>classified by the way it's formed</Link>:
                  <DetailList type="bullet">
                    <>
                      <Bold>Radiation fog</Bold> is formed by the cooling of land after sunset by
                      infrared thermal radiation in calm conditions with a clear sky. The cooling
                      ground then cools adjacent air by conduction, causing the air temperature to
                      fall and reach the dew point, forming fog. Radiation fog occurs at night, and
                      usually does not last long after sunrise, but it can persist all day in the
                      winter months, especially in areas bounded by high ground.{' '}
                      <Link href={references.fog.tule}>Tule fog</Link> is an example of radiation
                      fog.
                    </>
                    <>
                      <Bold>Advection fog</Bold> is formed when moist air passes over a cool surface
                      by advection (wind) and is cooled. It is common at sea when moist air
                      encounters cooler waters, including areas of cold water upwelling, such as
                      along the California coast; it's also common as a warm front passes over an
                      area with significant snow-pack.{' '}
                      <Link href={references.fog.sf}>San Francisco fog</Link> is an example of
                      advection fog.
                    </>
                    <>
                      <Bold>Upslope fog</Bold> is formed when moist air is forced up hill and cools
                      due to <Link href={references.adiabatic_process}>adiabatic cooling</Link>.
                    </>
                  </DetailList>
                </>,
              ];
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
                <Image src="1/jeppesen-10-9" width={800} />,
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
                      <AIM paragraph={[1, 1, 17, 'b', 5, 'c']} />.
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

function ColdFront({ plural = false }: FrontProps) {
  return <Bold color="cold-front">cold front{plural && 's'}</Bold>;
}

function WarmFront({ plural = false }: FrontProps) {
  return <Bold color="warm-front">warm front{plural && 's'}</Bold>;
}

const references = {
  adiabatic_process: uri.wikipedia('Adiabatic_process#Adiabatic_heating_and_cooling'),
  ads_b_fis_b:
    'https://www.aopa.org/news-and-media/all-news/2019/october/flight-training-magazine/weather-ads-b-and-fis-b',
  aim_waas: uri.aim(1, 1, 18),
  awc: {
    graphical_airmet: uri.awc('gairmet'),
    home: uri.awc(),
    forecast_icing: uri.awc('icing/fip'),
    freezing_level: uri.awc('icing/frzlvl'),
    icing_pirep: uri.awc('airep/plot?region=us&type=ice'),
    icing_sigmet: uri.awc('sigmet/plot?type=icing'),
    sigmet: uri.awc('sigmet'),
    sigwx: {
      high: uri.awc('progchart/high'),
      low: uri.awc('progchart/low'),
    },
    surface_analysis: uri.awc('progchart/sfc'),
  },
  fog: {
    types: uri.wikipedia('Fog#Types'),
    sf: uri.wikipedia('San_Francisco_fog'),
    tule: uri.wikipedia('Tule_fog'),
  },
  gfa: uri.awc('gfa'),
  gfa_symbols: uri.awc('metar/symbol'),
  isa: uri.wikipedia('International_Standard_Atmosphere'),
  jeppesen10_9:
    'https://www.boldmethod.com/learn-to-fly/navigation/how-to-use-the-jeppesen-airport-10-9-page/',
  taf_metar_key: uri.aim(7, 1, 28),
  wx_brief: 'https://www.1800wxbrief.com/',
};
