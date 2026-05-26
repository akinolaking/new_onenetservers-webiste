import { chromium, devices } from 'playwright';
import fs from 'fs';
const outDir = `/tmp/onenet-pw/prod-ux-audit-${Date.now()}`;
fs.mkdirSync(outDir, { recursive: true });
const findings = [];
const push = (flow, step, data) => findings.push({ flow, step, ...data });
const browser = await chromium.launch({ headless: true });
async function makePage(context){
  const page = await context.newPage();
  const consoleErrors=[]; const requestIssues=[];
  page.on('console', m=>{ if(m.type()==='error') consoleErrors.push(m.text()); });
  page.on('response', r=>{ if(r.status()>=400) requestIssues.push(`${r.status()} ${r.request().method()} ${r.url()}`); });
  page.on('requestfailed', r=>requestIssues.push(`FAILED ${r.method()} ${r.url()} ${r.failure()?.errorText||''}`));
  return { page, consoleErrors, requestIssues };
}
async function goto(page,url){ await page.goto(url,{waitUntil:'domcontentloaded',timeout:120000}); await page.waitForTimeout(2500); }
async function shot(page,name){ await page.screenshot({path:`${outDir}/${name}.png`, fullPage:true}); }

// Desktop WordPress journey
{
  const ctx = await browser.newContext({ viewport:{width:1440,height:1100}, ignoreHTTPSErrors:true });
  const {page, consoleErrors, requestIssues} = await makePage(ctx);
  await goto(page,'https://onenetservers.net/');
  await shot(page,'desktop-home');
  let href=null;
  try { await page.getByText('Hosting').first().hover(); await page.waitForTimeout(800); } catch {}
  const wp = page.getByRole('link', { name:/WordPress Hosting/i }).first();
  if (await wp.count()) {
    href = await wp.getAttribute('href');
    await wp.click({force:true}).catch(()=>{});
    await page.waitForTimeout(2500);
    push('wordpress-desktop','nav-click',{ url: page.url(), completed: !/404|not found/i.test((await page.title())+' '+await page.textContent('body')), href });
    await shot(page,'desktop-wordpress-nav');
  } else {
    push('wordpress-desktop','nav-click',{ url: page.url(), completed:false, issue:'WordPress Hosting link not found in desktop nav' });
  }
  for (const u of ['https://onenetservers.net/wordpress-hosting','https://onenetservers.net/hosting/wordpress']) {
    await goto(page,u).catch(()=>{});
    const title = await page.title().catch(()=> '');
    const body = await page.textContent('body').catch(()=> '');
    push('wordpress-desktop','route-check',{ tested:u, url:page.url(), completed: !/404|not found/i.test(`${title} ${body}`), title, bodySnippet: body.replace(/\s+/g,' ').slice(0,180) });
  }
  await goto(page,'https://onenetservers.net/hosting/wordpress').catch(()=>{});
  const cta = page.getByRole('link', { name:/Get Started|Order Now|Buy Now|Choose plan|Select Plan|Start/i }).first();
  if (await cta.count()) {
    const ctaHref = await cta.getAttribute('href');
    await cta.click({force:true}).catch(()=>{});
    await page.waitForTimeout(2500);
    const body = await page.textContent('body').catch(()=> '');
    push('wordpress-desktop','product-cta',{ url:page.url(), completed:/Choose a Domain|Shopping Cart|Configure Product|Review & Checkout/i.test(body), href:ctaHref, bodySnippet: body.replace(/\s+/g,' ').slice(0,180) });
    await shot(page,'desktop-wordpress-after-cta');
  }
  push('wordpress-desktop','runtime',{ url:page.url(), completed:true, consoleErrors: consoleErrors.slice(0,10), requestIssues: requestIssues.slice(0,20) });
  await ctx.close();
}

// Desktop standalone domain registration + checkout/account creation surface
{
  const ctx = await browser.newContext({ viewport:{width:1440,height:1200}, ignoreHTTPSErrors:true });
  const {page, consoleErrors, requestIssues} = await makePage(ctx);
  await goto(page,'https://onenetservers.net/domains');
  await shot(page,'desktop-domains');
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map(a=>({text:(a.textContent||'').trim().replace(/\s+/g,' '),href:a.getAttribute('href')})).filter(x=>/tld=|domain=register|domain=transfer/.test(x.href||'')).slice(0,30));
  push('domain-register-desktop','domain-page-links',{ url: page.url(), completed:true, links });
  let target = links.find(x=>x.href && x.href.includes('tld=.com'))?.href || links.find(x=>x.href && x.href.includes('domain=register'))?.href || '/cart.php?a=add&domain=register&tld=.com';
  if (target.startsWith('/')) target = 'https://onenetservers.net' + target;
  await goto(page,target);
  const tldAtEntry = await page.locator('select[name="tld"]').inputValue().catch(()=>null);
  push('domain-register-desktop','entry',{ url:page.url(), completed:true, selectedTld:tldAtEntry, target });
  const name = 'audit' + Date.now().toString().slice(-6);
  const sld = page.locator('input[name="sld"], input[placeholder*="business" i]').first();
  if (await sld.count()) await sld.fill(name);
  if (await page.locator('select[name="tld"]').count()) await page.locator('select[name="tld"]').selectOption('.com').catch(()=>{});
  const check = page.getByRole('button', { name:/Check|Search/i }).first();
  if (await check.count()) { await check.click({force:true}).catch(()=>{}); await page.waitForTimeout(5000); }
  await shot(page,'desktop-domain-search');
  let body = await page.textContent('body').catch(()=> '');
  push('domain-register-desktop','search-results',{ url:page.url(), completed:/Suggested Domains|is available/i.test(body), exactMatch:/is available/i.test(body), suggestedDomains:/Suggested Domains/i.test(body), moreSuggestions:/Give me more suggestions!/i.test(body), addToCartCount: await page.getByRole('button',{name:/Add to Cart/i}).count().catch(()=>0), bodySnippet: body.replace(/\s+/g,' ').slice(0,260), consoleErrors: consoleErrors.slice(0,10), requestIssues: requestIssues.slice(0,20) });
  const mainCta = page.getByRole('button', { name:/Continue to register this domain|Add to Cart|Checkout|Use/i }).first();
  if (await mainCta.count()) { await mainCta.click({force:true}).catch(()=>{}); await page.waitForTimeout(3500); }
  await shot(page,'desktop-domain-after-cta');
  body = await page.textContent('body').catch(()=> '');
  push('domain-register-desktop','post-add',{ url:page.url(), completed:/Domains Configuration|Review & Checkout|Checkout|Configure Product/i.test(body), hasDomainsConfiguration:/Domains Configuration/i.test(body), hasReviewCheckout:/Review & Checkout/i.test(body), hasCheckout:/Checkout/i.test(body), bodySnippet: body.replace(/\s+/g,' ').slice(0,220) });
  await goto(page,'https://onenetservers.net/cart.php?a=checkout');
  await shot(page,'desktop-checkout');
  body = await page.textContent('body').catch(()=> '');
  push('domain-register-desktop','checkout-account-creation',{ url:page.url(), completed:/Create an account|Account Security|Register/i.test(body), hasCaptcha:/Please enter the characters you see in the image below|automated submissions|not a robot/i.test(body), hasEmailField:/Email Address/i.test(body), hasPasswordField:/Password/i.test(body), bodySnippet: body.replace(/\s+/g,' ').slice(0,260) });
  await ctx.close();
}

// Desktop standalone transfer
{
  const ctx = await browser.newContext({ viewport:{width:1440,height:1200}, ignoreHTTPSErrors:true });
  const {page, consoleErrors, requestIssues} = await makePage(ctx);
  await goto(page,'https://onenetservers.net/cart.php?a=add&domain=transfer&tld=.com');
  await shot(page,'desktop-transfer-entry');
  let body = await page.textContent('body').catch(()=> '');
  const tld = await page.locator('select[name="tld"]').inputValue().catch(()=>null);
  push('domain-transfer-desktop','entry',{ url:page.url(), completed:/Transfer your domain from another registrar|Choose a Domain|Shopping Cart/i.test(body), selectedTld:tld, bodySnippet: body.replace(/\s+/g,' ').slice(0,200) });
  const sld = page.locator('input[name="sld"], input[type="text"]').first();
  if (await sld.count()) await sld.fill('transfer' + Date.now().toString().slice(-6));
  const cta = page.getByRole('button', { name:/Transfer|Continue|Check/i }).first();
  if (await cta.count()) { await cta.click({force:true}).catch(()=>{}); await page.waitForTimeout(3500); }
  await shot(page,'desktop-transfer-after-submit');
  body = await page.textContent('body').catch(()=> '');
  push('domain-transfer-desktop','after-submit',{ url:page.url(), completed:/Auth Code|EPP|Review & Checkout|Checkout|Transfer/i.test(body), hasAuthCode:/Auth Code|EPP/i.test(body), hasCheckout:/Checkout/i.test(body), bodySnippet: body.replace(/\s+/g,' ').slice(0,260), consoleErrors: consoleErrors.slice(0,10), requestIssues: requestIssues.slice(0,20) });
  await ctx.close();
}

// Mobile spot audit for WordPress + standalone domain registration
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'], ignoreHTTPSErrors:true });
  const {page, consoleErrors, requestIssues} = await makePage(ctx);
  await goto(page,'https://onenetservers.net/hosting/wordpress').catch(()=>{});
  await shot(page,'mobile-wordpress');
  let body = await page.textContent('body').catch(()=> '');
  push('wordpress-mobile','route-check',{ url:page.url(), completed: !/404|not found/i.test((await page.title())+' '+body), title: await page.title(), bodySnippet: body.replace(/\s+/g,' ').slice(0,180) });
  await goto(page,'https://onenetservers.net/cart.php?a=add&domain=register&tld=.uk');
  await shot(page,'mobile-domain-entry');
  let tld = await page.locator('select[name="tld"]').inputValue().catch(()=>null);
  push('domain-register-mobile','entry',{ url:page.url(), completed:true, selectedTld:tld });
  const msld = page.locator('input[name="sld"], input[placeholder*="business" i]').first();
  if (await msld.count()) await msld.fill('mob' + Date.now().toString().slice(-6));
  if (await page.locator('select[name="tld"]').count()) await page.locator('select[name="tld"]').selectOption('.uk').catch(()=>{});
  const check = page.getByRole('button', { name:/Check|Search/i }).first();
  if (await check.count()) { await check.click({force:true}).catch(()=>{}); await page.waitForTimeout(5000); }
  await shot(page,'mobile-domain-search');
  body = await page.textContent('body').catch(()=> '');
  push('domain-register-mobile','search-results',{ url:page.url(), completed:/Suggested Domains|is available/i.test(body), exactMatch:/is available/i.test(body), suggestedDomains:/Suggested Domains/i.test(body), moreSuggestions:/Give me more suggestions!/i.test(body), addToCartVisible:/Add to Cart/i.test(body), bodySnippet: body.replace(/\s+/g,' ').slice(0,260), consoleErrors: consoleErrors.slice(0,10), requestIssues: requestIssues.slice(0,20) });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${outDir}/findings.json`, JSON.stringify(findings, null, 2));
console.log(JSON.stringify({ outDir, findings }, null, 2));
