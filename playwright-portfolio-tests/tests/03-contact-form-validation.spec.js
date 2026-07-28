// @ts-check
const { test, expect } = require('@playwright/test');
const { ContactFormPage } = require('../pages/ContactFormPage');

/**
 * Scenario 3 & 5: Contact form validation / invalid input handling
 */
test.describe('Scenario 3: Contact Form Validation (Invalid Input Handling)', () => {

  test.beforeEach(async ({ page }) => {
    const contact = new ContactFormPage(page);
    await contact.goto();
  });

  test('submitting an empty form shows required-field errors', async ({ page }) => {
    const contact = new ContactFormPage(page);
    await contact.submit();

    await expect(contact.nameError).toHaveText(/required/i);
    await expect(contact.emailError).toHaveText(/required/i);
    await expect(contact.messageError).toHaveText(/required/i);
    await expect(contact.successMessage).toBeHidden();
  });

  test('an invalid email format shows a validation error', async ({ page }) => {
    const contact = new ContactFormPage(page);
    await contact.submitWith({
      name: 'Ayesha Khan',
      email: 'not-an-email',
      message: 'Just checking out your portfolio, looks great!',
    });

    await expect(contact.emailError).toHaveText(/valid email/i);
    await expect(contact.successMessage).toBeHidden();
  });

  test('a message shorter than the minimum length shows an error', async ({ page }) => {
    const contact = new ContactFormPage(page);
    await contact.submitWith({
      name: 'Ayesha Khan',
      email: 'ayesha@example.com',
      message: 'Hi!',
    });

    await expect(contact.messageError).toHaveText(/at least 10 characters/i);
    await expect(contact.successMessage).toBeHidden();
  });

  test('errors clear as soon as the user corrects the field', async ({ page }) => {
    const contact = new ContactFormPage(page);
    await contact.submit(); // trigger all errors first
    await expect(contact.nameError).toHaveText(/required/i);

    await contact.nameInput.fill('Ayesha Khan');
    await expect(contact.nameInput.locator('xpath=..')).not.toHaveClass(/has-error/);
  });

});
