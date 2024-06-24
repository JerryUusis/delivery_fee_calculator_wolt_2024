import { test, expect, Locator } from "@playwright/test";
import { getByDataTestId, addValuesToInputs } from "./testHelper";
import dayjs from "dayjs";

test.describe("Delivery fee calculation tests", () => {
  let deliveryFee: Locator;
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    deliveryFee = getByDataTestId("deliveryFee", page);
  });
  test.describe("Should return 0", () => {
    test.describe("when cart value is 200e or more", () => {
      const testValues = ["200", "201", "250", "300"];
      for (const testValue of testValues) {
        test(`cart value is ${testValue}`, async ({ page }) => {
          await addValuesToInputs(
            testValue,
            "5",
            "1001",
            dayjs().format("DD.MM.YYYY hh:mm"),
            page
          );
          await expect(deliveryFee).toHaveText("0");
        });
      }
    });
  });
});
