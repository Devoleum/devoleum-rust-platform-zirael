describe('webapp: CheckoutSteps component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=checkoutsteps--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CheckoutSteps!');
    });
});
