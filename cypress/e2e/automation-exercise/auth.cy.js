import { login, signup } from "../../support/selectors";
import { routes } from "../../support/routes";
import { buildUser } from "../../support/factories/userFactory";
import { createUserViaApi, trackUserForCleanup } from "../../support/api/userApi";
import { visitHome, goToLogin } from "../../support/actions/navigationActions";
import { loginViaUi, logoutViaUi, startSignup } from "../../support/actions/authActions";
import {
  continueAfterAccountEvent,
  deleteAccountViaUi,
  fillAccountInformation,
  submitAccountCreation,
} from "../../support/actions/accountActions";
import {
  assertAccountCreated,
  assertAccountDeleted,
  assertAccountInformationPageIsVisible,
  assertHomeIsVisible,
  assertLoggedInAs,
  assertLoggedOut,
  assertLoginPageIsVisible,
  assertSignupSectionIsVisible,
} from "../../support/assertions/pageAssertions";

describe("Autenticação e cadastro de usuário", () => {
  beforeEach(() => {
    visitHome();
    assertHomeIsVisible();
    goToLogin();
  });

  it("TC01 - Registrar usuário", () => {
    const user = buildUser();
    trackUserForCleanup(user);

    assertSignupSectionIsVisible();

    startSignup(user);
    assertAccountInformationPageIsVisible();
    cy.get(signup.email).should("have.value", user.email).and("be.disabled");

    fillAccountInformation(user);
    cy.get(signup.newsletter).should("be.checked");
    cy.get(signup.offers).should("be.checked");

    submitAccountCreation();
    assertAccountCreated();

    continueAfterAccountEvent();
    assertLoggedInAs(user);

    deleteAccountViaUi();
    assertAccountDeleted();
    continueAfterAccountEvent();

    assertLoggedOut();
  });

  it("TC02 - Login com e-mail e senha corretos", () => {
    const user = buildUser();
    createUserViaApi(user);

    assertLoginPageIsVisible();

    loginViaUi(user);
    assertLoggedInAs(user);

    deleteAccountViaUi();

    assertAccountDeleted();
  });

  it("TC03 - Login com e-mail e senha incorretos", () => {
    const invalidUser = buildUser({ email: "nao.existe.qa@example.com", password: "SenhaErrada#1" });

    assertLoginPageIsVisible();

    loginViaUi(invalidUser);

    cy.get(login.loginError).should("exist").and("be.visible");
    cy.contains(login.loginError, "Your email or password is incorrect!").should("be.visible");
    assertLoggedOut();
  });

  it("TC04 - Logout de usuário", () => {
    const user = buildUser();
    createUserViaApi(user);

    assertLoginPageIsVisible();

    loginViaUi(user);
    assertLoggedInAs(user);

    logoutViaUi();

    cy.location("pathname").should("eq", routes.login);
    assertLoginPageIsVisible();
    assertLoggedOut();
  });

  it("TC05 - Registrar usuário com e-mail já existente", () => {
    const existingUser = buildUser();
    createUserViaApi(existingUser);

    assertSignupSectionIsVisible();

    startSignup({ name: existingUser.name, email: existingUser.email });

    cy.get(login.signupError).should("exist").and("be.visible");
    cy.contains(login.signupError, "Email Address already exist!").should("be.visible");
    cy.get(signup.accountInfoTitle).should("not.exist");
  });
});
