export function sum(arr) {
  let sum = arr.reduce((a, b) => a + b.value * 1, 0).toFixed(2);
  return sum;
}
