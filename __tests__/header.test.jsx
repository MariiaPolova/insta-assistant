
// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require('puppeteer');

test('Launch puppetter', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/account/diali_cooking');
  const title = await page.title();
  expect(title).toBe('Insta assistant');
  await browser.close();
});