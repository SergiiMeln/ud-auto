import { test, expect } from "@playwright/test";
import * as helpers from "../helpers";

test("Base Test Example @Smoke", async ({ page }) => {
  await page.goto("https://www.example.com");
  const pageTitle = page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain");
  await page.waitForTimeout(3000);
});

test("Test Assertions @Smoke", async ({ page }) => {
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

test.describe("Test Set @Regression", () => {
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

test.describe.only("Screenshots", () => {
  test.beforeEach(async ({ page }) => {
    //await page.goto("http://zero.webappsecurity.com/");
    await helpers.loadHomepage(page);
    await helpers.assertTitle(page);
  });

  test("Whole page screenshot", async ({ page }) => {
    //await page.click("#signin_button");
    await page.screenshot({ path: "screenshot.png", fullPage: true });
  });
  test("Screenshot of an element", async ({ page }) => {
    //await page.click("#signin_button");
    const signInButton = page.getByText("Sign in");
    await signInButton.screenshot({ path: "buttonScreenshot.png" });
  });
});
