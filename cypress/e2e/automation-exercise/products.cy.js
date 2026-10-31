import { products, productDetail } from "../../support/selectors";
import { routes } from "../../support/routes";
import { visitHome, goToProducts } from "../../support/actions/navigationActions";
import { openProductDetails, searchProduct } from "../../support/actions/productActions";
import { assertHomeIsVisible } from "../../support/assertions/pageAssertions";
import productData from "../../fixtures/products.json";

describe("Catálogo de produtos", () => {
  beforeEach(() => {
    visitHome();
    assertHomeIsVisible();
    goToProducts();
    cy.contains(products.title, "All Products", { matchCase: false }).should("be.visible");
  });

  it("TC08 - Verificar todos os produtos e a página de detalhes do produto", () => {
    const { id, name, category, price, availability, condition, brand } = productData.firstProduct;

    cy.get(products.productCard).should("be.visible").and("have.length.greaterThan", 1);

    openProductDetails(id);

    cy.location("pathname").should("eq", routes.productDetails(id));
    cy.get(productDetail.container).should("exist").and("be.visible");
    cy.get(productDetail.name).should("be.visible").and("have.text", name);
    cy.contains(productDetail.category, category).should("be.visible");
    cy.contains(productDetail.price, price).should("be.visible");
    cy.contains(productDetail.availability, availability).should("be.visible");
    cy.contains(productDetail.condition, condition).should("be.visible");
    cy.contains(productDetail.brand, brand).should("be.visible");
  });

  it("TC09 - Pesquisar produto", () => {
    const { term } = productData.search;

    searchProduct(term);

    cy.contains(products.title, "Searched Products", { matchCase: false }).should("be.visible");
    cy.get(products.productCard).should("exist").and("be.visible");
    cy.get(products.productName)
      .should("have.length.greaterThan", 0)
      .each(($name) => expect($name.text().toLowerCase()).to.contain(term.toLowerCase()));
  });
});
