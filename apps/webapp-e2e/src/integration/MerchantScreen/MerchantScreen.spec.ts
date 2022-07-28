describe('webapp: MerchantScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=merchantscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MerchantScreen!');
    });
});
