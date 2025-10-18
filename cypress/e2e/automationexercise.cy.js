/// <reference types="cypress" />

describe('AutomationExercise Full Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/');
  });

  it('Opens Signup/Login page', () => {
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.screenshot('signup-login-page');
  });

  it('Opens Contact Us page and submits form', () => {
    cy.get('a[href="/contact_us"]').click();
    cy.url().should('include', '/contact_us');
    cy.get('input[name="name"]').type('Michael A');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('This is a test message.');
    cy.get('input[name="submit"]').click();
    cy.get('.status.alert.alert-success').should('contain', 'Success');
    cy.screenshot('contact-us');
  });

  it('Searches for a product', () => {
    cy.get('input[name="search"]').should('be.visible').type('Dress{enter}');
    cy.get('.features_items').should('exist');
    cy.screenshot('search-product');
  });

  it('Adds a product to cart', () => {
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover');
    cy.contains('Add to cart').should('be.visible').click();
    cy.get('.modal-content').should('contain', 'Added!');
    cy.get('.modal-content .btn').contains('Continue Shopping').click();
    cy.screenshot('add-product-to-cart');
  });

  it('Deletes a product from cart', () => {
    cy.get('a[href="/view_cart"]').click();
    cy.get('.cart_quantity_delete').first().should('be.visible').click();
    cy.get('.cart_info').should('not.contain', 'Dress');
    cy.screenshot('delete-product-from-cart');
  });

});
