import { config } from 'node:process';
import { url, env } from './playwright.config';
import type { FullConfig } from '@playwright/test';
import { chromium, firefox, webkit, Browser, BrowserType } from '@playwright/test';
async function globalSetup(config: FullConfig) {

  const projectName = process.env.PROJECT_NAME;

  if (projectName === 'ui') {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    if (!response || !response.ok()) {
      console.error(`Environment ${env} URL check failed with status: ${response?.status()}`);
      process.exit(1);
    }
    console.log(`Environment ${env} is reachable.`);
    await page.context().storageState({ path: './storageState.json' });
  } catch (error) {
    console.error(`Environment ${env} URL check error:`, error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

}

export default globalSetup;