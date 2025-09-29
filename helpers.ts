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

export async function getLoginError(page: Page) {
  await page.goto("http://zero.webappsecurity.com/");
  await page.pause();
  await page.click("#signin_button");
  await page.fill("#user_login", "my-username");
  await page.fill("#user_password", "password");
  await page.click("text=Sign in");
  const errMsg = page.locator(".alert-error");
  await expect(errMsg).toContainText("Login and/or password are wrong.");
}
