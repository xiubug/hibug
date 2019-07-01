let timer;
function debounce(func, delay) {
  return function () {
    const context = this;
    const args = arguments;

    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export default debounce;