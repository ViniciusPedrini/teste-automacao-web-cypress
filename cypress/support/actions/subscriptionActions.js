import { subscription } from "../selectors";

export const scrollToFooter = () => cy.get("footer").scrollIntoView();

export const subscribeWithEmail = (email) => {
  cy.get(subscription.email).type(email);
  cy.get(subscription.button).click();
};
