import { Data } from '../lib';
import aimJson from './aim.json';
import farJson from './far.json';

export const aim: Data.AIM = aimJson;

// TypeScript is performing an unhelpful type inference on the farJson object, leading it to
// complain that:
//
//   The types of 'parts[43]' are incompatible between these types
//     Type 'string[]' is not comparable to type 'Part.Content'
//       Target requires 2 element(s) but source may have fewer
//
// In other words it is inferring the type of parts[43] to be string[] and then complains when I
// attempt to declare its type as  [string, string]. Thus the cast to unknown
export const far = farJson as unknown as Data.FAR;
