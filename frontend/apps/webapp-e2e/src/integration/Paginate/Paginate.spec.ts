describe('webapp: Paginate component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=paginate--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Paginate!');
    });
});
