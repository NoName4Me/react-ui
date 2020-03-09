import Notification from './Notification';

const _box: { [key: string]: Notification[] } = {
  left: [],
  right: [],
  bottom: [],
  top: [],
  'left-top': [],
  'left-bottom': [],
  'right-top': [],
  'right-bottom': [],
};

export const box = new Proxy(_box, {
  get(obj, prop: string) {
    if (prop === 'top-left') {
      return obj['left-top'];
    }
    if (prop === 'top-right') {
      return obj['right-top'];
    }
    if (prop === 'bottom-right') {
      return obj['right-bottom'];
    }
    if (prop === 'bottom-left') {
      return obj['left-bottom'];
    }

    return obj[prop];
  },
  set(obj, prop: string, value: Notification[]) {
    obj[prop] = value;
    return true;
  },
});
