/** Basic typeguard for the `in` operator, not sure why this isn't in the TypeScript core lib */
export function objectHasProperty<T>(obj: T, prop: any): prop is keyof T {
  return prop in obj;
}
