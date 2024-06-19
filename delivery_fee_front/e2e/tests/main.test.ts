import { test, expect, Locator } from "@playwright/test";
import { getByDataTestId } from "./testHelper";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});
// Have dev server running in localhost:5173
test.describe("delivery fee calculator app", () => {
  test("should have title and inputs are visible", async ({ page }) => {
    const title = page.getByText("Delivery fee calculator");
    const cartInput = getByDataTestId("cartValue", page);
    const itemsInput = getByDataTestId("numberOfItems", page);
    const deliveryInput = getByDataTestId("deliveryDistance", page);
    const timeInput = getByDataTestId("orderTime", page);

    await expect(title).toBeVisible();
    await expect(cartInput).toBeVisible();
    await expect(itemsInput).toBeVisible();
    await expect(deliveryInput).toBeVisible();
    await expect(timeInput).toBeVisible();
  });
  test.describe("cartValue input", () => {
    let cartInput: Locator;
    test.beforeEach(({ page }) => {
      cartInput = getByDataTestId("cartValue", page);
    });
    test("initial value is empty string", async () => {
      await expect(cartInput).toHaveValue("");
    });
    test("should accept floating point number separated with a comma", async ({
      page,
    }) => {
      await cartInput.click();
      await page.keyboard.type("10,22");
      await expect(cartInput).toHaveValue("10.22");
    });
    test("should not accept invalid characters", async ({ page }) => {
      await cartInput.click();
      // Loop through Unicode code points for lowercase alphabets
      const characters = "abcdefghiklmnopqrstuwxyzöäå-";
      for (const character of characters) {
        await page.keyboard.type(character);
      }
      await expect(cartInput).toHaveValue("");
    });
  });
  test.describe("numberOfItems input", () => {
    let itemsInput: Locator;
    test.beforeEach(({ page }) => {
      itemsInput = getByDataTestId("numberOfItems", page);
    });
    test("initial value is empty string", async () => {
      await expect(itemsInput).toHaveValue("");
    });
    test("should accept integer number", async ({ page }) => {
      await itemsInput.click();
      await page.keyboard.type("10");
      await expect(itemsInput).toHaveValue("10");
    });
    test("should not accept floating point number", async ({ page }) => {
      await itemsInput.click();
      await page.keyboard.type("10,22");
      await expect(itemsInput).toHaveValue("1022");
      await expect(itemsInput).not.toHaveValue("10.22");
    });
    test("should not accept invalid characters", async ({ page }) => {
      await itemsInput.click();
      // Loop through Unicode code points for lowercase alphabets
      const characters = "abcdefghiklmnopqrstuwxyzöäå,.-";
      for (const character of characters) {
        await page.keyboard.type(character);
      }
      await expect(itemsInput).toHaveValue("");
    });
  });
  test.describe("deliveryDistance input", () => {
    let distanceInput: Locator;
    test.beforeEach(({ page }) => {
      distanceInput = getByDataTestId("deliveryDistance", page);
    });
    test("initial value is empty string", async () => {
      await expect(distanceInput).toHaveValue("");
    });
    test("should accept integer number", async ({ page }) => {
      await distanceInput.click();
      await page.keyboard.type("10");
      await expect(distanceInput).toHaveValue("10");
    });
    test("should not accept floating point number", async ({ page }) => {
      await distanceInput.click();
      await page.keyboard.type("10,22");
      await expect(distanceInput).toHaveValue("1022");
      await expect(distanceInput).not.toHaveValue("10.22");
    });
    test("should not accept invalid characters", async ({ page }) => {
      await distanceInput.click();
      // Loop through Unicode code points for lowercase alphabets
      const characters = "abcdefghiklmnopqrstuwxyzöäå,.-";
      for (const character of characters) {
        await page.keyboard.type(character);
      }
      await expect(distanceInput).toHaveValue("");
    });
  });
});
