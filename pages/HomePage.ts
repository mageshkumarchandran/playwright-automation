import { expect, Locator, Page } from '@playwright/test';
import * as data from '../test-data/testData.json';
import { closeDialog } from '../utils/utils'
import { generateUserData } from '../test-data/testDataGenerator';

type record = ReturnType<typeof generateUserData>;
export class HomePage {
  readonly page: Page;
  readonly homePageVerify: Locator
  readonly product: Locator;
  readonly login: Locator
  readonly name: Locator
  readonly email: Locator
  readonly signUp: Locator
  readonly model: Locator
  readonly modelButton: Locator
  readonly deleteAcc: Locator
  readonly accDeletedMsg: Locator
  readonly continue: Locator

  constructor(page: Page) {
    this.page = page;
    this.product = page.locator('.single-products').nth(0);
    this.login = page.getByRole('link', { name: 'Signup / Login' })
    this.email = page.locator('.signup-form [name=email]');
    this.name = page.getByPlaceholder('Name');
    this.signUp = page.getByRole('button', { name: 'Signup' });
    this.model = page.locator('div.modal-dialog');
    this.modelButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.deleteAcc = page.getByRole('link', { name: ' Delete Account' })
    this.accDeletedMsg = page.locator('b', { hasText: 'Account Deleted' })
    this.continue = page.getByRole('link', { name: 'Continue' });
    this.homePageVerify = page.locator('h2:has-text("Features Items")');
  }

  async addProduct() {

    const firstProduct = this.product;
    await firstProduct.hover();
    await firstProduct.locator('div.productinfo').locator('a.add-to-cart').click();
    closeDialog(this.modelButton, this.page);
    await this.page.waitForTimeout(3000);
  }
//This function will create user will name and email
  async signingUp(userData: record) {
    await this.login.click();
    await this.name.fill(userData.username)
    await this.email.fill(userData.email)
    await this.signUp.click();
  }
  async deleteAccount() {
    await this.deleteAcc.click();
    await expect(this.accDeletedMsg).toHaveText(data.accDeleted);
    await this.continue.click();
  }

}