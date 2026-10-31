import { cleanupTrackedUsers } from "../api/userApi";

const THIRD_PARTY_NOISE = /googlesyndication|doubleclick|googleadservices|adservice\.google|googletagmanager|google-analytics|pagead|adsbygoogle/i;

const ignoreThirdPartyErrors = () => {
  Cypress.on("uncaught:exception", (error) => {
    if (THIRD_PARTY_NOISE.test(error.message) || THIRD_PARTY_NOISE.test(error.stack || "")) {
      return false;
    }
    return true;
  });
};

export const registerGlobalHooks = () => {
  ignoreThirdPartyErrors();

  afterEach(function () {
    if (this.currentTest.state === "failed" && Cypress.config("isInteractive")) {
      cy.screenshot(`FAILED_${this.currentTest.title.replace(/[^a-zA-Z0-9]+/g, "-")}`, { overwrite: true });
    }

    cleanupTrackedUsers();
  });
};
