import { Item, Section } from '../lib/types';

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

/**
 * Creates a unique ID for an item given its section and in-section ID. This is not globally unique,
 * but will be unique within the context of a given task.
 */
export function makeItemID(heading: Section.Headings.List, id: Item.ID) {
  const shorthand = heading === 'Risk Management' ? 'risk' : heading.toLowerCase();
  return [shorthand, id].join('-');
}
