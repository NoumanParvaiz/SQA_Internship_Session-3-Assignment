// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

/**
 * Scenario 6: Responsive visibility / button interaction
 * Runs across every project defined in playwright.config.js
 * (Desktop Chrome, Desktop Firefox, Mobile Chrome, Tablet),
 * covering responsive + cross-browser compatibility together.
 */
test.describe('Scenario 6: Responsive Visibility & Button Interaction', () => {

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  test('no horizontal overflow at the current viewport size', async ({ page }) => {
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });
    expect(hasOverflow).toBeFalsy();
  });

  test('hero, skills and contact sections remain visible at this viewport', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.heroHeading).toBeVisible();
    await expect(home.sections.skills).toBeVisible();
    await expect(home.sections.contact).toBeVisible();
  });

  test('primary hero buttons are visible and clickable at this viewport', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.resumeButton).toBeVisible();
    await expect(home.contactMeButton).toBeVisible();

    await home.contactMeButton.click();
    await page.waitForTimeout(600);
    await expect(home.sections.contact).toBeInViewport();
  });

  test('capture a full-page screenshot for visual/responsive evidence', async ({ page }, testInfo) => {
    const screenshotPath = `test-results/screenshots/${testInfo.project.name.replace(/\s+/g, '-')}-full-page.png`;
    const buffer = await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach('full-page-screenshot', { body: buffer, contentType: 'image/png' });
  });

});
