const { chromium } = require('@playwright/test');
(async() => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  page.on('console', msg => console.log('CONSOLE', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR', err.message));
  page.on('requestfailed', req => console.log('REQFAIL', req.url(), req.failure()?.errorText));
  await page.goto('https://onenetservers.net/store/web-hosting/web-starter?billingcycle=annually&currency=4&_pw=1', {waitUntil:'domcontentloaded', timeout: 60000});
  await page.waitForTimeout(3000);
  console.log('TITLE', await page.title());
  console.log('REGISTER_CHECKED', await page.locator('#selregister').isChecked().catch(()=>false));
  console.log('TLD_VALUE', await page.locator('#registertld').inputValue().catch(()=> 'ERR'));
  console.log('TLD_OPTIONS', await page.locator('#registertld option').count().catch(()=>-1));
  console.log('BTN_CHECK', await page.locator('#btnDomainChecker').count().catch(()=>0));
  await page.locator('#registersld').fill('akinolannn');
  if (await page.locator('#btnDomainChecker').count()) {
    await page.locator('#btnDomainChecker').click();
  } else {
    await page.getByRole('button', {name:/check/i}).click();
  }
  await page.waitForTimeout(7000);
  console.log('URL_AFTER', page.url());
  const body = await page.locator('body').innerText();
  for (const marker of ['Suggested Domains','The system could not find any suggestions.','Verifying your domain selection','Continue']) {
    console.log(marker, body.includes(marker));
  }
  await page.screenshot({path:'phase1-domain-check.png', fullPage:true});
  await browser.close();
})();
