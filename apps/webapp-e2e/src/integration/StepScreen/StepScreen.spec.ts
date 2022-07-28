describe('webapp: StepScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=stepscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to StepScreen!');
    });
});
