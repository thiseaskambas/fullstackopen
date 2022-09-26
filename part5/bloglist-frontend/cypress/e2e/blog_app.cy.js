describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "User One",
      username: "user1",
      password: "test",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log-in").click();
  });
  describe("Login", function () {
    it("fails with wrong credentials", function () {
      cy.contains("Log-in").click();
      cy.get("#username").type("user");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });

    it("login works", function () {
      cy.contains("Log-in").click();
      cy.get("#username").type("user1");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("USER ONE is logged in");
    });
  });
});
