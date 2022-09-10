const cornell14CFR = 'https://www.law.cornell.edu/cfr/text/14';
export const uri = {
  ac: (acNum: string, prefix: string = 'AC_') =>
    uri.faa_docs('Advisory_Circular', `${prefix}${acNum}.pdf`),

  aim: (chapter?: number, section?: number, paragraph?: number) => {
    const aimURIBase = uri.atc('publications/atpubs/aim_html/');
    if (typeof chapter === 'undefined') return aimURIBase;
    if (typeof section === 'undefined') return aimURIBase + `chap_${chapter}.html`;

    let sectionURI = aimURIBase + `chap${chapter}_section_${section}.html`;
    if (typeof chapter === 'undefined') return sectionURI;

    const paraSuffix = [chapter, section, paragraph].join('-');
    return aimURIBase + `chap${chapter}_section_${section}.html#$paragraph${paraSuffix}`;
  },

  atc: (rest: string) => `https://www.faa.gov/air_traffic/${rest}`,

  aviation_news_talk: (episode?: keyof typeof aviationNewsTalkEpisodes) => {
    const baseUrl = 'https://aviationnewstalk.com';
    if (!episode) return baseUrl;
    const episodeId = [episode, aviationNewsTalkEpisodes[episode]].join('-');
    return [baseUrl, 'episode', episodeId].join('/');
  },

  awc: (r?: string) => `https://www.aviationweather.gov/${r ? r : ''}`,

  boldMethod: (section: string, article: string, blog = false) =>
    `https://www.boldmethod.com/${blog ? 'blog/' : ''}learn-to-fly/${section}/${article}/`,

  faa_docs: (...components: string[]) =>
    `https://www.faa.gov/documentLibrary/media/${components.join('/')}`,

  far: (part: number, section?: number) => {
    if (typeof section === 'undefined') return cornell14CFR + `/part-${part}`;
    return cornell14CFR + `/${part}.${section}`;
  },

  farAppendix: (part: number, letter: string) => {
    return cornell14CFR + `/appendix-${letter}_to_part_${part}`;
  },

  ifr_mag: (section: string, id: string) => `https://www.ifr-magazine.com/${section}/${id}/`,
  tso: (rest: string) => `https://rgl.faa.gov/Regulatory_and_Guidance_Library/rgTSO.nsf/0/${rest}`,
  wikipedia: (article: string) => `https://en.wikipedia.org/wiki/${article}`,
  youtube: (id: string) => `https://www.youtube.com/watch?v=${id}`,
};

const handbooksURIBase =
  'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation';

const aviationNewsTalkEpisodes = {
  245: 'what-you-need-to-know-about-tis-tas-and-ads-b-traffic-systems-ga-news',
};

export const referenceURIs = {
  '14 CFR part 61': uri.far(61),
  '14 CFR part 91': uri.far(91),
  'AC 00-6': uri.ac('00-6b'),
  'AC 00-45': uri.ac('00-45H'),
  'AC 00-54': uri.ac('00-54', 'AC'),
  'AC 00-57': uri.ac('00-57', ''),
  'AC 120-108': uri.ac('120-108'),
  'AC 68-1': uri.ac('68-1'),
  'AC 90-66B': uri.ac('90-66b'),
  'AC 91-74': uri.ac('91-74B'),
  'AC 91.21-1': uri.ac('91.21-1D'),
  'AIM': uri.aim(),
  'FAA-H-8083-2': 'https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf',
  'FAA-H-8083-3': `${handbooksURIBase}/airplane_handbook/00_afh_full.pdf`,
  'FAA-H-8083-15': `${handbooksURIBase}/FAA-H-8083-15B.pdf`,
  'FAA-H-8083-16': `${handbooksURIBase}/instrument_procedures_handbook/FAA-H-8083-16B.pdf`,
  'FAA-H-8083-25': 'https://www.faa.gov/sites/faa.gov/files/2022-03/pilot_handbook.pdf',
  'g1000': 'https://static.garmin.com/pumac/190-00498-08_0A_Web.pdf',
  'IFP': uri.atc('flight_info/aeronav/procedures/'),
  'InFO 15012':
    'https://www.faa.gov/other_visit/aviation_industry/airline_operators/airline_safety/info/all_infos/media/2015/info15012.pdf',
  'TSO-C145': uri.tso('efe54f1e6272a7068625811d0064b679/$FILE/TSO-C145e.pdf'),
  'TSO-C146': uri.tso('76fa4ba66612622a86257282006d332a/$FILE/TSO-C146b%20(3-2-07%20Revised).pdf'),
};

export const referenceNames = {
  'AC 00-6': 'AC 00-6 (Aviation Weather)',
  'AC 00-45': 'AC 00-45 (Aviation Weather Services)',
  'AC 00-54': 'AC 00-54 (Pilot Windshear Guide)',
  'AC 00-57': 'AC 00-57 (Hazardous Mountain Winds)',
  'AC 120-108': 'AC 120-108 (Continuous Descent Final Approach)',
  'AC 68-1': 'AC 68-1 (Alternative Pilot Physical Examination and Education Requirements)',
  'AC 90-66B': 'AC 90-66B (Non-Towered Airport Flight Operations)',
  'AC 91-74': 'AC 91-74 (Pilot Guide: Flight in Icing Conditions)',
  'AC 91.21-1': 'AC 91.21-1 (Use of Portable Electronic Devices Aboard Aircraft)',
  'FAA-H-8083-2': 'Risk Management Handbook',
  'FAA-H-8083-3': 'Airplane Flying Handbook',
  'FAA-H-8083-15': 'Instrument Flying Handbook',
  'FAA-H-8083-16': 'Instrument Procedures Handbook',
  'FAA-H-8083-25': 'PHAK',
  'g1000': "G1000 Pilot's Guide",
  'IFP': 'Instrument Flight Procedures',
  'InFO 15012': 'InFO 15012: Logging Instrument Approach Procedures',
  'TSO-C145':
    'Airborne Navigation Sensors Using The Global Positioning System Augmented By The Satellite Based Augmentation System (SBAS)',
  'TSO-C146':
    'Stand-Alone Airborne Navigation Equipment Using The Global Positioning System Augmented By The Satellite Based Augmentation System',
};
