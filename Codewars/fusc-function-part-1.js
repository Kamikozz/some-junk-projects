function fusc(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n % 2 === 0) {
    return fusc(n / 2);
  } else {
    return fusc(Math.floor(n / 2)) + fusc(Math.floor(n / 2) + 1);
  }
}

console.log(fusc(10));