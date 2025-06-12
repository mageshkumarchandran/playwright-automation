import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'
import { SignupPage } from '../pages/SignupPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { generateUserData } from '../test-data/testDataGenerator';
import { PaymentPage } from '../pages/PaymentPage'
import * as data from '../test-data/testData.json';

let homePage: HomePage;
let cartPage: CartPage;
let signupPage: SignupPage
let checkoutPage: CheckoutPage
let paymentPage: PaymentPage
const UserRecord = generateUserData();
test.setTimeout(80000);
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  cartPage = new CartPage(page);
  signupPage = new SignupPage(page);
  checkoutPage = new CheckoutPage(page)
  paymentPage = new PaymentPage(page);

  await page.goto('/');
  //verifying home page
  await expect(homePage.homePageVerify).toHaveText(data.hoemePageVerification);

});

test('Place Order and Register While Checkout @AddtoCartFirst', async ({ page }, testInfo) => {
  await homePage.addProduct();
  //This will validate Cart and close dialog based on parameter passed("Yes"/ "null")
  await cartPage.clickAndVerifyCart("Yes");
  await homePage.signingUp(UserRecord);
  await signupPage.userRegistrationAndVerification(UserRecord);
  await cartPage.cart.click();
  await cartPage.checkout.click();
  await checkoutPage.validateAddress(UserRecord);
  await checkoutPage.enterDescriptionAnsplaceAOrder();
  await paymentPage.placeOrder(UserRecord);
  await homePage.deleteAccount();

  testInfo.annotations.push({
    type: 'info',
    description: 'Order has been placed successfully and Customer registration done during checkout',
  });

});

test('Place Order and Register before Checkout @RegisterFirst', async ({ page }, testInfo) => {
  await homePage.signingUp(UserRecord);
  await signupPage.userRegistrationAndVerification(UserRecord);
  await homePage.addProduct();
  await cartPage.clickAndVerifyCart("");
  await cartPage.cart.click();
  await cartPage.checkout.click();
  await checkoutPage.validateAddress(UserRecord);
  await checkoutPage.enterDescriptionAnsplaceAOrder();
  await paymentPage.placeOrder(UserRecord);
  await homePage.deleteAccount();

  testInfo.annotations.push({
    type: 'info',
    description: 'Custoemer Regstration done  and Order has been placed successfully',
  });

});