import { subscription } from "../../support/selectors";
import { visitHome } from "../../support/actions/navigationActions";
import { scrollToFooter, subscribeWithEmail } from "../../support/actions/subscriptionActions";
import { assertHomeIsVisible } from "../../support/assertions/pageAssertions";
import { buildUser } from "../../support/factories/userFactory";

describe("Assinatura de newsletter", () => {
  it("TC10 - Verificar assinatura (subscription) na home page", () => {
    const { email } = buildUser();

    visitHome();
    assertHomeIsVisible();

    scrollToFooter();
    cy.contains(subscription.title, "Subscription", { matchCase: false }).should("be.visible");

    subscribeWithEmail(email);

    cy.get(subscription.successMessage).should("exist").and("be.visible");
    cy.contains(subscription.successMessage, "You have been successfully subscribed!").should("be.visible");
  });
});
