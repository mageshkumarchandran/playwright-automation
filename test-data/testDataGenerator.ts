import { faker } from '@faker-js/faker';

const date = faker.date.past({ years: 20 });;
export function generateUserData() {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    LastName: faker.person.lastName(),
    creditCardName: faker.finance.accountName(),
    creditCardNumber: faker.finance.accountNumber(),
    creditCardCCV: faker.finance.creditCardCVV(),
    day: faker.number.int({ min: 1, max: 28 }),
    month: date.getMonth() + 1,
    year: faker.number.int({ min: 1990, max: 1995 }),

    Mobile: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postcode: faker.location.zipCode(),
      country: "Australia"
    },
    payment: {
      cardNumber: faker.finance.creditCardNumber(),
      expiry: '12/26', 
      cvv: faker.finance.creditCardCVV()
    }
  };
}

//This function will create Request parameter for create user request
export const userDetails = {
  name: faker.internet.username(),
  email: faker.internet.email(),
  password: "testing",
  title: faker.person.prefix(),
  brth_date: faker.number.int({ min: 1, max: 28 }),
  birth_month: date.getMonth() + 1,
  birth_year: faker.number.int({ min: 1990, max: 1995 }),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  address1: faker.location.streetAddress(),
  country: "New Zealand",
  zipcode: faker.location.zipCode(),
  state: faker.location.state(),
  city: faker.location.city(),
  mobile_number: faker.phone.number()

};
