import { cart, checkout, payment } from "../selectors";

export const proceedToCheckout = () => cy.get(cart.proceedToCheckout).click();

export const placeOrder = (comment) => {
  cy.get(checkout.commentTextarea).type(comment);
  cy.get(checkout.placeOrderLink).click();
};

export const fillPaymentDetails = (card) => {
  cy.get(payment.nameOnCard).type(card.nameOnCard);
  cy.get(payment.cardNumber).type(card.cardNumber, { log: false });
  cy.get(payment.cvc).type(card.cvc, { log: false });
  cy.get(payment.expiryMonth).type(card.expiryMonth);
  cy.get(payment.expiryYear).type(card.expiryYear);
};

export const payAndConfirmOrder = () => cy.get(payment.payButton).click();
