describe('webapp: Achievement component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=achievement--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Achievement!');
    });
});
