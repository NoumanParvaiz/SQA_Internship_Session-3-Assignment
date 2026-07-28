// @ts-check
const { test, expect } = require('@playwright/test');
const { ContactFormPage } = require('../pages/ContactFormPage');

/**
 * Scenario 4: Successful form submission (valid input)
 */
test.describe('Scenario 4: Successful Contact Form Submission', () => {

  test.beforeEach(async ({ page }) => {
    const contact = new ContactFormPage(page);
    await contact.goto();
  });

  test('valid name, email and message submit successfully', async ({ page }) => {
    const contact = new ContactFormPage(page);

    await contact.submitWith({
      name: 'Ayesha Khan',
      email: 'ayesha.khan@example.com',
      message: 'Hi Nouman, I came across your portfolio and would love to connect regarding a QA role.',
    });

    await expect(contact.successMessage).toBeVisible();
    await expect(contact.successMessage).toContainText('message has been received');

    // No leftover validation errors
    await expect(contact.nameError).toHaveText('');
    await expect(contact.emailError).toHaveText('');
    await expect(contact.messageError).toHaveText('');
  });

  test('form fields reset after a successful submission', async ({ page }) => {
    const contact = new ContactFormPage(page);

    await contact.submitWith({
      name: 'Bilal Ahmed',
      email: 'bilal@example.com',
      message: 'Great work on this QA portfolio — very thorough and well tested.',
    });

    await expect(contact.successMessage).toBeVisible();
    await expect(contact.nameInput).toHaveValue('');
    await expect(contact.emailInput).toHaveValue('');
    await expect(contact.messageInput).toHaveValue('');
  });

});
