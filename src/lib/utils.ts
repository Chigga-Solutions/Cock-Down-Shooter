export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function decideBetween<T>(a: T, b: T): T {
  return Math.random() > 0.5 ? a : b;
}