describe('webapp: StepListScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=steplistscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to StepListScreen!');
    });
});
