describe('webapp: LoginScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loginscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to LoginScreen!');
    });
});
