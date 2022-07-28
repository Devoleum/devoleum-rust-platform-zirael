describe('webapp: Meta component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=meta--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Meta!');
    });
});
