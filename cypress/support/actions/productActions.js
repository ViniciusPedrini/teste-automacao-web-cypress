import { products } from "../selectors";

export const searchProduct = (term) => {
  cy.get(products.searchInput).type(term);
  cy.get(products.searchButton).click();
};

export const openProductDetails = (productId) =>
  cy.get(products.viewProductLink(productId)).first().click();
