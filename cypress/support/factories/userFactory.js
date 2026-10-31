export const buildUser = (overrides = {}) => {
  const uniqueId = `${Date.now()}${Cypress._.random(100, 999)}`;

  return {
    title: "Mr",
    name: `QA User ${uniqueId}`,
    email: `qa.user.${uniqueId}@example.com`,
    password: "Senha@123",
    birthDay: "10",
    birthMonth: "May",
    birthMonthNumber: "5",
    birthYear: "1990",
    firstName: "Quality",
    lastName: "Engineer",
    company: "PGATS",
    address: "Rua das Flores, 123",
    address2: "Apto 45",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    zipcode: "M5V2T6",
    mobile: "+14165550123",
    newsletter: true,
    offers: true,
    ...overrides,
  };
};
