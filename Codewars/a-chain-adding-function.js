

// function add(n) {
//   const obj = (newN) => add(n + newN);
//   obj.toString = () => n;

//   return obj;
// }

const add = n => {
  const localN = n;
  const newAddFunction = (newN) => add(localN + newN);
  newAddFunction.toString = () => localN;
  return newAddFunction;
}

let a = add(2);

console.log(a);
console.log(a + 5);
console.log(a(3));
console.log(a(3)(5) + 0);