/**
 * Pairs seeds in bracket order. Pass items sorted best seed first.
 * Returns [higherSeed, lowerSeed] pairs; lowerSeed is null when the
 * higher seed gets a bye.
 */
export function pairSeeds<T>(seeds: T[]): Array<[T, T | null]> {
  const n = seeds.length;
  if (n < 2) return [];

  const size = 2 ** Math.ceil(Math.log2(n)); // next power of two

  // Bracket order: [1] -> [1,2] -> [1,4,2,3] -> [1,8,4,5,2,7,3,6]
  let order = [1];
  while (order.length < size) {
    const roundSize = order.length * 2;
    order = order.flatMap((seed) => [seed, roundSize + 1 - seed]);
  }

  const pairs: Array<[T, T | null]> = [];
  for (let i = 0; i < order.length; i += 2) {
    const high = order[i];
    const low = order[i + 1];
    pairs.push([seeds[high - 1], low <= n ? seeds[low - 1] : null]);
  }
  return pairs;
}