// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

/**
 * Scenario 1: Website load and title check
 */
test.describe('Scenario 1: Site Load & Title Verification', () => {

  test('homepage loads successfully with the correct page title', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveTitle(/Nouman Parvaiz/);
    await expect(page).toHaveTitle(/Software Quality Assurance Engineer/);
  });

  test('hero section renders name, role and tagline on load', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.heroHeading).toBeVisible();
    await expect(home.heroHeading).toContainText('Nouman');
    await expect(home.roleTitle).toContainText('Software Quality Assurance Engineer');
    await expect(home.tagline).toContainText('Ensuring software quality');
  });

  test('page loads with no failed network requests (broken assets)', async ({ page }) => {
    const failedRequests = [];
    page.on('requestfailed', (request) => failedRequests.push(request.url()));

    const home = new HomePage(page);
    await home.goto();
    await page.waitForLoadState('networkidle');

    expect(failedRequests, `Failed requests: ${failedRequests.join(', ')}`).toHaveLength(0);
  });

});
