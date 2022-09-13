import { NextPage } from 'next';
import React from 'react';

import {
  AIM,
  Bold,
  BulletList,
  Danger,
  Gray,
  Image,
  Info,
  InlineList,
  Italic,
  Katex,
  Link,
  Paragraph,
  Tab,
  Tabs,
  TaskPage,
  Warning,
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
      flags={{ missed: ['3i'] }}
      notes={{
        // Sources of weather data
        k1: [
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
            ), Hazardous In-flight Weather Advisory Service (HIWAS) and other automated reporting
            services. Pilots can also subscribe to SiriusXM for weather broadcasts from satellites,
            which can provide coverage at lower altitudes where ground-based transmitters can't
            reach.
          </>,
        ],

        // Weather products
        k2: [
          <>
            A very large variety of weather products exist to aid in flight planning. There are many
            prognostic charts; a sampling is shown in the tabs below. Additionally, some of the best
            weather information is provided by pilots themselves in the form of <Bold>PIREPs</Bold>,
            which are great for providing information on conditions as they actually are.
          </>,
          <Tabs>
            <Tab heading="GFA">
              <>
                The NWS provides the{' '}
                <Link bold href={references.gfa}>
                  Graphical Forecasts for Aviation
                </Link>{' '}
                (GFA) to provide pilots with the necessary aviation weather information to develop a
                complete picture of the weather that may impact flight in the continental United
                States. It's a great product for observing the general weather conditions over a
                large area.
              </>

              <>
                Know how to read the most common symbols on the charts; the legend is available{' '}
                <Link href={references.gfa_symbols}>here</Link>.
              </>

              <Image src="gfa" />
            </Tab>

            <Tab heading="METARs & TAFs">
              <>
                <Bold>Aviation Routine Weather Report (METARs)</Bold> and{' '}
                <Bold>Terminal Aerodrome Forecasts (TAFs)</Bold> are perhaps the most commonly
                encountered source of weather information. <AIM paragraph={[7, 1, 28]} /> provides a
                key for the products' coded language.
              </>

              <Paragraph heading="TAFs">
                METARs are most thoroughly defined by <Link.Reference reference="AC 00-45" />{' '}
                paragraph 3.1.1 (page 3-1, 29 overall).
              </Paragraph>

              <Paragraph heading="TAFs" hr>
                TAFs are most thoroughly defined by <Link.Reference reference="AC 00-45" />{' '}
                paragraph 5.11 (page 5-75, 204 overall). Miscellaneous facts:
                <BulletList type="disc">
                  <>
                    They describe aviation weather expected to occur during a specific period,{' '}
                    <Bold>within 5 statute miles</Bold> of the center of the airport's runway
                    complex.
                  </>
                  <>
                    Scheduled 24- and 30-hour TAFs are issued four times per day, at 0000, 0600,
                    1200, and 1800Z.
                  </>
                  <>
                    A <Bold>TEMPO</Bold> group is included in the TAF only when forecast
                    meteorological conditions are expected to:
                    <InlineList>
                      <>
                        have a high percentage (greater than 50 percent) probability of occurrence
                      </>
                      <>last for one hour or less in each instance</>
                      <>in the aggregate, cover less than half of the period</>
                    </InlineList>
                    .
                  </>
                </BulletList>
              </Paragraph>
            </Tab>

            <Tab heading="AIRMETs & SIGMETs">
              <>
                <Link bold href={references.awc.graphical_airmet}>
                  Graphical AIRMET
                </Link>{' '}
                and{' '}
                <Link bold href={references.awc.sigmet}>
                  SIGMET
                </Link>{' '}
                charts indicate the location and boundaries for active AIRMETs and SIGMETs. Both
                AIRMETs and SIGMETs are issued by the AWC, and both are considered “widespread”
                because they must be either affecting or be forecasted to affect an area of{' '}
                <Bold>at least 3,000 square miles at any one time.</Bold>
              </>

              <Paragraph heading="AIRMETs">
                AIRMETs are primarily of concern to lighter aircraft. They come in three flavors:{' '}
                <InlineList>
                  <>Sierra (mountain obscuration or IFR)</>
                  <>Tango (turbulence)</>
                  <>Zulu (icing)</>
                </InlineList>
                . Per <AIM paragraph={[7, 1, 6, 'b']} /> they are issued every 6 hours, with a
                maximum forecast period of 6 hours.
              </Paragraph>

              <Paragraph heading="SIGMETs">
                SIGMETs are issued for significant weather hazards that are of concern to all
                aircraft. Examples include:
                <BulletList type="disc">
                  <>Widespread sand or dust storms</>
                  <>Thunderstorms</>
                </BulletList>
              </Paragraph>

              <Image src="graphical_airmets" />
            </Tab>

            <Tab heading="SIGWX">
              <>
                <Bold>Significant Weather charts</Bold> come in{' '}
                <Link bold href={references.awc.sigwx.low}>
                  low (below FL240)
                </Link>{' '}
                and{' '}
                <Link bold href={references.awc.sigwx.high}>
                  high
                </Link>{' '}
                varieties. The low SIGWX chart shows freezing levels, turbulence, and low cloud
                ceilings:
              </>

              <Image src="sigwx_low" />

              <>
                The high SIGWX chart shows thunderstorms, tropical cyclones, moderate or severe
                turbulence, jetstreams, volcanic eruptions and more:
              </>

              <>
                <Image src="sigwx_high" />
              </>
            </Tab>

            <Tab heading="Miscellaneous Charts">
              <Tabs>
                <Tab heading="Surface Analysis">
                  <>
                    The{' '}
                    <Link bold href={references.awc.surface_analysis}>
                      Surface Analysis Chart
                    </Link>{' '}
                    shows useful information regarding front positions, pressure systems, wind
                    intensities and precipitation.
                  </>

                  <Image src="surface_analysis_chart" />
                </Tab>

                <Tab heading="Convective Outlooks">
                  <>
                    <Bold>Convective Outlook</Bold> charts describe prospects for general and severe
                    thunderstorm activity during the following 24 hours. They should be utilized
                    primarily for planning flights later in the day (other products are better
                    suited for getting current weather information)
                  </>

                  <Image src="convective_outlook" />
                </Tab>

                <Tab heading="Constant Pressure">
                  <>
                    See <Link.Reference reference="AC 00-45" /> paragraph 5.15.1 (page 5-103, 232
                    overall). Constant pressure forecasts depict select weather (e.g. wind) at a
                    specified pressure level (e.g. 300 MB) and the altitudes (in meters) of that
                    level.{' '}
                    <Bold>
                      When considered together, constant pressure level forecasts describe the
                      three-dimensional aspect of pressure systems
                    </Bold>
                    , which in turn cause and characterize much of the weather.{' '}
                    <Bold>
                      Typically, lows and troughs are associated with clouds and precipitation while
                      highs and ridges are associated with fair weather
                    </Bold>
                    , except in winter when valley fog may occur. The location and strength of the
                    jet stream can be viewed at 300 MB, 250 MB, and 200 MB levels.
                  </>

                  <Image src="constant_pressure" />
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>,
        ],

        // Meteorology in general
        k3: (
          <>
            There is a <span className="italic">tremendous</span> amount to say about weather and
            its various aspects. Notes in this section will concentrate on weather elements that are
            likely to come up in the oral portion of the test. For discussion of local weather
            phenomena see the following task.
          </>
        ),

        // Atmospheric composition and stability
        k3a: [
          <>
            The{' '}
            <Link bold href={references.isa}>
              International Standard Atmosphere (ISA)
            </Link>{' '}
            is central to understanding how the FAA talks about the atmosphere. On a "standard day"
            the sea level pressure is 29.92"Hg and the air temperature is 15°C. For every thousand
            feet of elevation gain, the pressure drops 1"Hg and the temperature drops 2°C.
          </>,
          <Paragraph heading="Stability">
            <Bold>Atmospheric stability</Bold> is defined as "the resistance of the atmosphere to
            vertical perturbation." If the ambient lapse rate is greater than the{' '}
            <Bold>dry adiabatic lapse rate of 3°C per thousand feet</Bold>--that is, if air
            temperature decreases at a rate greater than 3°C/1000ft--then a parcel of air displaced
            upwards won't cool as quickly as the air around it and thus will be pushed further
            upwards. This is an unstable parcel.
          </Paragraph>,
          <>
            The general characteristics of unstable air include{' '}
            <InlineList>
              <>good visibility</>
              <>showery precipitation</>
              <>cumuliform-type clouds</>
              <>turbulent air</>
            </InlineList>
            . By contrast, characteristics of stable air include{' '}
            <InlineList>
              <>poor visibility</>
              <>steady precipitation</>
              <>stratus-type clouds</>
              <>smooth air</>
            </InlineList>
            .
          </>,

          <Paragraph heading="Composition">
            The layer of the atmosphere in which virtually all weather and flying activities occur
            is the <Bold>troposphere</Bold>. The layer above that is the <Bold>stratosphere</Bold>,
            which has significantly different characteristics. For example,{' '}
            <Gray italic>
              temperature increases with altitude, and it changes relatively slowly
            </Gray>
            .
          </Paragraph>,

          <>
            The interface between the troposphere and stratosphere is called the{' '}
            <Bold>tropopause</Bold>. Its height varies by latitude (
            <Bold color="cold">~20,000'</Bold> at the poles, <Bold color="warm">37,000'</Bold> in
            the mid-latitudes and <Bold color="hot">65,000'</Bold> at the equator) and season
            (higher in summer). The tropopause is characterized by an abrupt change in lapse rate
            and strong winds.
          </>,
        ],

        // Wind
        k3b: [
          <>
            Wind has many impacts on aviation. In this part of the country they are predominantly
            north-westerly. During departure and arrival the winds are crucial consideration for
            runway selection. En route they can push you faster, slow you down or simply blow you
            off course.
          </>,
          <Tabs>
            <Tab heading="Macro-Systems">
              <>
                In the northern hemisphere:
                <BulletList>
                  <>
                    Air circulates clockwise around high pressure systems and counterclockwise
                    around low pressure systems
                  </>
                  <>
                    The steeper the pressure gradient, the closer the isobars, the stronger the
                    winds (this is also true in the southern hemisphere)
                  </>
                  <>
                    <Bold>Surface friction</Bold> impacts wind speed and direction up to about
                    2,000' AGL. Below this altitude the winds are slower and do not parallel the
                    isobars but rather flow across them from high to low pressure.
                  </>
                  <>
                    The <Bold>Coriolis force</Bold> deflects winds to the right. The faster the
                    winds, the greater the deflection.
                  </>
                </BulletList>
              </>

              <Image src="cyclonic_flow" />
            </Tab>

            <Tab heading="Jetstream">
              The <Bold>jetstream</Bold> is defined as a wind of 50 knots or greater associated with
              the tropopause. It shifts seasonally, extending farther south (and blowing more
              strongly) in the winter.
            </Tab>

            <Tab heading="Hazards">
              <>
                Phenomena like <Link.Reference bold reference="AC 00-54" text="wind shear" /> or{' '}
                <Link.Reference bold reference="AC 00-57" text="mountain wave" /> can be extremely
                hazardous: countless GA accidents have occurred simply because pilots (especially
                instrument pilots!) forget that downwind of a mountain range is a high-risk
                environment.
              </>

              <>
                <Bold>Thunderstorms</Bold> are a source of extremely hazardous windshear and
                microbursts. Windshear can be found on all sides a thunderstorm cell and in the
                downdrafts underneath the cell. The gust front from a thunderstorm can precede the
                storm itself by <Bold>15 miles or more!</Bold>
              </>

              <>
                For reasons not entirely clear to me, wind shear patterns vary between front types:
                <BulletList type="alpha">
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
                </BulletList>
              </>

              <>
                Additionally,{' '}
                <Bold>low-level temperature inversions are common sources of windshear.</Bold>
              </>
            </Tab>
          </Tabs>,
        ],

        // Temperature
        k3c: [
          <>
            Temperature has multiple profound effects on aviation, including{' '}
            <InlineList>
              <>density altitude</>
              <>atmospheric stability</>
              <>water absorption</>
            </InlineList>
            .
          </>,
          <>
            A <Bold>temperature inversion</Bold> occurs when a layer of cold air is trapped beneath
            a layer of warmer air. An inversion is most frequently produced by ground radiation on
            clear nights with light or no winds. This forms a stable layer of air and prevents
            convection and mixing, leading to poor visibility at the surface. Wind shear may be a
            concern when passing through the inversion.
          </>,
        ],

        // Moisture/precipitation
        k3d: [
          <>
            There is always moisture in the air. Moisture becomes precipitation when the air is
            cooled to its <Bold>dew point</Bold>, at which temperature the air is said to have a
            relative humidity of 100% and thus is saturated.
          </>,
          <>
            <Bold>Upward air currents enhance the growth rate of precipitation</Bold>. The turbulent
            currents cause droplets to collide more frequently, leading rapidly to larger droplets
            which the rising air is able to sustain for longer periods of time.
          </>,
        ],

        // Weather system formation
        k3e: [
          <>
            An air mass is{' '}
            <Bold>
              a body of air that covers an extensive area and has fairly uniform properties of
              temperature and moisture
            </Bold>
            . They form when air is allowed to rest or move slowly over a large geographical area,
            when the air acquires the properties of the ground. When an air mass then leaves its
            formation area, it comes into contact with other air masses with different properties.
            The interface between the two masses is known as a <Bold>frontal zone</Bold> or simply a{' '}
            <Bold>front</Bold>.
          </>,
          <>
            Across a front, temperature, humidity and wind often change rapidly over short
            distances. The three typical types of fronts are the <ColdFront />, the <WarmFront />{' '}
            and the{' '}
            {'stationary front'.split('').map((l, i) => (
              <Bold color={i % 2 === 0 ? 'cold' : 'hot'} key={i}>
                {l}
              </Bold>
            ))}
            . An <Bold color="occluded">occluded front</Bold> forms when a fast-moving cold front
            catches up to a slower-moving warm front.
          </>,
          <>
            Quoting from <Link.Reference reference="AC 00-6" /> (chapter 10.3): "A{' '}
            <Bold>wave cyclone</Bold> is a low pressure circulation that forms and moves along a
            front. The circulation about the cyclone center tends to produce a wavelike kink along
            the front.{' '}
            <Bold>Wave cyclones are the primary weather producers in the mid-latitudes</Bold>. They
            are large lows that generally travel from west to east along a front. They last from a
            few days to more than a week."
          </>,
          <Image src="cyclogenesis" />,
        ],

        // Clouds
        k3f: [
          <>
            Clouds are grouped into four families:{' '}
            <InlineList>
              <>high</>
              <>middle</>
              <>low</>
              <>those with extensive vertical development</>
            </InlineList>
            . High clouds are mostly ice crystals and the least likely to be an icing concern.
            Clouds with extensive vertical development are indications of unstable air and are very
            turbulent.
          </>,
          <>
            Cloud formation differs by altitude and atmospheric stability. In an unstable
            atmosphere, clouds will tend to grow vertically and be more cumuliform; in a stable
            atmosphere, clouds will be more stratiform.
          </>,
          <Image src="clouds" />,
          <Tabs>
            <Tab heading="Standing lenticular">
              <>
                <Bold>Altocumulus Standing Lenticular (ACSL)</Bold> clouds are an orographic type of
                cloud, often formed in patches in the shape of almonds. They are caused by wave
                motions in the atmosphere and are frequently seen in mountainous or hilly areas.
                Hills only a few thousand feet high can create them, and they may extend downwind
                for more than 60 miles. The cloud elements form at the windward edge of the cloud
                and are carried to the downwind edge where they evaporate. The cloud as a whole is
                usually stationary or slow moving.
              </>

              <>
                The ACSL clouds indicate the position of the wave crests, but they do not
                necessarily give an indication on the intensity of turbulence or strength of
                updrafts and downdrafts. This is because the clouds depend on both lifting and
                moisture: an ACSL cloud may be visible in weak updrafts where there is an adequate
                supply of moisture, but may not be visible when the environment is very dry, even if
                the wave is intense.
              </>

              <Image src="lenticular_cloud" />
            </Tab>
            <Tab heading="High clouds">
              High clouds are mostly made of ice crystals; ironically these are the least likely to
              contribute to structural icing.
            </Tab>
          </Tabs>,
        ],

        // Turbulence
        k3g: [
          <>
            Turbulence is defined as irregular motion of an aircraft, especially when characterized
            by rapid up-and-down motion caused by a rapid variation of atmospheric wind velocities.
            It's caused by{' '}
            <InlineList>
              <>
                convective currents (<Bold>convective turbulence</Bold>)
              </>
              <>
                obstructions in the wind flow (<Bold>mechanical turbulence</Bold>)
              </>
              <>wind shear</>
            </InlineList>
            .
          </>,
          <>
            Turbulence is reported with four intensity levels:{' '}
            <InlineList>
              <>light</>
              <>moderate</>
              <>severe</>
              <>extreme</>
            </InlineList>
            . Severe turbulence causes the aircraft to be momentarily out of control, while extreme
            turbulence may cause structural damage.
          </>,
          <>
            When encountering severe or extreme turbulence, it's important to reduce aircraft speed
            to the{' '}
            <Bold>
              design maneuvering speed (<Katex>V_a</Katex>)
            </Bold>{' '}
            to lessen airframe stresses. If avoiding severe turbulence becomes impossible, the FAA
            advises "riding the waves" and maintaining a level flight attitude. See also the next
            section on thunderstorms.
          </>,
        ],

        // Thunderstorms/microbursts
        k3h: [
          <>
            Thunderstorms are extremely hazardous to all aircraft and great care should be taken to
            avoid them. There are three necessary ingredients:{' '}
            <InlineList>
              <>sufficiently moist air</>
              <>an unstable atmosphere (i.e. a steep lapse rate)</>
              <>a lifting force</>
            </InlineList>
            .
          </>,
          <>
            There are three stages to thunderstorms:{' '}
            <InlineList>
              <>the cumulus stage (characterized by updrafts and low pressure at the surface)</>
              <>
                the mature stage (the most intense stage, characterized by updrafts, downdrafts and
                precipitation)
              </>
              <>the dissipating stage (characterized by downdrafts)</>
            </InlineList>
          </>,
          <>
            A <Bold>squall line</Bold> is a nonfrontal band of thunderstorms, typically preceding a{' '}
            <ColdFront /> in moist, unstable air. These multicell or supercell thunderstorms are
            extremely hazardous and difficult to navigate around (due to their height and breadth).
          </>,
          <>
            The most significant hazards associated with thunderstorms are{' '}
            <InlineList>
              <>turbulence</>
              <>microbursts</>
              <>
                hail, particularly beneath the <Bold>anvil</Bold>
              </>
            </InlineList>
            . Additionally, lighting can damage avionics equipment, temporarily blind the pilot and
            induce permanent errors in the magnetic compass. Near the ground (i.e. after takeoff, on
            an approach or while landing) <Bold>adverse winds and wind shear</Bold> can be
            catastrophic.
          </>,
          <>
            Finally, <Bold>embedded thunderstorms</Bold> are especially dangerous to IFR aircraft
            because they are, by their nature, difficult to foresee and avoid. If you cannot avoid
            penetrating a thunderstorm, <AIM paragraph={[7, 1, 27, 'c']} /> provides the recommended
            recovery procedure:{' '}
            <BulletList>
              <>
                Keep your eyes inside and on the instruments; looking outside can be temporarily
                blinding due to lightning
              </>
              <>Maintain power settings for a reduced airspeed (maneuvering speed or less)</>
              <>
                Try to maintain a constant <Italic>attitude</Italic>; do not try to maintain a
                constant <Italic>altitude</Italic> as this will only add stress to the aircraft
              </>
              <>
                Don't turn back; making a 180° turn likely prolongs your time in the storm and
                places additional stress on the aircraft
              </>
            </BulletList>
          </>,
          <Paragraph heading="Microbursts">
            Microbursts are short-lived, intense downdrafts which become strong horizontal winds
            near the surface. The downdrafts may be up to <Bold>6,000fpm</Bold>! Microbursts are
            particularly hazardous because an aircraft transiting through one will first experience
            a sudden increase in airspeed and performance followed by an equally sudden (and even
            more dramatic) decrease. The horizontal winds may be up to 45 knots, which means that
            the{' '}
            <Danger>
              headwind-to-tailwind shear experienced in the middle of the microburst may be as much
              as 90 knots!
            </Danger>
          </Paragraph>,
          <>
            An individual microburst typically does not last more than 15 minutes. The most intense
            horizontal winds last only a few minutes. See <AIM paragraph={[7, 1, 24]} /> for more
            information.
          </>,
          <Image src="microburst">
            At Point X, the aircraft enters the microburst zone where a headwind causes it to
            balloon above the normal glideslope. At the center of the microburst, point Y, there is
            a downdraft which causes the aircraft to sink. At point Z, the aircraft enters the most
            lethal zone where a sudden tailwind causes the aircraft to lose airspeed.
          </Image>,
        ],

        // Icing and freezing level
        k3i: [
          <>
            For the best, most thorough discussion of all things icing, see{' '}
            <Link.Reference bold reference="AC 91-74" />.
          </>,

          <Paragraph heading="Icing Conditions">
            For ice to form, there must be <Bold>visible moisture</Bold> and the air must be{' '}
            <Bold>cooled to a temperature of 0°C or less</Bold>. Even if the ambient air temperature
            is greater than 0°C, aerodynamic cooling can lower the temperature of an airfoil below
            freezing.
          </Paragraph>,

          <>
            Icing intensity should be reported using four standardized terms.{' '}
            <AIM paragraph={[7, 1, 19]} /> defines these terms like so:
            <BulletList>
              <>
                <Bold>Trace:</Bold> ice becomes noticeable and accumulates at a slow pace (less than
                ¼ inch per hour on the outer wing)
              </>
              <>
                <Bold>Light:</Bold> the ice accumulates at a rate quick enough as to require
                occasional activation of deicing systems (¼ inch to 1 inch per hour)
              </>
              <>
                <Bold>Moderate:</Bold> the ice accumulates at a rate requiring frequent activation
                of deicing systems (1 to 3 inches per hour)
              </>
              <>
                <Bold>Severe:</Bold> the ice accumulates at a rate that deicing systems cannot
                combat, resulting in ice accumulations in "locations not normally prone to icing,
                such as areas aft of protected surfaces" (greater than 3 inches per hour).{' '}
                <Danger>By regulation, immediate exit is required.</Danger>
              </>
            </BulletList>
          </>,

          <>
            See this <Link href={references.icing_intensities}>AOPA article</Link> for a nuanced
            discussion of the terms, as well as their history and evolution.
          </>,

          <Paragraph heading="Types of Icing" hr>
            There are three types of structural icing:
            <BulletList>
              <>
                Clear ice forms when{' '}
                <Bold>
                  large droplets or freezing rain contact the airframe and spread over the surfaces
                </Bold>
                . This is the most dangerous form of icing as it is{' '}
                <Danger>difficult to see</Danger>. Conditions conducive to clear icing include{' '}
                <InlineList>
                  <>temperatures close to the freezing point</>
                  <>large amounts of liquid water</>
                  <>high airspeed</>
                  <>large droplets</>
                </InlineList>
                .
              </>
              <>
                Rime ice forms{' '}
                <Bold>
                  if the droplets are small and freeze immediately when contacting the airframe
                </Bold>
                . It has a rough appearance and tends to accumulate on leading-edge surfaces.
              </>
              <>
                Mixed ice is a mixture of clear and rime ice and forms when the conditions for both
                clear and rime ice are present simultaneously.
              </>
            </BulletList>
          </Paragraph>,
          <>
            When certain weather phenomena are encountered, it's possible to make inferences about
            the air temperature at a higher altitude:{' '}
            <InlineList>
              <>
                freezing rain indicates higher temperatures above you (the rain forms as liquid
                water and then falls into a freezing layer but does not itself freeze until making
                contact with the aircraft)
              </>
              <>wet snow indicates that the freezing level is above you</>
              <>ice pellets indicate freezing rain above</>
            </InlineList>
            .
          </>,
          <Paragraph heading="Hazards of Structural Icing" hr>
            There are numerous hazards associated with structural icing:
            <BulletList type="disc">
              <>
                Ice affects the shape of the airfoil, which in turn reduces the coefficient of lift
                and the critical angle of attack;{' '}
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
                <Bold>Regulations prohibit takeoff when snow, ice or frost is on the wings.</Bold>
              </>
              <>
                Severe ice accumulation in front of the ailerons may result in a{' '}
                <Danger>roll upset</Danger>, in which the aircraft experiences an uncommanded and
                uncontrolled roll. This is primarily a concern for pilots of aircraft with FIKI
                capability.{' '}
                <Bold>
                  Proper recovery technique is to reduce the AOA by pitching down and increasing
                  speed.
                </Bold>
              </>
              <>
                Ice on the horizontal stabilizer can lead to a <Danger>tailplane stall</Danger>, in
                which the airplane experiences an uncommanded pitch down (because the tailplane is
                no longer applying its compensatory up force). The tailplane is typically one of the
                first places ice will form because it's narrow.{' '}
                <Bold>Ice can also collect faster on the tail than on the wing</Bold>, and because
                it's harder for the pilot to see it may go undetected until the problem becomes
                critical.{' '}
                <Warning>
                  Counterintuitively, lowering the flaps when the tailplane is stalled will only
                  worsen the problem
                </Warning>{' '}
                (see <Link href={references.tailplane_icing}>this article</Link> for a detailed
                explanation).
              </>
            </BulletList>
          </Paragraph>,
          <Paragraph heading="Pilot Response to Icing" hr>
            Preflight briefing for an IFR flight in IMC should always include checking the icing
            forecast and freezing levels. The Aviation Weather Center provides information about
            current icing conditions (<Link href={references.awc.icing_sigmet}>SIGMETs</Link> and{' '}
            <Link href={references.awc.icing_pirep}>PIREPs</Link>),{' '}
            <Link href={references.awc.forecast_icing}>forecast icing</Link> and{' '}
            <Link href={references.awc.freezing_level}>freezing level</Link>.
          </Paragraph>,

          <>
            If still on the ground, the response is simple: don't take off until all the ice, frost
            and snow is cleared, and seriously consider not flying at all. If in the air in an
            aircraft unequipped with FIKI capabilities, the first priority is exiting icing
            conditions. <Bold>The fastest way out is not always a descent</Bold>. Flying up through
            a temperature inversion or into a region cooler than -10°C is sufficient.
          </>,
          <>
            Periodically disconnecting the autopilot and hand-flying is a good idea whenever flying
            in the vicinity of icing conditions. The autopilot may mask an abnormal control surface
            state; disconnecting it will make this apparent.
          </>,
          <>
            <Bold italic>Changing the flap configuration may aggravate the problem!</Bold> When your
            airplane is not approved for FIKI and you are accumulating ice,{' '}
            <Danger>you are now a test pilot!</Danger> If you are concerned that the aircraft is
            contaminated, but it is currently under control,{' '}
            <Bold>do not jeopardize that by making unnecessary configuration changes</Bold>.
          </>,
          <>
            Finally, carry a bit of extra speed on approach. With ice contamination the aircraft's
            stall speed may be significantly higher, potentially greater than the typical final
            approach speed. Discovering this 300 feet AGL is bad.
          </>,
        ],

        // Fog/mist
        k3j: [
          <>
            Fog is, in effect, a cloud at ground level. It is particularly common in industrial
            areas to the prevalence of condensation nuclei from combustion products.
          </>,
          <>
            Fog is <Link href={references.fog.types}>classified by the way it's formed</Link>:
            <BulletList>
              <>
                <Bold>Radiation fog</Bold> is formed by the cooling of land after sunset by infrared
                thermal radiation in calm conditions with a clear sky. The cooling ground then cools
                adjacent air by conduction, causing the air temperature to fall and reach the dew
                point, forming fog. Radiation fog occurs at night, and usually does not last long
                after sunrise, but it can persist all day in the winter months, especially in areas
                bounded by high ground. <Link href={references.fog.tule}>Tule fog</Link> is an
                example of radiation fog.
              </>
              <>
                <Bold>Advection fog</Bold> is formed when moist air passes over a cool surface by
                advection (wind) and is cooled. It is common at sea when moist air encounters cooler
                waters, including areas of cold water upwelling, such as along the California coast;
                it's also common as a warm front passes over an area with significant snow-pack.{' '}
                <Link href={references.fog.sf}>San Francisco fog</Link> is an example of advection
                fog.
              </>
              <>
                <Bold>Upslope fog</Bold> is formed when moist air is forced up hill and cools due to{' '}
                <Link href={references.adiabatic_process}>adiabatic cooling</Link>.
              </>
            </BulletList>
          </>,
        ],

        // Frost
        k3k: (
          <>
            Frost is defined as ice deposits formed on a surface when the surface temperature is at
            or below the dew point and the dew point is below freezing. The rough surface of frost
            spoils the smooth flow of air, causing the air to slow down and separate from the
            airfoil early and leading to a loss of lift.{' '}
            <Danger>
              Frost must be removed prior to flight, as it can reduce lift up to 30% and increase
              drag up to 40%.
            </Danger>
          </>
        ),

        // Obstructions to visibility
        k3l: null,

        // Flight deck weather information
        k4: (
          <>
            Airborne radar is limited in both range and direction (you can only see what's directly
            in front of you). Furthermore, radar returns only detect precipitation.{' '}
            <Danger>It provides no assurance of avoiding IMC or turbulence.</Danger>
          </>
        ),

        // Alternate requirements
        s4: (
          <>
            See <Link.Task section={1} task="C" id="k1" /> for details on alternate planning.
          </>
        ),
      }}
    />
  );
};

export default WeatherInformation;

function ColdFront({ plural = false }: FrontProps) {
  return <Info>cold front{plural && 's'}</Info>;
}

function WarmFront({ plural = false }: FrontProps) {
  return <Danger>warm front{plural && 's'}</Danger>;
}

const references = {
  adiabatic_process: uri.wikipedia('Adiabatic_process#Adiabatic_heating_and_cooling'),
  ads_b_fis_b:
    'https://www.aopa.org/news-and-media/all-news/2019/october/flight-training-magazine/weather-ads-b-and-fis-b',
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
  icing_intensities:
    'https://www.aopa.org/news-and-media/all-news/2009/december/01/wx-watch-icing-intensities',
  isa: uri.wikipedia('International_Standard_Atmosphere'),
  tailplane_icing: uri.boldMethod('maneuvers', 'recovering-from-a-tailplane-stall', true),
  wx_brief: 'https://www.1800wxbrief.com/',
};
