import { IFormMandatoryFieldsInput } from "../support/interfaces/form.js";

// Cypress comes bundled with loadsh (_) by default
const longText = Cypress._.repeat("A really long text.", 20);

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("/src/index.html");
  });

  it("should check the app's title", () => {
    const expectedTitle = "Central de Atendimento ao Cliente TAT";

    cy.title().should("eq", expectedTitle);
  });

  it("should fill the required fields and submit the form", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("should display the error message when invalid data is submitted from the form", () => {
    cy.get("#firstName").type("Paulo");
    cy.get("#lastName").type("Silveira Silva");
    cy.get("#email").type("paulossnjf@");
    cy.get("textarea").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("should display the error message when an empty form is submitted", () => {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("should assert the phone input remains empty when non numeric only characters are typed into it", () => {
    const input = "Regular text.";
    const expectedResult = "";

    cy.get("#phone").as("phone").type(input);

    cy.get("@phone").should("have.value", expectedResult);
  });

  it("should display the error message when phone becomes required but it is not filled", () => {
    cy.get("#firstName").type("Paulo");
    cy.get("#lastName").type("Silveira Silva");
    cy.get("#email").type("paulossnjf@gmail.com");
    cy.get("textarea").type(longText, { delay: 0 });
    cy.get("#phone-checkbox").check();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("should fill and clear the form's fields", () => {
    const firstName = "Paulo";
    const lastName = "Silveira Silva";
    const email = "paulossnjf@gmail.com";
    const phone = "11983872553";
    const clearedValue = "";

    cy.get("#firstName").as("fn").type(firstName);
    cy.get("@fn").should("have.value", firstName);
    cy.get("@fn").clear();
    cy.get("@fn").should("have.value", clearedValue);

    cy.get("#lastName").as("ln").type(lastName);
    cy.get("@ln").should("have.value", lastName);
    cy.get("@ln").clear();
    cy.get("@ln").should("have.value", clearedValue);

    cy.get("#email").as("email").type(email);
    cy.get("@email").should("have.value", email);
    cy.get("@email").clear();
    cy.get("@email").should("have.value", clearedValue);

    cy.get("#phone").as("phone").type(phone);
    cy.get("@phone").should("have.value", phone);
    cy.get("@phone").clear();
    cy.get("@phone").should("have.value", clearedValue);
  });

  it("should fill the required fields with custom data and submit the form", () => {
    const formInput: IFormMandatoryFieldsInput = {
      firstName: "Paulo",
      lastName: "Silveira Silva",
      email: "paulossnjf@gmail.com",
      text: "Testing the text area field.",
    };

    cy.fillMandatoryFieldsWithCustomInputAndSubmit(formInput);

    cy.get(".success").should("be.visible");
  });

  it("should select a product in a select field by it's text content", () => {
    const youtubeSelectText = "YouTube";
    const mentoriaSelectValue = "mentoria";
    const youtubeExpectedValue = "youtube";
    const blogExpectedValue = "blog";

    // Selecting an option by it's text content
    cy.get("#product").as("ps").select(youtubeSelectText);
    cy.get("#product").should("have.value", youtubeExpectedValue);

    // Selecting an option by its "value" property
    cy.get("@ps").select(mentoriaSelectValue);
    cy.get("@ps").should("have.value", mentoriaSelectValue);

    // Selecting an option by it's index (0-indexed based)
    cy.get("@ps").select(1);
    cy.get("@ps").should("have.value", blogExpectedValue);
  });

  it("checks the type of service 'Feedback'", () => {
    cy.get("input[type='radio'][value='feedback']").as("feedbackRadio").check();
    cy.get("feedbackValue").should("be.checked");
  });

  it("checks and asserts all the type of service radio inputs", () => {
    cy.get("input[type='radio']").each((typeOfService) => {
      cy.wrap(typeOfService).check();
      cy.wrap(typeOfService).should("be.checked");
    });
  });

  it("should check both checkboxes, and then uncheck the last one", () => {
    cy.get("input[type='checkbox']").check();
    cy.get("input[type='checkbox']").should("be.checked");

    cy.get("input[type='checkbox']").last().as("lastCheckbox").uncheck();
    cy.get("@lastCheckbox").should("not.be.checked");
  });

  it("should select a file from 'fixtures' folder", () => {
    const fileName = "example.json";

    cy.get("#file-upload").selectFile(`cypress/fixtures/${fileName}`);

    cy.get<HTMLInputElement>("#file-upload").should((fileInput) => {
      expect(fileInput[0].files[0].name).to.equal(fileName);
    });
  });

  it("should select a file simulating a drag-and-drop functionality", () => {
    const fileName = "example.json";

    cy.get("#file-upload").selectFile(`cypress/fixtures/${fileName}`, {
      action: "drag-drop",
    });

    cy.get<HTMLInputElement>("#file-upload").should((fileInput) => {
      expect(fileInput[0].files[0].name).to.equal(fileName);
    });
  });

  it("should select a file with an alias", () => {
    const fileName = "example.json";

    // Fixture function access files directly from the 'fixtures' folder
    cy.fixture(fileName).as("exampleFile");

    cy.get("#file-upload").selectFile(`@exampleFile`);

    cy.get<HTMLInputElement>("#file-upload").should((fileInput) => {
      expect(fileInput[0].files[0].name).to.equal(fileName);
    });
  });

  it("should assert that the 'Privacy Policy' opens in a new tab without actually clicking it", () => {
    cy.contains("a", "Política de Privacidade").as("privacyPolicyAnchor");

    cy.get("@privacyPolicyAnchor")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("should access the 'Privacy Policy' page by removing the 'target' attribute", () => {
    const expectedPageTitle =
      "Central de Atendimento ao Cliente TAT - Política de Privacidade";

    /**
     * 'invoke' method receives the subject chained, and performs one
     * function (defined by Cypress). In this case, it will remove
     * the attribute 'target' from the '<a>' element. This is a common
     * pattern in Cypress to visit pages that opens in another tab,
     * without actually openenin a new tab
     */
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .as("privacyPolicyAnchor");

    cy.get("@privacyPolicyAnchor").click();

    cy.title().should("eq", expectedPageTitle);
  });
});
