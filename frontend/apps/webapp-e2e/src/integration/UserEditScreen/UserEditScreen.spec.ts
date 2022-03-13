describe('webapp: UserEditScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=usereditscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to UserEditScreen!');
    });
});
