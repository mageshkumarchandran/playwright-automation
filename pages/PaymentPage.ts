import { Locator, Page, expect } from '@playwright/test';
import * as data from '../test-data/testData.json';
import { closeDialog } from '../utils/utils'
import { generateUserData } from '../test-data/testDataGenerator';

type record = ReturnType<typeof generateUserData>;

export class PaymentPage {
    readonly page: Page;
    readonly cardName: Locator;
    readonly cardNumber: Locator
    readonly expiryMonth: Locator
    readonly expiryYear: Locator
    readonly cvc: Locator
    readonly pay: Locator
    readonly succesMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.cardName = page.locator('input[data-qa=name-on-card]');
        this.cardNumber = page.locator('input[data-qa=card-number]');
        this.expiryMonth = page.locator('input[data-qa=expiry-month]');
        this.expiryYear = page.locator('input[data-qa=expiry-year]');
        this.cvc = page.locator('input[data-qa=cvc]');
        this.pay = page.locator('button[data-qa=pay-button]');
        this.succesMsg = page.locator('p', { hasText: 'Congratulations' })

    }
    //This fucntion will issue payemnt
    async placeOrder(paymentDetails: record) {
        await this.cardName.fill(paymentDetails.creditCardName)
        await this.cardNumber.fill(paymentDetails.creditCardNumber)
        await this.cvc.fill(paymentDetails.creditCardCCV)
        await this.expiryMonth.fill(data.cardExpiryDate)
        await this.expiryYear.fill(data.cardExpiryYear)
        await this.pay.click();
        await expect(this.succesMsg).toHaveText(data.successPlcaedOrder);

    }
}