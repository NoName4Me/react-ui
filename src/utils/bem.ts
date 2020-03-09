type StringKeyObject = {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
type emType = string | StringKeyObject | (string | StringKeyObject)[];

const getTruthKeys = (target: StringKeyObject) => Object.keys(target).filter(key => target[key]);
const stringify = (target: emType): string[] => {
  if (!target) return [''];
  if (typeof target === 'string') {
    return [target];
  }
  if (Array.isArray(target)) {
    let res: string[] = [];
    target.forEach(item => {
      res = res.concat(stringify(item));
    });
    return res;
  }
  return getTruthKeys(target);
};

/**
 * BEM 类生成器
 *
 * @param block
 * @param element
 * @param modifier
 */
export const bem = (block: string, element: emType = '', modifier: emType = '') => {
  if (!element && !modifier) return block;
  const elementList = stringify(element || '');
  const modifierList = stringify(modifier || '');
  let result = [block];
  if (elementList.length) {
    result = elementList.map(e => (e ? `${block}__${e}` : block));
  }
  if (modifierList.length) {
    result = result.map(be => modifierList.map(m => (m ? `${be}--${m}` : be)).join(' '));
  }

  return result.join(' ');
};
