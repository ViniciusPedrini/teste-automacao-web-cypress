import { cart, checkout, payment } from "../../support/selectors";
import { routes } from "../../support/routes";
import { buildUser } from "../../support/factories/userFactory";
import { createUserViaApi, trackUserForCleanup } from "../../support/api/userApi";
import { addProductsToCartViaApi } from "../../support/api/cartApi";
import { goToCart, goToLogin, visitHome } from "../../support/actions/navigationActions";
import { loginViaUi, startSignup } from "../../support/actions/authActions";
import {
  continueAfterAccountEvent,
  deleteAccountViaUi,
  fillAccountInformation,
  submitAccountCreation,
} from "../../support/actions/accountActions";
import { fillPaymentDetails, payAndConfirmOrder, placeOrder, proceedToCheckout } from "../../support/actions/checkoutActions";
import {
  assertAccountCreated,
  assertAccountDeleted,
  assertAccountInformationPageIsVisible,
  assertHomeIsVisible,
  assertLoggedInAs,
  assertLoggedOut,
  assertLoginPageIsVisible,
} from "../../support/assertions/pageAssertions";
import productData from "../../fixtures/products.json";
import card from "../../fixtures/payment.json";
import order from "../../fixtures/order.json";

const items = [productData.firstProduct, productData.secondProduct];
const itemIds = items.map(({ id }) => id);

const assertCartContainsProducts = () => {
  cy.location("pathname").should("eq", routes.cart);
  cy.get(cart.info).should("be.visible");
  items.forEach(({ id, name, price }) => {
    cy.contains(cart.rowName(id), name).should("be.visible");
    cy.get(cart.rowQuantity(id)).should("be.visible").and("have.text", "1");
    cy.contains(cart.rowTotal(id), price).should("be.visible");
  });
};

const assertAddressAndOrderReview = (user) => {
  [checkout.deliveryAddress, checkout.invoiceAddress].forEach((address) => {
    cy.contains(address, `${user.firstName} ${user.lastName}`).should("be.visible");
    cy.contains(address, user.address).should("be.visible");
    cy.contains(address, `${user.city} ${user.state} ${user.zipcode}`).should("be.visible");
  });

  cy.get(checkout.reviewOrder).should("be.visible");
  items.forEach(({ name }) => {
    cy.contains(checkout.reviewOrder, name).should("be.visible");
  });
};

const assertOrderPlaced = () => {
  cy.location("pathname").should("include", routes.paymentDone);
  cy.contains(payment.orderPlacedTitle, "Order Placed!", { matchCase: false }).should("be.visible");
  cy.contains(payment.orderPlacedMessage, "Congratulations! Your order has been confirmed!").should("be.visible");
};

describe("Checkout e finalização de pedido", () => {
  beforeEach(() => {
    visitHome();
    assertHomeIsVisible();
    goToLogin();
  });

  it("TC15 - Realizar pedido: cadastrar-se antes do checkout", () => {
    const user = buildUser();
    trackUserForCleanup(user);

    startSignup(user);
    assertAccountInformationPageIsVisible();

    fillAccountInformation(user);
    submitAccountCreation();
    assertAccountCreated();

    continueAfterAccountEvent();
    assertLoggedInAs(user);

    addProductsToCartViaApi(itemIds);
    goToCart();
    assertCartContainsProducts();

    proceedToCheckout();
    assertAddressAndOrderReview(user);

    placeOrder(order.comment);
    fillPaymentDetails(card);
    payAndConfirmOrder();
    assertOrderPlaced();

    deleteAccountViaUi();

    assertAccountDeleted();
    continueAfterAccountEvent();
    assertLoggedOut();
  });

  it("TC16 - Realizar pedido: login antes do checkout", () => {
    const user = buildUser();
    createUserViaApi(user);

    assertLoginPageIsVisible();
    loginViaUi(user);
    assertLoggedInAs(user);

    addProductsToCartViaApi(itemIds);
    goToCart();
    assertCartContainsProducts();

    proceedToCheckout();
    assertAddressAndOrderReview(user);

    placeOrder(order.comment);
    fillPaymentDetails(card);
    payAndConfirmOrder();
    assertOrderPlaced();

    deleteAccountViaUi();

    assertAccountDeleted();
    continueAfterAccountEvent();
    assertLoggedOut();
  });
});
