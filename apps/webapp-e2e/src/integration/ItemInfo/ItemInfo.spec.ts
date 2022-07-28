describe('webapp: ItemInfo component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=iteminfo--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ItemInfo!');
    });
});
