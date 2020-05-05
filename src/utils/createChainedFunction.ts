/**
 *
 * @param funcs
 */
export default function createChainedFunction(...funcs: Function[]) {
  return funcs.reduce(
    (res, func) => {
      if (func === null) {
        return res;
      }
      return function chainedFunction(this: any, ...args: any[]) {
        res.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}
