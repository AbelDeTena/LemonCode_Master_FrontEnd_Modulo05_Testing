describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input  has the focus when it clicks on it', () => {
    //arrange

    //act
    cy.visit('/');
    cy.get(`input[name="user"]`).click();

    //asert
    cy.get(`input[name="user"]`).should('have.focus');
  });

  it('should show an alert message when type invalid credentials', () => {
    //arrange
    const user = 'admin';
    const password = '1234';
    const expectedAlertMessage = 'Usuario y/o password no válidos';

    //act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('@userInput').type(user);
    cy.get(`input[name="password"]`).as('passwordInput');
    cy.get('@passwordInput').type(password);    

    //asert
    cy.get('@userInput').should(`have.value`, user);
    cy.get('@passwordInput').should(`have.value`, password);
    cy.get("button[type='submit']").click();    
    cy.findByRole("alert").should('contain', expectedAlertMessage);
  });

  it("should navigate to hotels url when type valid credentials", ()=>{
    //arrange
    const user = "admin";
    const password = "test";

    //act
    cy.visit("/");
    cy.findByRole('textbox').as('userInput');
    cy.get('@userInput').type(user);
    cy.get(`input[name="password"]`).as('passwordInput');
    cy.get('@passwordInput').type(password); 
    cy.get('@userInput').should(`have.value`, user);
    cy.get('@passwordInput').should(`have.value`, password);
    cy.get("button[type='submit']").click();   

    //assert
    cy.url().should("equal", "http://localhost:8080/#/submodule-list")
  })
});
