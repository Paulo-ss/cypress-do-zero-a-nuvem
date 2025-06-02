describe("CAC TAT - Privacy Policy", () => {
  beforeEach(() => {
    cy.visit("/src/privacy.html");
  });

  it("should visit the 'Privacy Policy' page and assert it's title", () => {
    const expectedPageTitle =
      "Central de Atendimento ao Cliente TAT - Política de Privacidade";

    cy.title().should("eq", expectedPageTitle);
  });

  it("should assert the page's H1 title element's text content", () => {
    const expectedH1Title = "CAC TAT - Política de Privacidade";

    cy.get("#title").should("have.text", expectedH1Title);
  });
});
