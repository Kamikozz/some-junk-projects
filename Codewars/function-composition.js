function compose(f, g) {
  const args = [...arguments].reverse();
  const func = function() {
    let temp = args[0](...arguments);
    args.slice(1).forEach(val => temp = val(temp));
    return temp;
  }
  return func;
}