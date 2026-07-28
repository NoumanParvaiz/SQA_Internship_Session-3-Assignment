// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

/**
 * Scenario 2: Navbar / menu navigation
 */
test.describe('Scenario 2: Navbar Navigation', () => {

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  const navTargets = [
    { label: 'About', section: 'about' },
    { label: 'Education', section: 'education' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Certs', section: 'certifications' },
    { label: 'Contact', section: 'contact' },
  ];

  for (const { label, section } of navTargets) {
    test(`clicking "${label}" in the nav scrolls to the ${section} section`, async ({ page }) => {
      const home = new HomePage(page);
      await home.goToSection(label);
      await expect(home.sections[section]).toBeInViewport();
    });
  }

  test('mobile hamburger menu opens and navigates correctly', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Hamburger menu is only shown below the mobile breakpoint');

    const home = new HomePage(page);
    await expect(home.navToggle).toBeVisible();

    await home.openMobileMenu();
    await expect(home.mainNav).toHaveClass(/open/);

    await home.goToSection('About');
    await expect(home.mainNav).not.toHaveClass(/open/);
    await expect(home.sections.about).toBeInViewport();
  });

});
