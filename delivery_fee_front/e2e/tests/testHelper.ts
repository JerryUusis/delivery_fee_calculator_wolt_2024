import { Page } from "@playwright/test";

export const getByDataTestId = (value: string, page: Page) => {
  return page.locator(`[data-test-id="${value}"]`);
};
