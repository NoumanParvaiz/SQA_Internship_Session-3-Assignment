// ***********************************************
// Custom commands for the portfolio site tests.
// Keeps spec files short and readable — similar
// role to the Page Object Model used in Playwright.
// ***********************************************

/** Fill the contact form. Leave a field '' to test invalid/empty input. */
Cypress.Commands.add('fillContactForm', ({ name = '', email = '', message = '' } = {}) => {
  cy.get('#nameInput').clear();
  if (name) cy.get('#nameInput').type(name);

  cy.get('#emailInput').clear();
  if (email) cy.get('#emailInput').type(email);

  cy.get('#messageInput').clear();
  if (message) cy.get('#messageInput').type(message);
});

Cypress.Commands.add('submitContactForm', () => {
  cy.get('#submitBtn').click();
});
