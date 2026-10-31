import { header, signup } from "../selectors";

export const fillAccountInformation = (user) => {
  cy.get(user.title === "Mrs" ? signup.titleMrs : signup.titleMr).check();
  cy.get(signup.password).type(user.password, { log: false });
  cy.get(signup.day).select(user.birthDay);
  cy.get(signup.month).select(user.birthMonth);
  cy.get(signup.year).select(user.birthYear);

  if (user.newsletter) cy.get(signup.newsletter).check();
  if (user.offers) cy.get(signup.offers).check();

  cy.get(signup.firstName).type(user.firstName);
  cy.get(signup.lastName).type(user.lastName);
  cy.get(signup.company).type(user.company);
  cy.get(signup.address).type(user.address);
  cy.get(signup.address2).type(user.address2);
  cy.get(signup.country).select(user.country);
  cy.get(signup.state).type(user.state);
  cy.get(signup.city).type(user.city);
  cy.get(signup.zipcode).type(user.zipcode);
  cy.get(signup.mobile).type(user.mobile);
};

export const submitAccountCreation = () => cy.get(signup.createAccountButton).click();

export const continueAfterAccountEvent = () => cy.get(signup.continueButton).click();

export const deleteAccountViaUi = () => cy.get(header.deleteAccountLink).click();
