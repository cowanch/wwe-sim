// src/booking/shared/pairings.test.ts
import { describe, expect, it } from "vitest";
import { pairSeeds } from "./pairings.js";

// [1, 2, ..., n]: each item is its own seed number, so results are easy to read
const seeds = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe("pairSeeds", () => {
  describe("full brackets", () => {
    it("returns no pairs for fewer than two seeds", () => {
      expect(pairSeeds([])).toEqual([]);
      expect(pairSeeds([1])).toEqual([]);
    });

    it("pairs two seeds against each other", () => {
      expect(pairSeeds(seeds(2))).toEqual([[1, 2]]);
    });

    it("pairs 4 seeds as 1v4 and 2v3", () => {
      expect(pairSeeds(seeds(4))).toEqual([
        [1, 4],
        [2, 3],
      ]);
    });

    it("pairs 8 seeds in bracket order", () => {
      expect(pairSeeds(seeds(8))).toEqual([
        [1, 8],
        [4, 5],
        [2, 7],
        [3, 6],
      ]);
    });
  });

  describe("byes", () => {
    it("gives the top seed a bye with 3 seeds", () => {
      expect(pairSeeds(seeds(3))).toEqual([
        [1, null],
        [2, 3],
      ]);
    });

    it("gives seeds 1 and 2 byes with 6 seeds", () => {
      expect(pairSeeds(seeds(6))).toEqual([
        [1, null],
        [4, 5],
        [2, null],
        [3, 6],
      ]);
    });

    it.each([3, 5, 6, 7, 9, 12])(
      "gives byes only to the top seeds (%i seeds)",
      (n) => {
        const size = 2 ** Math.ceil(Math.log2(n));
        const byeSeeds = pairSeeds(seeds(n))
          .filter(([, low]) => low === null)
          .map(([high]) => high)
          .sort((a, b) => a - b);

        expect(byeSeeds).toEqual(seeds(size - n));
      }
    );
  });

  describe("bracket structure", () => {
    it.each(Array.from({ length: 32 }, (_, i) => i + 2))(
      "places every seed exactly once (%i seeds)",
      (n) => {
        const placed = pairSeeds(seeds(n))
          .flat()
          .filter((s): s is number => s !== null)
          .sort((a, b) => a - b);

        expect(placed).toEqual(seeds(n));
      }
    );

    it.each([4, 8, 16, 32])(
      "puts seeds 1 and 2 in opposite halves (%i seeds)",
      (n) => {
        const pairs = pairSeeds(seeds(n));
        const inTopHalf = (seed: number) =>
          pairs.findIndex(([a, b]) => a === seed || b === seed) < pairs.length / 2;

        expect(inTopHalf(1)).toBe(true);
        expect(inTopHalf(2)).toBe(false);
      }
    );

    it("keeps the top four seeds in separate quarters of a 16-seed bracket", () => {
      const pairs = pairSeeds(seeds(16));
      const quarterOf = (seed: number) =>
        Math.floor(pairs.findIndex(([a, b]) => a === seed || b === seed) / 2);

      const quarters = [1, 2, 3, 4].map(quarterOf);
      expect(new Set(quarters).size).toBe(4);
    });
  });

  describe("input handling", () => {
    it("does not mutate its input", () => {
      const input = seeds(8);
      const copy = [...input];

      pairSeeds(input);

      expect(input).toEqual(copy);
    });

    it("works with objects and preserves references", () => {
      const items = [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }];

      const [[first, second]] = pairSeeds(items);

      expect(first).toBe(items[0]);
      expect(second).toBe(items[3]);
    });
  });

  describe("championship tournament parity", () => {
    it("seeds the wwe championship tournament correctly", () => {
      
    })
  })
});
