import { Page } from "@playwright/test";

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
