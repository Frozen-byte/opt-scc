export type Timestamp = number;
export type Hyperlink = string;

export function isDefinedGuard<T>(arg: T | null | undefined): arg is T {
  return arg !== null && arg !== undefined;
}
