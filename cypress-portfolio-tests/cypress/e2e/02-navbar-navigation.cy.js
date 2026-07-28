/**
 * Scenario 2: Navbar / menu navigation
 * Mirrors Playwright's 02-navbar-navigation.spec.js.
 */
describe('Scenario 2: Navbar Navigation', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('[positive] clicking "About" scrolls the About section into view', () => {
    cy.get('.main-nav').contains('About').click();
    cy.wait(600); // allow smooth-scroll to settle
    cy.get('#about').should('be.visible');
  });

  it('[positive] clicking "Contact" scrolls the Contact section into view', () => {
    cy.get('.main-nav').contains('Contact').click();
    cy.wait(600);
    cy.get('#contact').should('be.visible');
  });

  it('[negative] the nav bar does not contain a link that was never built (e.g. "Blog")', () => {
    cy.get('.main-nav').should('not.contain.text', 'Blog');
  });

  it('[positive] mobile hamburger menu opens and navigates correctly', () => {
    cy.viewport('iphone-8'); // force mobile breakpoint
    cy.get('#navToggle').should('be.visible').click();
    cy.get('#mainNav').should('have.class', 'open');

    cy.get('#mainNav').contains('About').click();
    cy.get('#mainNav').should('not.have.class', 'open');
  });

});
