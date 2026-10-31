import { header, home, login, signup } from "../selectors";

export const assertHomeIsVisible = () => {
  cy.get(home.carousel).should("be.visible");
};

export const assertLoginPageIsVisible = () => {
  cy.contains(login.loginTitle, "Login to your account").should("be.visible");
};

export const assertSignupSectionIsVisible = () => {
  cy.contains(login.signupTitle, "New User Signup!").should("be.visible");
};

export const assertAccountInformationPageIsVisible = () => {
  cy.contains(signup.accountInfoTitle, "Enter Account Information", { matchCase: false }).should("be.visible");
};

export const assertAccountCreated = () => {
  cy.contains(signup.accountCreatedTitle, "Account Created!", { matchCase: false }).should("be.visible");
};

export const assertAccountDeleted = () => {
  cy.contains(signup.accountDeletedTitle, "Account Deleted!", { matchCase: false }).should("be.visible");
};

export const assertLoggedInAs = (user) => {
  cy.contains(header.loggedInAs, `Logged in as ${user.name}`).should("be.visible");
};

export const assertLoggedOut = () => {
  cy.get(header.loggedInAs).should("not.exist");
  cy.get(header.loginLink).should("be.visible");
};
