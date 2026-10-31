const parseBody = (body) => {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch (error) {
    return { raw: body };
  }
};

const toApiPayload = (user) => ({
  name: user.name,
  email: user.email,
  password: user.password,
  title: user.title,
  birth_date: user.birthDay,
  birth_month: user.birthMonthNumber,
  birth_year: user.birthYear,
  firstname: user.firstName,
  lastname: user.lastName,
  company: user.company,
  address1: user.address,
  address2: user.address2,
  country: user.country,
  zipcode: user.zipcode,
  state: user.state,
  city: user.city,
  mobile_number: user.mobile,
});

let usersToCleanup = [];

export const trackUserForCleanup = (user) => {
  usersToCleanup.push(user);
};

export const createUserViaApi = (user) =>
  cy
    .request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: toApiPayload(user),
      log: false,
    })
    .then(({ body }) => {
      const response = parseBody(body);
      expect(response.responseCode, `createAccount: ${response.message}`).to.eq(201);
      trackUserForCleanup(user);
      Cypress.log({ name: "api", message: `usuário criado: ${user.email}` });
      return cy.wrap(user, { log: false });
    });

export const deleteUserViaApi = (user) =>
  cy
    .request({
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      body: { email: user.email, password: user.password },
      failOnStatusCode: false,
      log: false,
    })
    .then(({ body }) => {
      Cypress.log({ name: "api", message: `cleanup ${user.email}: ${parseBody(body).message}` });
    });

export const cleanupTrackedUsers = () => {
  const users = usersToCleanup;
  usersToCleanup = [];
  users.forEach((user) => deleteUserViaApi(user));
};
