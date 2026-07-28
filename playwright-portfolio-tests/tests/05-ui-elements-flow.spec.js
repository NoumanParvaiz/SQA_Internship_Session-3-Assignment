// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

/**
 * Scenario 5: Verify important UI elements and user flows
 */
test.describe('Scenario 5: Key UI Elements & User Flows', () => {

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  test('all major section titles are present', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.sectionTitles).toHaveCount(5); // About, Education, Skills, Projects, Certifications
  });

  test('skill coverage bars animate to their target width on scroll', async ({ page }) => {
    const home = new HomePage(page);
    const firstBar = home.coverageBars.first();

    const initialWidth = await firstBar.evaluate((el) => el.style.width);
    expect(['', '0%']).toContain(initialWidth);

    await home.scrollToSkills();

    const finalWidth = await firstBar.evaluate((el) => el.style.width);
    expect(finalWidth).not.toBe('0%');
    expect(finalWidth).not.toBe('');
  });

  test('certification cards show a status badge for each entry', async ({ page }) => {
    const home = new HomePage(page);
    await home.sections.certifications.scrollIntoViewIfNeeded();

    const count = await home.certCards.count();
    expect(count).toBeGreaterThanOrEqual(4);

    for (const card of await home.certCards.all()) {
      await expect(card.locator('.badge')).toBeVisible();
    }
  });

  test('user flow: browse from hero to contact form and back to top', async ({ page }) => {
    const home = new HomePage(page);

    await home.goToSection('Projects');
    await expect(home.sections.projects).toBeInViewport();

    await home.goToSection('Contact');
    await expect(home.sections.contact).toBeInViewport();

    await expect(home.backToTopButton).toBeVisible();
    await home.backToTopButton.click();
    await page.waitForTimeout(600);
    await expect(home.sections.hero).toBeInViewport();
  });

  test('Download Resume button gives feedback when resume.pdf is missing', async ({ page }) => {
    const home = new HomePage(page);
    let dialogMessage = '';

    page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await home.resumeButton.click();
    await page.waitForTimeout(500);
    expect(dialogMessage.toLowerCase()).toContain('resume');
  });

});
