import { defineConfig } from '@playwright/test';

export const env = process.env.ENV || 'dev';

const baseURLs: Record<string, string> = {
  dev: 'https://automationexercise.com/',
  testt: 'https://test.automationexercise.com/'
};
export const url = baseURLs[env];
export const browserName = 'chromium';

export default defineConfig({
   reporter: [['html', { open: 'always' }]],
  globalSetup: require.resolve('./global-setup'),
  testDir: './tests',
  projects: [
    {
      name: 'ui',
      use: {
        baseURL: url,
        headless: false,
        browserName,
        storageState: './storageState.json'

      },
    },
    {
    name: 'api' 

    }
  ]
});