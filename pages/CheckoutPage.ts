import { Locator, Page, expect } from '@playwright/test';
import * as data from '../test-data/testData.json';
import { generateUserData } from '../test-data/testDataGenerator';
type record = ReturnType<typeof generateUserData>;
import { selectDropdownValue } from '../utils/utils'


export class CheckoutPage {
  readonly page: Page;
  readonly deliveryName: Locator;
  readonly deliveryAdress: Locator
  readonly deliveryCityCode: Locator
  readonly deliveryCountry: Locator
  readonly deliveryMobile: Locator
  readonly textaresMsg: Locator
  readonly placeOrder: Locator

  constructor(page: Page) {
    this.page = page;
    this.deliveryName = page.locator('#address_delivery  .address_firstname');
    this.deliveryAdress = page.locator('#address_delivery  .address_address2');
    this.deliveryCityCode = page.locator('#address_delivery  .address_city');
    this.deliveryCountry = page.locator('#address_delivery  .address_country_name');
    this.deliveryMobile = page.locator('#address_delivery  .address_phone');
    this.textaresMsg = page.locator('#ordermsg  textarea');
    this.placeOrder = page.getByRole('link', { name: 'Place Order' });
  }

  //This function will valdate teh delivery address against data generated through Foker
  async validateAddress(userData: record) {
    const actualValues: string[] = [];
    const expectedValues: string[] = [];
    const listItem = this.page.locator('#address_delivery li');
    await this.page.waitForTimeout(5000)
    const count = await listItem.count();

    expectedValues.push(data.prefix + '. ' + userData.firstName + ' ' + userData.LastName);
    expectedValues.push(userData.address.street);
    expectedValues.push(userData.address.city + ' ' + userData.address.state + ' ' + userData.address.postcode);
    expectedValues.push(userData.address.country);
    expectedValues.push(userData.Mobile);

    for (let i = 1; i < count; i++) {
      const text = (await listItem.nth(i).textContent())?.split('\n').map(line => line.trim())
        .filter(line => line).join(' ');

      if (text) {
        actualValues.push(text);
      }
    }
    expect(actualValues).toEqual(expectedValues);

  }
//This function will enter teh comment and click to proceed order
  async enterDescriptionAnsplaceAOrder() {
    await this.textaresMsg.fill(data.comment)
    await this.placeOrder.click();
    await this.page.waitForTimeout(2000);

  }

}