import { Item, Section } from './types';

/** Logs a warning message to the console in dev mode */
export function logWarning(warning: string) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(warning);
  }
}

/**
 * Creates a unique ID for an item given its section and in-section ID. This is not globally unique,
 * but will be unique within the context of a given task.
 */
export function makeAnchorId(
  heading: Section.Headings.List,
  itemId: Item.ID,
  paragraphId?: string
) {
  let id = heading[0].toLowerCase() + itemId;
  if (paragraphId) id += '-' + paragraphId;
  return id;
}

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'] as const;

/** Converts a section Roman numeral to its Arabic equivalent */
export function numeralToNumber(numeral: Section.Numeral) {
  return (numerals.indexOf(numeral) + 1) as Section.Number;
}

/** Converts a section Roman numeral to its Arabic equivalent */
export function numberToNumeral(number: Section.Number): Section.Numeral {
  return numerals[number - 1];
}

/** Basic typeguard for the `in` operator, not sure why this isn't in the TypeScript core lib */
export function objectHasProperty<T>(obj: T, prop: any): prop is keyof T {
  return prop in obj;
}

export const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};
