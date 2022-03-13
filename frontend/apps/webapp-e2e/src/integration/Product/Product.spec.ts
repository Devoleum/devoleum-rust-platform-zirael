describe('webapp: Product component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=product--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Product!');
    });
});
