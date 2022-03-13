describe('webapp: ProductCarousel component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=productcarousel--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ProductCarousel!');
    });
});
