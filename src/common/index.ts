export const noop = (...arg: any[]) => {}; // eslint-disable-line
/**
 * 是否为空字符串或 undefined 或 null
 * @param val
 */
export const isEmptyValue = (val: any) => val === undefined || val === null || val === ''; // eslint-disable-line @typescript-eslint/no-explicit-any

export * from './const';
export * from './BaseProps';
export * from './BaseTypes';
export * from './prop-types';
