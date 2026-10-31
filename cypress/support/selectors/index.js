export const byQa = (value) => `[data-qa="${value}"]`;
export const byHref = (href) => `a[href="${href}"]`;

export const header = {
  productsLink: `.navbar-nav ${byHref("/products")}`,
  cartLink: `.navbar-nav ${byHref("/view_cart")}`,
  loginLink: `.navbar-nav ${byHref("/login")}`,
  logoutLink: `.navbar-nav ${byHref("/logout")}`,
  deleteAccountLink: `.navbar-nav ${byHref("/delete_account")}`,
  loggedInAs: ".navbar-nav li:has(a > i.fa-user)",
};

export const home = {
  carousel: "#slider-carousel",
};

export const login = {
  loginTitle: ".login-form h2",
  loginEmail: byQa("login-email"),
  loginPassword: byQa("login-password"),
  loginButton: byQa("login-button"),
  loginError: ".login-form p",

  signupTitle: ".signup-form h2",
  signupName: byQa("signup-name"),
  signupEmail: byQa("signup-email"),
  signupButton: byQa("signup-button"),
  signupError: ".signup-form p",
};

export const signup = {
  accountInfoTitle: ".login-form h2.title b",
  titleMr: "#id_gender1",
  titleMrs: "#id_gender2",
  name: byQa("name"),
  email: "#email",
  password: byQa("password"),
  day: byQa("days"),
  month: byQa("months"),
  year: byQa("years"),
  newsletter: "#newsletter",
  offers: "#optin",
  firstName: byQa("first_name"),
  lastName: byQa("last_name"),
  company: byQa("company"),
  address: byQa("address"),
  address2: byQa("address2"),
  country: byQa("country"),
  state: byQa("state"),
  city: byQa("city"),
  zipcode: byQa("zipcode"),
  mobile: byQa("mobile_number"),
  createAccountButton: byQa("create-account"),

  accountCreatedTitle: byQa("account-created"),
  accountDeletedTitle: byQa("account-deleted"),
  continueButton: byQa("continue-button"),
};

export const products = {
  title: ".features_items .title",
  searchInput: "#search_product",
  searchButton: "#submit_search",
  productCard: ".features_items .product-image-wrapper",
  productName: ".features_items .productinfo p",
  viewProductLink: (id) => byHref(`/product_details/${id}`),
};

export const productDetail = {
  container: ".product-information",
  name: ".product-information h2",
  category: ".product-information p:contains('Category:')",
  price: ".product-information span span",
  availability: ".product-information p:contains('Availability:')",
  condition: ".product-information p:contains('Condition:')",
  brand: ".product-information p:contains('Brand:')",
};

export const cart = {
  info: "#cart_info",
  rowName: (id) => `#product-${id} .cart_description h4 a`,
  rowQuantity: (id) => `#product-${id} .cart_quantity button`,
  rowTotal: (id) => `#product-${id} .cart_total_price`,
  proceedToCheckout: ".check_out",
};

export const checkout = {
  deliveryAddress: "#address_delivery",
  invoiceAddress: "#address_invoice",
  reviewOrder: "#cart_info",
  commentTextarea: "textarea[name='message']",
  placeOrderLink: byHref("/payment"),
};

export const payment = {
  nameOnCard: byQa("name-on-card"),
  cardNumber: byQa("card-number"),
  cvc: byQa("cvc"),
  expiryMonth: byQa("expiry-month"),
  expiryYear: byQa("expiry-year"),
  payButton: byQa("pay-button"),
  orderPlacedTitle: byQa("order-placed"),
  orderPlacedMessage: ".col-sm-9.col-sm-offset-1 p",
};

export const subscription = {
  title: "footer .single-widget h2",
  email: "#susbscribe_email",
  button: "#subscribe",
  successMessage: "#success-subscribe .alert-success",
};
