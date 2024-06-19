import { test, expect, Locator } from "@playwright/test";
import { clearDateTimeInput, getByDataTestId } from "./testHelper";
import dayjs from "dayjs";

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
      const characters = "abcdefghiklmnopqrstuwxyzöäå,.-";
      for (const character of characters) {
        await page.keyboard.type(character);
      }
      await expect(distanceInput).toHaveValue("");
    });
  });
  test.describe("orderTime input", () => {
    let orderTimeInput: Locator;
    test.beforeEach(({ page }) => {
      orderTimeInput = getByDataTestId("orderTime", page);
    });
    test("initial value is current date", async () => {
      const currentDate = dayjs().format("DD.MM.YYYY HH:mm");
      await expect(orderTimeInput).toHaveValue(currentDate);
    });
    test("should accept new value from keyboard", async ({ page }) => {
      const tomorrow = dayjs().add(1, "day").format("DD.MM.YYYY HH:mm");
      // Replace all empty spaces, dots and colons with empty string
      const inputValue = tomorrow.trim().replace(/[ .:]/g, "");
      
      await orderTimeInput.click();
      await clearDateTimeInput(page);

      for (const character of inputValue) {
        await page.keyboard.type(character);
      }
      await expect(orderTimeInput).toHaveValue(tomorrow);
    });
    test("should not accept invalid characters", async({page}) => {
      const characters = "abcdefghiklmnopqrstuwxyzöäå,.-:";

      await orderTimeInput.click();
      await clearDateTimeInput(page);

      for (const character of characters) {
        await page.keyboard.type(character);
      }
      await expect(orderTimeInput).toHaveValue("DD.MM.YYYY hh:mm");
    })
  });
});
