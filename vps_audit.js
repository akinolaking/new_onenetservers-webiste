const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');
(async()=>{
  const outDir = '/tmp/vps-prod-audit-' + Date.now();
  fs.mkdirSync(outDir,{recursive:true});
  const results = {};

  async function run(label, contextOptions){
    const browser = await chromium.launch({headless:true});
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    const state = {steps:[], consoleErrors:[], pageErrors:[], failedRequests:[], badResponses:[], screenshots:[]};
    page.on('console', msg => { if(['error','warning'].includes(msg.type())) state.consoleErrors.push({type:msg.type(), text:msg.text(), url: page.url()}); });
    page.on('pageerror', err => state.pageErrors.push(String(err)));
    page.on('requestfailed', req => state.failedRequests.push({url:req.url(), error:req.failure() && req.failure().errorText}));
    page.on('response', res => { if(res.status() >= 400) state.badResponses.push({url:res.url(), status:res.status()}); });
    const shot = async name => { const p = path.join(outDir, `${label}-${name}.png`); await page.screenshot({path:p, fullPage:true}); state.screenshots.push(p); };
    const step = async (name, extra={}) => state.steps.push({name, url: page.url(), title: await page.title(), ...extra});
    const gotoStable = async url => { await page.goto(url, {waitUntil:'load', timeout:60000}); await page.waitForTimeout(2500); };

    await gotoStable('https://onenetservers.net/');
    await step('home');
    await shot('home');
    state.home = await page.evaluate(() => ({
      headerTexts: Array.from(document.querySelectorAll('header a, header button')).map(el => (el.textContent||'').trim()).filter(Boolean),
      hasFooter: !!document.querySelector('footer')
    }));

    await gotoStable('https://onenetservers.net/hosting/vps');
    await step('vps-landing');
    await shot('vps');
    state.vps = await page.evaluate(() => ({
      ctas: Array.from(document.querySelectorAll('a[href], button')).map(el => ({text:(el.textContent||'').trim(), href:el.tagName==='A' ? el.getAttribute('href') : null})).filter(x => x.text || x.href),
      hasHeader: !!document.querySelector('header, .onenet-header'),
      hasFooter: !!document.querySelector('footer')
    }));

    const payloads = await page.evaluate(() => Array.from(document.querySelectorAll('a[href*="cart.php?a=add&pid="]')).map(a => ({text:(a.textContent||'').trim(), href:a.getAttribute('href')})));
    state.vpsPayloads = payloads;
    const target = payloads.find(x => /pid=205/.test(x.href)) || payloads.find(x => /pid=26[4-6]/.test(x.href)) || null;
    state.chosenPayload = target;
    if(!target){
      state.blocker = 'No VPS payload CTA found on VPS page';
      results[label] = state;
      await browser.close();
      return;
    }

    const targetHref = new URL(target.href, page.url()).href;
    const link = page.locator(`a[href="${target.href}"]`).first();
    if(await link.count()){
      await Promise.all([page.waitForNavigation({waitUntil:'load', timeout:60000}).catch(()=>{}), link.click().catch(()=>{})]);
      await page.waitForTimeout(2500);
    } else {
      await gotoStable(targetHref);
    }
    await step('clicked-vps-plan-cta', {chosen: target});
    await shot('after-vps-click');

    state.afterPlan = {
      hasHeader: !!await page.locator('header, .onenet-header').count(),
      hasFooter: !!await page.locator('footer').count(),
      hasDoctype: /<!doctype html>/i.test(await page.content()),
      bodyText: (await page.textContent('body')).replace(/\s+/g,' ').slice(0,1200)
    };

    // Try to understand the flow state.
    const body = await page.textContent('body');
    if(/Choose a Domain/i.test(body || '')){
      state.flowState = 'domain-step';
      const existingRadio = page.locator('label, .form-check, .domain-option').filter({hasText:/existing domain|update my nameservers/i}).first();
      if(await existingRadio.count()){
        await existingRadio.click().catch(()=>{});
        await page.waitForTimeout(1000);
      }
      const inputs = page.locator('input[type="text"]');
      const icount = await inputs.count();
      if(icount){
        for(let i=0;i<Math.min(icount,3);i++){
          await inputs.nth(i).fill(i===0 ? 'audit-vps-existing-example.com' : 'com').catch(()=>{});
        }
      }
      // Try select domain option controls and continue/use
      const buttons = page.locator('a,button,input[type="submit"]');
      const bcount = await buttons.count();
      for(let i=0;i<bcount;i++){
        const txt = (((await buttons.nth(i).innerText().catch(()=>'')) || (await buttons.nth(i).getAttribute('value').catch(()=>'')) || '').trim());
        if(/use|continue|checkout|add to cart|check/i.test(txt)){
          await buttons.nth(i).click().catch(()=>{});
          await page.waitForTimeout(2500);
          await step('clicked-domain-step-button', {text: txt});
          break;
        }
      }
      await shot('domain-step');
    } else if(/Configure|Configuration|Product Configuration/i.test(body || '')) {
      state.flowState = 'confproduct';
      await shot('confproduct');
    } else if(/Review & Checkout|Shopping Cart|Order Summary/i.test(body || '')) {
      state.flowState = 'viewcart';
      await shot('viewcart');
    } else {
      state.flowState = 'unknown';
    }

    // Advance if possible.
    const nextButtons = page.locator('a,button,input[type="submit"]');
    const nb = await nextButtons.count();
    for(let i=0;i<nb;i++){
      const txt = (((await nextButtons.nth(i).innerText().catch(()=>'')) || (await nextButtons.nth(i).getAttribute('value').catch(()=>'')) || '').trim());
      if(/continue|checkout|review|complete order/i.test(txt)){
        await nextButtons.nth(i).click().catch(()=>{});
        await page.waitForTimeout(2500);
        await step('clicked-advance-button', {text: txt});
        break;
      }
    }
    await shot('advanced');

    state.final = {
      url: page.url(),
      title: await page.title(),
      hasHeader: !!await page.locator('header, .onenet-header').count(),
      hasFooter: !!await page.locator('footer').count(),
      hasDoctype: /<!doctype html>/i.test(await page.content()),
      bodyText: (await page.textContent('body')).replace(/\s+/g,' ').slice(0,1800),
      fieldNames: await page.evaluate(() => Array.from(document.querySelectorAll('input,select,textarea')).map(el => ({name:el.name||'', type:el.type||el.tagName.toLowerCase(), placeholder:el.getAttribute('placeholder')||''})).slice(0,100)),
      hasCaptcha: /captcha|robot|characters you see/i.test(await page.textContent('body'))
    };

    const email = page.locator('input[type="email"], input[name="emailaddress"], input[name="email"]');
    if(await email.count()){
      state.accountCreationPageReached = true;
      const uniq = Date.now()+Math.floor(Math.random()*1000);
      const fill = async (sel, val) => { const loc = page.locator(sel); if(await loc.count()) await loc.first().fill(val).catch(()=>{}); };
      await fill('input[name="firstname"]','Audit');
      await fill('input[name="lastname"]','VPS'+String(uniq).slice(-4));
      await fill('input[type="email"], input[name="emailaddress"], input[name="email"]','audit.vps.' + uniq + '@example.com');
      await fill('input[name="phonenumber"], input[name="phone"]','+447700900123');
      await fill('input[name="address1"]','1 Audit Street');
      await fill('input[name="city"]','London');
      await fill('input[name="state"]','London');
      await fill('input[name="postcode"]','EC1A1AA');
      const country = page.locator('select[name="country"]');
      if(await country.count()) { try{ await country.selectOption({label:'United Kingdom'});} catch(e){ try{await country.selectOption('GB')}catch(e2){}} }
      const secQ = page.locator('select[name*="securityq"], select[name*="securityQuestion"]');
      if(await secQ.count()) { try{ await secQ.selectOption({index:1}); } catch(e){} }
      await fill('input[name*="securitya"], input[name*="securityAnswer"]','Audit answer');
      await fill('input[name="password"]','AuditPass!234');
      await fill('input[name="password2"], input[name="confirmpassword"]','AuditPass!234');
      state.accountFormFilled = 'audit.vps.' + uniq + '@example.com';
      await step('filled-account-form');
      await shot('account-form');
    } else {
      state.accountCreationPageReached = false;
    }

    await browser.close();
    results[label] = state;
  }

  await run('desktop', {viewport:{width:1440,height:1200}});
  await run('mobile', devices['iPhone 13']);
  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
  console.log(outDir);
  console.log(JSON.stringify(results, null, 2));
})();
