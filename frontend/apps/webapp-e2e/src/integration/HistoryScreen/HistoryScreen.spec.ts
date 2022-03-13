describe('webapp: HistoryScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=historyscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to HistoryScreen!');
    });
});
