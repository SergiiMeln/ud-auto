import { test, expect } from "@playwright/test";

test.describe.only("Feedback Form Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#feedback");
    const feedbackPageTitle = page.locator("#feedback-title");
    await expect(feedbackPageTitle).toContainText("Feedback");
    await page.waitForTimeout(1000);
  });

  test("Clear the Feedback From", async ({ page }) => {
    const nameField = page.locator("#name");
    const emailField = page.locator("#email");
    const subjectField = page.locator("#subject");
    const commentField = page.locator("#comment");
    await nameField.fill("Firstname");
    await emailField.fill("email@gmail.com");
    await subjectField.fill("The Subject");
    await commentField.fill("Some nice comment about the Application");
    await page.waitForTimeout(1000);
    const clearButton = page.locator("input[name='clear']");
    await clearButton.click();
    await page.waitForTimeout(1000);
    await expect(nameField).toBeEmpty();
    await expect(commentField).toBeEmpty();
  });

  test("Submit the Feedback From", async ({ page }) => {
    const nameField = page.locator("#name");
    const emailField = page.locator("#email");
    const subjectField = page.locator("#subject");
    const commentField = page.locator("#comment");
    await nameField.fill("Firstname");
    await emailField.fill("email@gmail.com");
    await subjectField.fill("The Subject");
    await commentField.fill("Form is Ready to Be Submitted");
    await page.waitForTimeout(1000);

    const submitButton = page.locator("input[name='submit']");
    await expect(submitButton).toBeVisible();
    //await clearButton.click();
    //await page.waitForTimeout(3000);
    const feedbackSent = page.locator("h3#feedback-title");
    await expect(feedbackSent).toContainText("Feedback");
  });
});
