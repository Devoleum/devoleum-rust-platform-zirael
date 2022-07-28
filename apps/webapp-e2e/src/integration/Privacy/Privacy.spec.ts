describe('webapp: Privacy component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=privacy--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Privacy!');
    });
});
