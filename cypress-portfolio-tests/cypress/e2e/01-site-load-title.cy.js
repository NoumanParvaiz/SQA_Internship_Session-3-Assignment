/**
 * Scenario 1: Website load and title check
 * Mirrors Playwright's 01-site-load-title.spec.js so the two
 * tools can be compared on the same scenario.
 */
describe('Scenario 1: Site Load & Title Verification', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('[positive] loads the homepage with the correct title', () => {
    cy.title().should('include', 'Nouman Parvaiz');
    cy.title().should('include', 'Software Quality Assurance Engineer');
  });

  it('[negative] title does NOT match an unrelated/incorrect title', () => {
    cy.title().should('not.include', 'Untitled Document');
    cy.title().should('not.eq', 'React App');
  });

  it('[positive] hero section shows name, role and tagline', () => {
    cy.get('.hero h1').should('be.visible').and('contain.text', 'Nouman');
    cy.get('.role-title').should('contain.text', 'Software Quality Assurance Engineer');
    cy.get('.tagline').should('contain.text', 'Ensuring software quality');
  });

});
