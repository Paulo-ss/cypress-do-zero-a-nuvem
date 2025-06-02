/// <reference types="cypress" />

import { IFormMandatoryFieldsInput } from "./support/interfaces/form.ts";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      fillMandatoryFieldsAndSubmit(): Chainable<any>;
      fillMandatoryFieldsWithCustomInputAndSubmit(
        formInput: IFormMandatoryFieldsInput
      ): Chainable<any>;
    }
  }
}
