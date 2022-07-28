describe('webapp: ProfileScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=profilescreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ProfileScreen!');
    });
});
