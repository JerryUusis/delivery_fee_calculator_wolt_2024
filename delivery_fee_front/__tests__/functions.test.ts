import { distanceTestCases } from "./testHelper";
import {
  calculateSmallCartSurcharge,
  calculateDistancePrice,
  calculateItemsPrice,
  calculateDeliveryFee,
} from "../utils/library";

describe("calculateSmallCartSurcharge()", () => {
  describe("cart value is more 10 or more", () => {
    for (let i = 10; i < 15; i++) {
      test(`cartValue ${i} should return 0`, () => {
        expect(calculateSmallCartSurcharge(i)).toBe(0);
      });
    }
  });
  describe("cart value is less than 10", () => {
    for (let i = 0; i < 9; i++) {
      test(`cart value ${i} should return ${10 - i}`, () => {
        expect(calculateSmallCartSurcharge(i)).toBe(10 - i);
      });
    }
  });
  describe("should return correct decimals", () => {
    test("with value 9.99", () => {
      expect(calculateSmallCartSurcharge(9.99)).toBe(0.01);
    });
    test("with value 6.66", () => {
      expect(calculateSmallCartSurcharge(6.66)).toBe(3.34);
    });
    test("with value 3.14", () => {
      expect(calculateSmallCartSurcharge(3.14)).toBe(6.86);
    });
    test("with value 5.55", () => {
      expect(calculateSmallCartSurcharge(5.55)).toBe(4.45);
    });
    test("with value 0.01", () => {
      expect(calculateSmallCartSurcharge(0.01)).toBe(9.99);
    });
  });
});

describe("calculateDistancePrice()", () => {
  distanceTestCases.forEach(({ distance, expected }) => {
    test(`distance of ${distance}m should return ${expected}`, () => {
      expect(calculateDistancePrice(distance)).toBe(expected);
    });
  });
});

describe("calculateItemsPrice()", () => {
  describe("is less than 5", () => {
    for (let i = 0; i < 5; i++) {
      test(`${i} items should return 0`, () => {
        expect(calculateItemsPrice(i)).toBe(0);
      });
    }
  });
  describe("items amount is between 5 and 12", () => {
    for (let i = 5; i < 13; i++) {
      test(`${i} items should return ${(i - 4) * 0.5}`, () => {
        expect(calculateItemsPrice(i)).toBe((i - 4) * 0.5);
      });
    }
  });
  describe("items amount is between 13 and 32", () => {
    for (let i = 13; i < 32; i++) {
      test(`${i} items should return ${(i - 4) * 0.5 + 1.2}`, () => {
        expect(calculateItemsPrice(i)).toBe((i - 4) * 0.5 + 1.2);
      });
    }
  });
  // Maximum price for items is 15
  describe("items amount is over 32", () => {
    for (let i = 33; i < 40; i++) {
      test(`${i} items should return 15`, () => {
        expect(calculateItemsPrice(i)).toBe(15);
      });
    }
  });
});

// (cartValue, smallCartSurcharge, distancePrice, itemsPrice, isRushHour)
describe("calculateDeliveryFee()", () => {
  describe("should return 0", () => {
    test("when cartValue is 200e", () => {
      expect(calculateDeliveryFee(200, 0, 20, 20, false)).toBe(0);
    });
    test("when cartValue is 201e", () => {
      expect(calculateDeliveryFee(201, 0, 20, 20, false)).toBe(0);
    });
    test("when cartValue is 300e", () => {
      expect(calculateDeliveryFee(300, 0, 20, 20, false)).toBe(0);
    });
  });
  describe("should return 15e", () => {
    test("when distancePrice is 15e", () => {
      expect(calculateDeliveryFee(0, 0, 15, 0, false)).toBe(15);
    });
    test("when itemsPrice is 15e", () => {
      expect(calculateDeliveryFee(0, 0, 0, 15, false)).toBe(15);
    });
    test("when sum of arguments is more than 15e", () => {
      expect(calculateDeliveryFee(0, 6, 6, 6, false)).toBe(15);
    });
    test("when sum of arguments is more than 15e with rush hour multiplier", () => {
      expect(calculateDeliveryFee(0, 6, 6, 6, true)).toBe(15);
    });
  });
  describe("should return", () => {
    describe("when isRushHour is false", () => {
      test("arguments sum is 3", () => {
        expect(calculateDeliveryFee(0, 1, 1, 1, false)).toBe(3);
      });
      test("arguments sum is 6", () => {
        expect(calculateDeliveryFee(0, 2, 2, 2, false)).toBe(6);
      });
      test("arguments sum is 9", () => {
        expect(calculateDeliveryFee(0, 3, 3, 3, false)).toBe(9);
      });
      test("arguments sum is 12", () => {
        expect(calculateDeliveryFee(0, 4, 4, 4, false)).toBe(12);
      });
      test("arguments sum is 14", () => {
        expect(calculateDeliveryFee(0, 5, 5, 4, false)).toBe(14);
      });
      test("arguments sum is 15", () => {
        expect(calculateDeliveryFee(0, 5, 5, 5, false)).toBe(15);
      });
      test("arguments sum is 3.33", () => {
        expect(calculateDeliveryFee(0, 1.11, 1.11, 1.11, false)).toBe(3.33);
      });
      test("arguments sum is 5.12", () => {
        expect(calculateDeliveryFee(0, 2.5, 2.5, 0.12, false)).toBe(5.12);
      });
      test("arguments sum is 6.66", () => {
        expect(calculateDeliveryFee(0, 2.22, 2.22, 2.22, false)).toBe(6.66);
      });
      test("arguments sum is 9.99", () => {
        expect(calculateDeliveryFee(0, 3.33, 3.33, 3.33, false)).toBe(9.99);
      });
      test("arguments sum is 14.99", () => {
        expect(calculateDeliveryFee(0, 10, 2.5, 2.49, false)).toBe(14.99);
      });
    });
    describe("when isRushHour is true", () => {
      test("arguments sum is 3", () => {
        expect(calculateDeliveryFee(0, 1, 1, 1, true)).toBe(
          parseFloat((3 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 6", () => {
        expect(calculateDeliveryFee(0, 2, 2, 2, true)).toBe(
          parseFloat((6 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 9", () => {
        expect(calculateDeliveryFee(0, 3, 3, 3, true)).toBe(
          parseFloat((9 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 12", () => {
        expect(calculateDeliveryFee(0, 4, 4, 4, true)).toBe(
          parseFloat((12 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 3.33", () => {
        expect(calculateDeliveryFee(0, 1.11, 1.11, 1.11, true)).toBe(
          parseFloat((3.33 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 5.12", () => {
        expect(calculateDeliveryFee(0, 2.5, 2.5, 0.12, true)).toBe(
          parseFloat((5.12 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 6.66", () => {
        expect(calculateDeliveryFee(0, 2.22, 2.22, 2.22, true)).toBe(
          parseFloat((6.66 * 1.2).toFixed(2))
        );
      });
      test("arguments sum is 9.99", () => {
        expect(calculateDeliveryFee(0, 3.33, 3.33, 3.33, true)).toBe(
          parseFloat((9.99 * 1.2).toFixed(2))
        );
      });
    });
  });
});
