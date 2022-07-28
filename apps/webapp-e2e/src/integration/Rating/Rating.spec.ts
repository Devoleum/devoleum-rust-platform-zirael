describe('webapp: Rating component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=rating--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Rating!');
    });
});
