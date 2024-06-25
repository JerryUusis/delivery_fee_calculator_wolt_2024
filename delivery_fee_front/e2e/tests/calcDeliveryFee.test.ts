import { test, expect, Locator } from "@playwright/test";
import {
  getByDataTestId,
  addValuesToInputs,
  clearDateTimeInput,
  addValueToInput,
} from "./testHelper";
import dayjs from "dayjs";

test.describe("Delivery fee calculation tests", () => {
  let deliveryFee: Locator;
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    deliveryFee = getByDataTestId("deliveryFee", page);
  });
  test.describe("should show alert on submit if", () => {
    test("inputs are in initial state", async ({ page }) => {
      const submitButton = page.getByText("Calculate delivery fee");
      await submitButton.click();
      const alert = getByDataTestId("alertHandler", page);
      expect(alert).toBeVisible();
    });
    test("cart value input is empty", async ({ page }) => {
      await addValuesToInputs(
        "",
        "5",
        "1000",
        dayjs().format("DD.MM.YYYY hh:mm"),
        page
      );
      const alert = getByDataTestId("alertHandler", page);
      alert.waitFor();
      expect(alert).toBeVisible();
    });
    test("items amount input is empty", async ({ page }) => {
      await addValuesToInputs(
        "10",
        "",
        "1000",
        dayjs().format("DD.MM.YYYY hh:mm"),
        page
      );
      const alert = getByDataTestId("alertHandler", page);
      await alert.waitFor();
      expect(alert).toBeVisible();
    });
    test("distance input is empty", async ({ page }) => {
      await addValuesToInputs(
        "10",
        "5",
        "",
        dayjs().format("DD.MM.YYYY hh:mm"),
        page
      );
      const alert = getByDataTestId("alertHandler", page);
      await alert.waitFor();
      expect(alert).toBeVisible();
    });
    test("order time input is empty", async ({ page }) => {
      const cartInput = getByDataTestId("cartValue", page);
      const itemsInput = getByDataTestId("numberOfItems", page);
      const distanceInput = getByDataTestId("deliveryDistance", page);
      const orderTimeInput = getByDataTestId("orderTime", page);
      const submitButton = page.getByRole("button", {
        name: "Calculate delivery fee",
      });
      await addValueToInput(cartInput, "10", page);
      await addValueToInput(itemsInput, "5", page);
      await addValueToInput(distanceInput, "1000", page);
      await orderTimeInput.click();
      await clearDateTimeInput(page);
      await submitButton.click();
      const alert = getByDataTestId("alertHandler", page);
      alert.waitFor();
      expect(orderTimeInput).toHaveValue("");
      expect(alert).toBeVisible();
    });
  });
  test.describe("should return 0", () => {
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
