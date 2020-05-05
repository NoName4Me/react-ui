import { debounce } from '../index';

jest.useFakeTimers();
describe('debounce 工具方法测试', () => {
  test('debounce works', function () {
    const callback = jest.fn();
    const debounced = debounce(callback);

    debounced();
    debounced();
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('debounce 未执行任务可以被取消', function () {
    const callback = jest.fn();
    const debounced = debounce(callback);

    debounced();
    expect(callback).not.toBeCalled();

    debounced.clear();
    jest.advanceTimersByTime(500);
    expect(callback).not.toBeCalled();
  });
});
