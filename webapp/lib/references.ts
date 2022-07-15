export const acURI = (acNum: string, prefix: string = 'AC_') =>
  `https://www.faa.gov/documentLibrary/media/Advisory_Circular/${prefix}${acNum}.pdf`;

const farURIBase = 'https://www.law.cornell.edu/cfr/text/14';
export const farURI = (part: number, section?: number) => {
  if (typeof section === 'undefined') return farURIBase + `/part-${part}`;
  return farURIBase + `/${part}.${section}`;
};

const handbooksURIBase =
  'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation';

export const referenceURIs = {
  '14 CFR part 61': farURI(61),
  '14 CFR part 91': farURI(91),
  'AC 00-6': acURI('00-6b'),
  'AC 00-45': acURI('00-45H'),
  'AC 00-54': acURI('00-54', 'AC'),
  'AC 120-108': acURI('120-108'),
  'AC 68-1': acURI('68-1'),
  'AC 91-74': acURI('91-74B'),
  'AC 91.21-1': acURI('91.21-1D'),
  'AIM': 'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/',
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
  'InFO 15012': 'Logging Instrument Approach Procedures',
};
