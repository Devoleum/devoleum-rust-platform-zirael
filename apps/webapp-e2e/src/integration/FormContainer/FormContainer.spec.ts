describe('webapp: FormContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formcontainer--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FormContainer!');
    });
});
