function digitalRoot(n) {
  let str = String(n);
  let sum = Number(str[0]);
  if (n < 10) return sum;
  let other = digitalRoot(str.slice(1));
  if (other > 9) {
    return sum + digitalRoot(other)
  } else {
    return digitalRoot(sum + other);
  }
}

console.log(digitalRoot(456));
