import { expect, Page } from "@playwright/test";

export async function loadHomepage(page: Page) {
  await page.goto("http://zero.webappsecurity.com/");
}

export async function assertTitle(page: Page) {
  await page.goto("http://zero.webappsecurity.com/");
  await page.click("#signin_button");
  const pageTitle = page.locator("h3");
  await expect(pageTitle).toContainText("Log in to ZeroBank");
}
