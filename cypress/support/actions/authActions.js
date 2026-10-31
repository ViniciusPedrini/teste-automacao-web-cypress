import { header, login } from "../selectors";

export const loginViaUi = ({ email, password }) => {
  cy.get(login.loginEmail).type(email);
  cy.get(login.loginPassword).type(password, { log: false });
  cy.get(login.loginButton).click();
};

export const startSignup = ({ name, email }) => {
  cy.get(login.signupName).type(name);
  cy.get(login.signupEmail).type(email);
  cy.get(login.signupButton).click();
};

export const logoutViaUi = () => cy.get(header.logoutLink).click();
