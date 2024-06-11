import { distanceTestCases } from "./testHelper";
import { calculateDistancePrice, calculateItemsPrice } from "../utils/library";

describe("calculateDistancePrice()", () => {
  distanceTestCases.forEach(({ distance, expected }) => {
    test(`distance of ${distance}m should return ${expected}`, () => {
      expect(calculateDistancePrice(distance)).toEqual(expected);
    });
  });
});

describe("calculateItemsPrice()", () => {
  describe("is less than 5", () => {
    for (let i = 0; i < 5; i++) {
      test(`${i} items should return 0`, () => {
        expect(calculateItemsPrice(i)).toEqual(0);
      });
    }
  });
  describe("items amount is between 5 and 12", () => {
    for (let i = 5; i < 13; i++) {
      test(`${i} items should return ${(i - 4) * 0.5}`, () => {
        expect(calculateItemsPrice(i)).toEqual((i - 4) * 0.5);
      });
    }
  });
  describe("items amount is between 13 and 32", () => {
    for (let i = 13; i < 32; i++) {
      test(`${i} items should return ${(i - 4) * 0.5 + 1.2}`, () => {
        expect(calculateItemsPrice(i)).toEqual((i - 4) * 0.5 + 1.2);
      });
    }
  });
  // Maximum price for items is 15
  describe("items amount is over 32", () => {
    for (let i = 33; i < 40; i++) {
      test(`${i} items should return 15`, () => {
        expect(calculateItemsPrice(i)).toEqual(15);
      });
    }
  });
});
