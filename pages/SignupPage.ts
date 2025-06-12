import { Locator, Page, expect } from '@playwright/test';
import * as data from '../test-data/testData.json';
import { generateUserData } from '../test-data/testDataGenerator';
type record = ReturnType<typeof generateUserData>;
import { selectDropdownValue } from '../utils/utils'


export class SignupPage {
  readonly page: Page;
  readonly title: Locator;
  readonly password: Locator
  readonly days: string
  readonly month: string
  readonly year: string
  readonly newsletter: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly address: Locator
  readonly country: string
  readonly state: Locator
  readonly city: Locator
  readonly zipCode: Locator
  readonly mobile: Locator
  readonly createAccount: Locator
  readonly successMsg: Locator
  readonly continue: Locator
  readonly loggedInAs: Locator


  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(`input[type="radio"][value="${data.prefix}"]`);
    this.password = page.locator('#password');
    this.days = 'select[data-qa="days"]';
    this.month = 'select[data-qa="months"]';
    this.year = 'select[data-qa="years"]';
    this.newsletter = page.locator('#newsletter');
    this.firstName = page.locator('input[name="first_name"]')
    this.lastName = page.locator('input[name="last_name"]');
    this.address = page.locator('#address1');
    this.country = 'select[data-qa="country"]';
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipCode = page.locator('#zipcode');
    this.mobile = page.locator('input[name="mobile_number"]')
    this.createAccount = page.getByRole('button', { name: 'Create Account' })
    this.successMsg = page.locator('b', { hasText: 'Account Created!' })
    this.continue = page.getByRole('link', { name: 'Continue' })
    this.loggedInAs = page.locator('a:has-text(" Logged in as ")')


  }
  //This function will create new user
  async userRegistrationAndVerification(userData: record) {
    await this.title.click()
    await this.password.fill(userData.password)
    await selectDropdownValue(this.page, this.days, String(userData.day))
    await selectDropdownValue(this.page, this.month, String(userData.month))
    await selectDropdownValue(this.page, this.year, String(userData.year))
    await this.newsletter.click();
    await this.firstName.fill(userData.firstName)
    await this.lastName.fill(userData.LastName)
    await this.address.fill(userData.address.street)
    await selectDropdownValue(this.page, this.country, userData.address.country)
    await this.state.fill(userData.address.state)
    await this.city.fill(userData.address.city)
    await this.zipCode.fill(userData.address.postcode)
    await this.mobile.fill(userData.Mobile)
    await this.createAccount.click();
    await expect(this.successMsg).toHaveText(data.creationSuccess);
    await this.continue.click();
    await expect(this.loggedInAs).toContainText(userData.username);

  }


}