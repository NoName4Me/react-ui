/**
 * debounce default @200ms
 * @param func
 * @param wait
 */
export default function debounce(func: Function, wait = 200) {
  let timer: ReturnType<typeof setTimeout>;
  function debounced(this: any, ...args: any[]) {
    const that = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(that, args);
    }, wait);
  }
  debounced.clear = () => {
    clearTimeout(timer);
  };
  return debounced;
}
