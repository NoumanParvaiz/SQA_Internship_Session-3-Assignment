// @ts-check

/**
 * Page Object Model for the contact form inside the Contact section.
 * Encapsulates field locators, fill/submit actions, and error/success
 * state readers so validation tests stay readable.
 */
class ContactFormPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    this.form = page.locator('#contactForm');
    this.nameInput = page.locator('#nameInput');
    this.emailInput = page.locator('#emailInput');
    this.messageInput = page.locator('#messageInput');
    this.submitButton = page.locator('#submitBtn');

    this.nameError = page.locator('#nameError');
    this.emailError = page.locator('#emailError');
    this.messageError = page.locator('#messageError');
    this.successMessage = page.locator('#formSuccess');
  }

  async goto() {
    await this.page.goto('/#contact');
    await this.form.scrollIntoViewIfNeeded();
  }

  /**
   * Fill the form. Pass an empty string (or omit a field) to leave it blank,
   * which is useful for invalid-input scenarios.
   */
  async fill({ name = '', email = '', message = '' } = {}) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async submitWith(data) {
    await this.fill(data);
    await this.submit();
  }
}

module.exports = { ContactFormPage };
