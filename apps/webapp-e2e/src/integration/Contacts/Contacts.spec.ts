describe('webapp: Contacts component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=contacts--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Contacts!');
    });
});
