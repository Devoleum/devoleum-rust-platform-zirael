describe('webapp: StepEditScreen component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=stepeditscreen--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to StepEditScreen!');
    });
});
