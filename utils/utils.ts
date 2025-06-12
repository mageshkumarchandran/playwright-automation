import { Locator, Page, expect } from '@playwright/test';

export async function selectDropdownValue(page: Page, selector: string, value: string) {
  await page.selectOption(selector, String(value));
}

//This function will close teh dialog after clicking on add to Cart
export async function closeDialog(button: Locator, page: Page) {

  await button.waitFor({ state: 'visible' });

  await button.click()
  await page.waitForTimeout(3000);

}

//Validate response Body
export function validateResponseBody(body: any, expectedRecord: Record<string, any>) {
  for (const key in expectedRecord) {
    expect(body).toHaveProperty(key);
    expect(body[key]).toEqual(expectedRecord[key]);
  }
}
//This function will create the pattern for response
export const createReponse = {
  responseCode: 201,
  message: 'User created!'
};

export const validLoginReponse = {
  responseCode: 200,
  message: 'User exists!'
};

export const missingReqResponse = {
  responseCode: 400,
  message: 'Bad request, email or password parameter is missing in POST request.'
};

export const deleteResponse = {
  responseCode: 405,
  message: 'This request method is not supported.'
};

export const invalidReqResponse = {
  responseCode: 405,
  message: 'User not found!'
};