import { test, expect } from "@playwright/test";

test.describe("Login/Logout Flow", () => {
  //before hook
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
  });

  //negative scenario
  test("Login with invalid username test", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", "invalid-username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    const errMsg = page.locator(".alert-error");
    await page.waitForTimeout(3000);
    await expect(errMsg).toContainText("Login and/or password are wrong.");
  });

  test("Login with invalid password test", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "invalid-password");
    await page.click("text=Sign in");
    const errMsg = page.locator(".alert-error");
    await page.waitForTimeout(3000);
    await expect(errMsg).toContainText("Login and/or password are wrong.");
  });

  //positive scenario + logout
  test("Success Login test", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    await page.waitForLoadState("networkidle");
    await page.goto("http://zero.webappsecurity.com/");
    const onlineBankingTab = page.locator("#onlineBankingMenu");
    await onlineBankingTab.click();
    const accountSummaryLink = page.locator("#account_summary_link");
    await accountSummaryLink.click();
    const accountSummaryTab = page.locator("#account_summary_tab");
    await expect(accountSummaryTab).toBeVisible();
  });
});
