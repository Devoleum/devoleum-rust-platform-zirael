describe('webapp: RegisterScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=registerscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to RegisterScreen!');
    });
});
