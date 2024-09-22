describe("BidHub valid login form test", () => {
  it("should log in a user with valid credentials", () => {
    cy.visit("/");
    cy.get(".navbar-nav").contains("Login").click();
    cy.wait(500);
    cy.get(".loginForm").should("exist");
    cy.get('input[id="email-login"]').type("fridafever1@stud.noroff.no");
    cy.get('input[id="password-login"]').type("123456789");
    cy.get('button[id="loginUserBtn"]').click();
    cy.wait(500);
    cy.get(".header-first-p").should("contain.text", "fridafever");
    cy.window().its("localStorage").invoke("getItem", "token").should("exist");
  });
});
