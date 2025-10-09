describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.get("#__next").should("be.visible");
  });

  context("Homepage", () => {
    it("the h1 contains the correct text", () => {
      cy.getByData("hero-heading").contains("Yilong");
    });
  });
});
