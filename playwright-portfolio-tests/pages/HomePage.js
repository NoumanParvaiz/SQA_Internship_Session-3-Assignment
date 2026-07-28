// @ts-check

/**
 * Page Object Model for the portfolio homepage.
 * Encapsulates locators and actions for the hero, nav bar,
 * and general page-level elements so tests stay readable.
 */
class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // Header / nav
    this.navToggle = page.locator('#navToggle');
    this.mainNav = page.locator('#mainNav');
    this.navLink = (name) => this.mainNav.getByText(name, { exact: false }).first();

    // Hero
    this.heroHeading = page.locator('.hero h1');
    this.roleTitle = page.locator('.role-title');
    this.tagline = page.locator('.tagline');
    this.resumeButton = page.locator('#resumeBtn');
    this.contactMeButton = page.locator('.hero-actions').getByText('Contact Me');

    // Sections
    this.sections = {
      hero: page.locator('#hero'),
      about: page.locator('#about'),
      education: page.locator('#education'),
      skills: page.locator('#skills'),
      projects: page.locator('#projects'),
      certifications: page.locator('#certifications'),
      contact: page.locator('#contact'),
    };

    this.sectionTitles = page.locator('.section-title');
    this.coverageBars = page.locator('.coverage-fill');
    this.certCards = page.locator('.cert-card');
    this.backToTopButton = page.locator('#backToTop');
  }

  async goto() {
    await this.page.goto('/');
  }

  async getTitle() {
    return this.page.title();
  }

  /** Click a nav link by its visible label and wait for the smooth-scroll to settle. */
  async goToSection(label) {
    await this.navLink(label).click();
    await this.page.waitForTimeout(600);
  }

  async openMobileMenu() {
    await this.navToggle.click();
  }

  async scrollToSkills() {
    await this.sections.skills.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1500);
  }
}

module.exports = { HomePage };
