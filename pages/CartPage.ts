import { Locator, Page, expect } from '@playwright/test';
import * as data from '../test-data/testData.json';
import { closeDialog } from '../utils/utils'

export class CartPage {
    readonly page: Page;
    readonly cart: Locator;
    readonly cartVerify: Locator
    readonly checkout: Locator
    readonly modelButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.cart = page.getByRole('link', { name: 'cart' })
        this.cartVerify = page.getByRole('link', { name: data.product })
        this.checkout = page.locator('section#do_action a:has-text("Proceed To Checkout")');
        this.modelButton = page.getByRole('button', { name: 'Continue On Cart' });
    }

    //This function will verify Cart and close the dialog if user not registered
    async clickAndVerifyCart(Dialog: string) {
        await this.cart.click();
        await expect(this.cartVerify).toBeVisible();
        await this.page.waitForTimeout(3000);
        await this.checkout.click();
        if (Dialog !== '')
            closeDialog(this.modelButton, this.page);
    }
}