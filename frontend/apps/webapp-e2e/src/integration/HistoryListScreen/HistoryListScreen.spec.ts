describe('webapp: HistoryListScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=historylistscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to HistoryListScreen!');
    });
});
