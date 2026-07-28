/**
 * Scenario 3: Contact form validation (valid + invalid input)
 * Mirrors Playwright's 03-contact-form-validation.spec.js and
 * 04-contact-form-submission.spec.js combined into one spec.
 */
describe('Scenario 3: Contact Form Validation', () => {

  beforeEach(() => {
    cy.visit('/#contact');
    cy.get('#contactForm').scrollIntoView();
  });

  it('[negative] submitting an empty form shows required-field errors', () => {
    cy.submitContactForm();

    cy.get('#nameError').should('contain.text', 'required');
    cy.get('#emailError').should('contain.text', 'required');
    cy.get('#messageError').should('contain.text', 'required');
    cy.get('#formSuccess').should('not.be.visible');
  });

  it('[negative] an invalid email format shows a validation error', () => {
    cy.fillContactForm({
      name: 'Ayesha Khan',
      email: 'not-an-email',
      message: 'Just checking out your portfolio, looks great!',
    });
    cy.submitContactForm();

    cy.get('#emailError').should('contain.text', 'valid email');
    cy.get('#formSuccess').should('not.be.visible');
  });

  it('[positive] valid name, email and message submit successfully', () => {
    cy.fillContactForm({
      name: 'Ayesha Khan',
      email: 'ayesha.khan@example.com',
      message: 'Hi Nouman, I came across your portfolio and would love to connect.',
    });
    cy.submitContactForm();

    cy.get('#formSuccess')
      .should('be.visible')
      .and('contain.text', 'message has been received');

    // No leftover errors on a successful submission
    cy.get('#nameError').should('have.text', '');
    cy.get('#emailError').should('have.text', '');
    cy.get('#messageError').should('have.text', '');
  });

  it('[positive] form fields reset after a successful submission', () => {
    cy.fillContactForm({
      name: 'Bilal Ahmed',
      email: 'bilal@example.com',
      message: 'Great work on this QA portfolio, very thorough.',
    });
    cy.submitContactForm();

    cy.get('#formSuccess').should('be.visible');
    cy.get('#nameInput').should('have.value', '');
    cy.get('#emailInput').should('have.value', '');
    cy.get('#messageInput').should('have.value', '');
  });

});
