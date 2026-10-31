export const addProductToCartViaApi = (productId) =>
  cy
    .request({ method: "GET", url: `/add_to_cart/${productId}`, log: false })
    .its("status")
    .should("eq", 200)
    .then(() => Cypress.log({ name: "api", message: `produto ${productId} adicionado ao carrinho` }));

export const addProductsToCartViaApi = (productIds) => productIds.forEach(addProductToCartViaApi);
