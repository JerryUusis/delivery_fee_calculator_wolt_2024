import { Page, Locator } from "@playwright/test";

export const getByDataTestId = (value: string, page: Page) => {
  return page.locator(`[data-test-id="${value}"]`);
};

// Have different button combination for macOs
export const clearDateTimeInput = async (page: Page) => {
  if (process.platform === "darwin") {
    await page.keyboard.press("Meta+A");
  } else {
    await page.keyboard.press("Control+A");
  }
  page.keyboard.press("Backspace");
};

export const addValueToInput = async (
  input: Locator,
  value: string,
  page: Page
) => {
  await input.click();
  await page.keyboard.type(value);
};

export const addValuesToInputs = async (
  cartValue: string,
  itemsAmount: string,
  distanceLength: string,
  orderTime: string,
  page: Page
) => {
  const cartInput = getByDataTestId("cartValue", page);
  const itemsInput = getByDataTestId("numberOfItems", page);
  const distanceInput = getByDataTestId("deliveryDistance", page);
  const orderTimeInput = getByDataTestId("orderTime", page);
  const submitButton = page.getByRole("button", {
    name: "Calculate delivery fee",
  });

  await addValueToInput(cartInput, cartValue, page);
  await addValueToInput(itemsInput, itemsAmount, page);
  await addValueToInput(distanceInput, distanceLength, page);
  await addValueToInput(orderTimeInput, orderTime, page);
  await submitButton.click();
};
