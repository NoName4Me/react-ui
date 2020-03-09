import { bem } from '../index';

describe('工具方法测试', () => {
  test('bem', () => {
    expect(bem('b', undefined, '')).toBe('b');
    expect(bem('b', undefined, undefined)).toBe('b');
    expect(bem('b', '', 'm')).toBe('b--m');
    expect(bem('b', undefined, 'm')).toBe('b--m');
    expect(bem('b', 'e', '')).toBe('b__e');
    expect(bem('b', 'e', 'm')).toBe('b__e--m');
    expect(bem('b', { e: true }, 'm')).toBe('b__e--m');
    expect(bem('b', { e: false }, 'm')).toBe('b--m');
    expect(bem('b', { e: true }, { m: true })).toBe('b__e--m');
    expect(bem('b', { e1: false, e2: true }, { m1: true, m2: false, m3: true })).toBe('b__e2--m1 b__e2--m3');
    expect(bem('b', ['e1', 'e2'], 'm')).toBe('b__e1--m b__e2--m');
    expect(bem('b', ['', 'e2'], 'm')).toBe('b--m b__e2--m');
    expect(bem('b', [{ e1: false, e2: true }, 'e3'], { m1: true, m2: false })).toBe('b__e2--m1 b__e3--m1');
    expect(bem('b', [{ e1: false, e2: false }, 'e3'], [{ m1: true, m2: false }, 'm3'])).toBe('b__e3--m1 b__e3--m3');
  });
});
