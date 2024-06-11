import { distanceTestCases } from "./testHelper";
import {
  calculateSmallCartSurcharge,
  calculateDistancePrice,
  calculateItemsPrice,
} from "../utils/library";

describe("calculateSmallCartSurcharge()", () => {
  describe("cart value is less than 10", () => {
    for (let i = 0; i < 9; i++) {
      test(`cart value ${i} should return ${10 - i}`, () => {
        expect(calculateSmallCartSurcharge(i)).toEqual(10 - i);
      });
    }
  });
  describe("should return correct decimals", () => {
    test("with value 9.99", () => {
      expect(calculateSmallCartSurcharge(9.99)).toEqual(0.01);
    });
    test("with value 6.66", () => {
      expect(calculateSmallCartSurcharge(6.66)).toEqual(3.34);
    });
    test("with value 3.14", () => {
      expect(calculateSmallCartSurcharge(3.14)).toEqual(6.86);
    });
    test("with value 5.55", () => {
      expect(calculateSmallCartSurcharge(5.55)).toEqual(4.45);
    });
    test("with value 0.01", () => {
      expect(calculateSmallCartSurcharge(0.01)).toEqual(9.99);
    });
  });
  describe("cart value is more 10 or more", () => {
    for (let i = 10; i < 15; i++) {
      test(`cartValue ${i} should return 0`, () => {
        expect(calculateSmallCartSurcharge(i)).toEqual(0);
      });
    }
  });
});

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
