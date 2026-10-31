import { header } from "../selectors";
import { routes } from "../routes";

export const visitHome = () => cy.visit(routes.home);

export const goToLogin = () => cy.get(header.loginLink).click();

export const goToProducts = () => cy.get(header.productsLink).click();

export const goToCart = () => cy.get(header.cartLink).click();
