import { test, expect } from '@playwright/test';
import {userDetails} from '../test-data/testDataGenerator';
import * as validation from '../utils/utils'

 enum ApiUrls {
  create = 'https://automationexercise.com/api/createAccount',
  verify = 'https://automationexercise.com/api/verifyLogin'
}
const records=userDetails;
test.describe.serial('API Tests  @api', () => {
test('Create New User ', async ({ request }) => {
  const response = await request.post(ApiUrls.create, {
    form: records
  });
  const body = await response.json();
  expect(response.status()).toBe(200); 
  validation.validateResponseBody(body,validation.createReponse)
});

test('Verify Login with Valid credentials', async ({ request }) => {
  const response = await request.post(ApiUrls.verify, {
    form: {email:records.email,password:records.password}
  });
  const body = await response.json();
  expect(response.status()).toBe(200); 
  validation.validateResponseBody(body,validation.validLoginReponse)
});
});

test('Verify Login with missing credentials @api', async ({ request }) => {
  const response = await request.post(ApiUrls.verify, {
    form:  {password:records.password}
  });
  const body = await response.json();
  expect(response.status()).toBe(200); 
  validation.validateResponseBody(body,validation.missingReqResponse)
});

test('Delete account @api', async ({ request }) => {
  const response = await request.delete(ApiUrls.verify, {
  });
  const body = await response.json();
  expect(response.status()).toBe(200); 
  validation.validateResponseBody(body,validation.deleteResponse)
});

test('Verify Login with in valid credentials @api', async ({ request }) => {
  const response = await request.post(ApiUrls.verify, {
    form: {email:"invalid",password:records.password}
  });
  const body = await response.json();
  expect(response.status()).toBe(200); 
  validation.validateResponseBody(body,{})
});