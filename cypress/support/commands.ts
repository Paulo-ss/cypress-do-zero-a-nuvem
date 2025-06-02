/// <reference types="cypress" />

import { IFormMandatoryFieldsInput } from "./interfaces/form.js";

const longText = Cypress._.repeat("A really long text.", 20);

Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Paulo");
  cy.get("#lastName").type("Silveira Silva");
  cy.get("#email").type("paulossnjf@gmail.com");
  cy.get("textarea").type(longText, { delay: 0 });
  cy.contains("button", "Enviar").click();
});

Cypress.Commands.add(
  "fillMandatoryFieldsWithCustomInputAndSubmit",
  ({ firstName, lastName, email, text }: IFormMandatoryFieldsInput) => {
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#email").type(email);
    cy.get("textarea").type(text, { delay: 0 });
    cy.contains("button", "Enviar").click();
  }
);
