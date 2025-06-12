## Framework Explanation:
   I have implemented Page object model(POM) inclduing spec file,test data and utils folder
   Implemented session storage and global set up(only for UI Tests)

   Created two projects under config file one for UI and another for API

   advantages -  with Page object model ,test maintanence could be eased and easy to debug and fix if any issues occurs.

   Test Data - Used Faker library.

## Software tools required
  playwright - Version 1.51.0
  node - v20.16.0
  tools - Intellij / VSCode

##installation:
npm install (for node_mmodules)
nvm install 20.16
npm install -D @playwright/test@1.51.0
npm install @faker-js/faker --save-dev


## How to run the test

  Open the terminal and run below command:

  To run UI -  PROJECT_NAME=ui ENV=dev npx playwright test --project=ui --grep @AddtoCartFirst
  To run API-  PROJECT_NAME=api ENV=dev npx playwright test --project=api --grep @api

  ENV - can be Dev and test
  PROJECT_NAME -api or ui

  I have added tags in the tests ,it can be changed if required.

## Reports
  Html repost will be generated under playwright-report folder after test completion

## Issues observed
After landing home page , browser keep on loading , however i can add the product to Cart.
There is some delay for product to be visible  in Cart after clicking 'add to Cart'.
