describe('webapp: UserListScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=userlistscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to UserListScreen!');
    });
});
