import { test, expect } from "@playwright/test";

test("Base Test Example", async ({ page }) => {
  await page.goto("https://www.example.com");
  const pageTitle = page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain");
  await page.waitForTimeout(3000);
});

test.only("Test Assertions", async ({ page }) => {
  await page.goto("https://www.example.com");
  await expect(page).toHaveURL("https://www.example.com");
  await expect(page).toHaveTitle("Example Domain");
  const pageTitle = page.locator("h1");
  await expect(pageTitle).toBeVisible();
  await expect(pageTitle).toContainText("Example Domain");
  await expect(pageTitle).toHaveText("Example Domain");
  await expect(pageTitle).toHaveCount(1);

  await page.waitForTimeout(2000);
});

test.describe.only("Test Set", () => {
  test("Working with Inputs", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#signin_button");

    await page.fill("#user_login", "my-username");
    await page.fill("#user_password", "password");
    await page.waitForTimeout(3000);

    await page.click("text=Sign in");
    const errMsg = page.locator(".alert-error");
    await expect(errMsg).toContainText("Login and/or password are wrong.");
  });

  test("Click on Element", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#signin_button");
    await page.click("text=Sign in");
    const errMsg = page.locator(".alert-error");
    await expect(errMsg).toContainText("Login and/or password are wrong.");
    await page.waitForTimeout(3000);
  });
});
