export const uri = {
  ac: (acNum: string, prefix: string = 'AC_') =>
    uri.faa_docs('Advisory_Circular', `${prefix}${acNum}.pdf`),

  aim: (chapter?: number, section?: number, paragraph?: number) => {
    const aimURIBase = 'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/';
    if (typeof chapter === 'undefined') return aimURIBase;
    if (typeof section === 'undefined') return aimURIBase + `chap_${chapter}.html`;

    let sectionURI = aimURIBase + `/chap${chapter}_section_${section}.html`;
    if (typeof chapter === 'undefined') return sectionURI;

    const paraSuffix = [chapter, section, paragraph].join('-');
    return aimURIBase + `/chap${chapter}_section_${section}.html#$paragraph${paraSuffix}`;
  },

  awc: (r?: string) => `https://www.aviationweather.gov/${r ? r : ''}`,

  faa_docs: (...components: string[]) =>
    `https://www.faa.gov/documentLibrary/media/${components.join('/')}`,

  far: (part: number, section?: number) => {
    const farURIBase = 'https://www.law.cornell.edu/cfr/text/14';
    if (typeof section === 'undefined') return farURIBase + `/part-${part}`;
    return farURIBase + `/${part}.${section}`;
  },

  wikipedia: (article: string) => `https://en.wikipedia.org/wiki/${article}`,
};

const handbooksURIBase =
  'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation';

export const referenceURIs = {
  '14 CFR part 61': uri.far(61),
  '14 CFR part 91': uri.far(91),
  'AC 00-6': uri.ac('00-6b'),
  'AC 00-45': uri.ac('00-45H'),
  'AC 00-54': uri.ac('00-54', 'AC'),
  'AC 00-57': uri.ac('00-57', ''),
  'AC 120-108': uri.ac('120-108'),
  'AC 68-1': uri.ac('68-1'),
  'AC 91-74': uri.ac('91-74B'),
  'AC 91.21-1': uri.ac('91.21-1D'),
  'AIM': uri.aim(),
  'FAA-H-8083-2': 'https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf',
  'FAA-H-8083-3': `${handbooksURIBase}/airplane_handbook/00_afh_full.pdf`,
  'FAA-H-8083-15': `${handbooksURIBase}/FAA-H-8083-15B.pdf`,
  'FAA-H-8083-16': `${handbooksURIBase}/instrument_procedures_handbook/FAA-H-8083-16B.pdf`,
  'FAA-H-8083-25': 'https://www.faa.gov/sites/faa.gov/files/2022-03/pilot_handbook.pdf',
  'IFP': 'https://www.faa.gov/air_traffic/flight_info/aeronav/procedures/',
  'InFO 15012':
    'https://www.faa.gov/other_visit/aviation_industry/airline_operators/airline_safety/info/all_infos/media/2015/info15012.pdf',
};

export const referenceNames = {
  'AC 00-6': 'AC 00-6 (Aviation Weather)',
  'AC 00-45': 'AC 00-45 (Aviation Weather Services)',
  'AC 00-54': 'AC 00-54 (Pilot Windshear Guide)',
  'AC 00-57': 'AC 00-57 (Hazardous Mountain Winds)',
  'AC 120-108': 'AC 120-108 (Continuous Descent Final Approach)',
  'AC 68-1': 'AC 68-1 (Alternative Pilot Physical Examination and Education Requirements)',
  'AC 91-74': 'AC 91-74 (Pilot Guide: Flight in Icing Conditions)',
  'AC 91.21-1': 'AC 91.21-1 (Use of Portable Electronic Devices Aboard Aircraft)',
  'FAA-H-8083-2': 'Risk Management Handbook',
  'FAA-H-8083-3': 'Airplane Flying Handbook',
  'FAA-H-8083-15': 'Instrument Flying Handbook',
  'FAA-H-8083-16': 'Instrument Procedures Handbook',
  'FAA-H-8083-25': 'PHAK',
  'IFP': 'Instrument Flight Procedures',
  'InFO 15012': 'InFO 15012: Logging Instrument Approach Procedures',
};
