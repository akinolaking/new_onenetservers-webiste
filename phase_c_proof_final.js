const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const ts = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
const outDir = `/home/onenetse2/backups/onenet-prod-deploy-20260504-034554/phaseC-proof-final-${ts}`;
fs.mkdirSync(outDir, { recursive: true });

const base = 'https://onenetservers.net';
const productUrl = `${base}/cart.php?a=add&pid=261&billingcycle=annually&currency=4`;

function safeText(v) { return (v || '').trim(); }
function visibleTextArray(elements) { return elements.map((e) => (e.text || '').trim()).filter(Boolean); }

async function analyzeAuth(page, type) {
  const data = await page.evaluate((type) => {
    const qs = (s) => document.querySelector(s);
    const rect = (el) => el ? el.getBoundingClientRect() : null;
    const email = qs('#inputEmail');
    const password = qs('#inputPassword');
    const postcode = qs('#inputPostcode');
    const security = qs('#inputSecurityQId');
    const country = qs('#inputCountry');
    const phone = qs('#inputPhone');
    const captchaInput = qs('.captcha input[type="text"], .captchaimage + input[type="text"], input[name="code"]');
    const captchaWrap = captchaInput ? captchaInput.closest('.captcha, .captchaimage, .register-page-captcha, .login-page-captcha, .margin-bottom') : null;
    const logo = qs('.onenet-auth-brand img, .left-logo-image img, .website__identity__sidebar img');
    const remember = qs('#rememberme-check, #remb-me');
    const company = qs('#inputCompanyName, input[name="companyname"]');
    const address2 = qs('#inputAddress2, input[name="address2"]');
    const out = {
      title: document.title,
      bodyClass: document.body.className,
      logoSrc: logo ? logo.getAttribute('src') : null,
      emailAutocomplete: email ? email.getAttribute('autocomplete') : null,
      passwordAutocomplete: password ? password.getAttribute('autocomplete') : null,
      postcodeAutocomplete: postcode ? postcode.getAttribute('autocomplete') : null,
      securityAutocomplete: security ? security.getAttribute('autocomplete') : null,
      countryAutocomplete: country ? country.getAttribute('autocomplete') : null,
      companyPresent: !!company,
      address2Present: !!address2,
      phonePaddingLeft: phone ? getComputedStyle(phone).paddingLeft : null,
      countryColor: country ? getComputedStyle(country).color : null,
      securityColor: security ? getComputedStyle(security).color : null,
      captchaInputWidth: captchaInput ? rect(captchaInput).width : null,
      captchaWrapWidth: captchaWrap ? rect(captchaWrap).width : null,
      captchaCenterDelta: captchaInput && captchaWrap ? Math.abs((rect(captchaInput).left + rect(captchaInput).width / 2) - (rect(captchaWrap).left + rect(captchaWrap).width / 2)) : null,
      rememberPresent: !!remember,
      viewportWidth: window.innerWidth,
      type,
    };
    return out;
  }, type);
  await page.screenshot({ path: path.join(outDir, `${type}.png`), fullPage: true });
  return data;
}

async function domainFlow(page, prefix) {
  await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(outDir, `${prefix}-domain-before.png`), fullPage: true });
  const pre = await page.evaluate(() => {
    const tld = document.querySelector('#registertld');
    const incart = document.querySelector('#incartsld');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || null,
      registerTldColor: tld ? getComputedStyle(tld).color : null,
      incartText: incart ? incart.options[incart.selectedIndex]?.textContent?.trim() : null,
      incartColor: incart ? getComputedStyle(incart).color : null,
    };
  });

  const label = `phasec${Date.now().toString().slice(-6)}`;
  await page.fill('#registersld', label);
  await page.selectOption('#registertld', '.org');
  await page.click('#btnCheckAvailability');
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(outDir, `${prefix}-domain-after.png`), fullPage: true });

  const post = await page.evaluate(() => {
    const visible = (el) => {
      if (!el) return false;
      const st = getComputedStyle(el);
      return st.display !== 'none' && st.visibility !== 'hidden' && parseFloat(st.opacity || '1') > 0.01;
    };
    const exactContact = Array.from(document.querySelectorAll('#primaryLookupResult .domain-contact-support')).filter(visible).map((el) => el.textContent.trim());
    const suggestedButtons = Array.from(document.querySelectorAll('#domainSuggestions .btn-add-to-cart, .suggested-domains .btn-add-to-cart')).filter(visible).map((el) => el.textContent.replace(/\s+/g,' ').trim());
    const supportButtons = Array.from(document.querySelectorAll('#domainSuggestions .domain-contact-support, .suggested-domains .domain-contact-support')).filter(visible).map((el) => el.textContent.replace(/\s+/g,' ').trim());
    const blankPurpleButtons = Array.from(document.querySelectorAll('button.btn, .btn')).filter((el) => {
      const st = getComputedStyle(el);
      if (st.display === 'none' || st.visibility === 'hidden') return false;
      const bg = st.backgroundColor;
      const text = (el.textContent || '').replace(/\s+/g, '').trim();
      return bg !== 'rgba(0, 0, 0, 0)' && !text;
    }).length;
    const continueBtn = document.querySelector('#btnDomainContinue');
    return {
      exactContact,
      suggestedButtons,
      supportButtons,
      blankPurpleButtons,
      continueVisible: visible(continueBtn),
      continueText: continueBtn ? continueBtn.textContent.replace(/\s+/g,' ').trim() : null,
      registerTldColor: document.querySelector('#registertld') ? getComputedStyle(document.querySelector('#registertld')).color : null,
    };
  });

  if (post.continueVisible) {
    await page.click('#btnDomainContinue');
    await page.waitForLoadState('networkidle');
  }
  await page.screenshot({ path: path.join(outDir, `${prefix}-post-continue.png`), fullPage: true });
  const afterContinue = { url: page.url(), title: await page.title() };

  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, `${prefix}-home-cart.png`), fullPage: true });
  const home = await page.evaluate(() => ({
    badge: document.querySelector('.nav-cart-count')?.textContent?.trim() || null,
  }));

  await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const incartCheck = await page.evaluate(() => {
    const incartRadio = document.querySelector('#selincart');
    if (incartRadio) incartRadio.click();
    const incart = document.querySelector('#incartsld');
    return {
      hasIncart: !!incart,
      selectedText: incart ? incart.options[incart.selectedIndex]?.textContent?.trim() : null,
      color: incart ? getComputedStyle(incart).color : null,
    };
  });
  await page.screenshot({ path: path.join(outDir, `${prefix}-incart.png`), fullPage: true });

  return { pre, post, afterContinue, home, incartCheck };
}

async function reviewCheckout(page, prefix) {
  await page.goto(base + '/cart.php?a=view', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(outDir, `${prefix}-checkout-top.png`), fullPage: false });
  const top = await page.evaluate(() => {
    const vis = (s) => {
      const el = document.querySelector(s);
      if (!el) return null;
      const st = getComputedStyle(el);
      return { text: el.textContent.trim(), color: st.color, opacity: st.opacity, display: st.display };
    };
    return {
      title: document.title,
      reviewHeading: document.querySelector('h1, .main-title, .header-lined h1')?.textContent?.trim() || null,
      postcodeAutocomplete: document.querySelector('#inputPostcode')?.getAttribute('autocomplete') || null,
      countryColor: document.querySelector('#inputCountry') ? getComputedStyle(document.querySelector('#inputCountry')).color : null,
      securityColor: document.querySelector('#inputSecurityQId') ? getComputedStyle(document.querySelector('#inputSecurityQId')).color : null,
      editIcon: vis('.edit-link-view-area .btn i, .edit-link-view-area .btn .fas'),
      removeIcon: vis('.btn-remove-from-cart i, .btn-remove-from-cart .fas, .btn-remove-from-cart .far'),
      domainRegistrantColor: document.querySelector('#inputDomainContact') ? getComputedStyle(document.querySelector('#inputDomainContact')).color : null,
      captchaDelta: (() => {
        const input = document.querySelector('.captcha input[type="text"], input[name="code"]');
        const wrap = input ? input.closest('.captcha, .margin-bottom, .register-page-captcha') : null;
        if (!input || !wrap) return null;
        const a = input.getBoundingClientRect();
        const b = wrap.getBoundingClientRect();
        return Math.abs((a.left + a.width/2) - (b.left + b.width/2));
      })(),
    };
  });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, `${prefix}-checkout-mid.png`), fullPage: false });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, `${prefix}-checkout-bottom.png`), fullPage: false });
  return top;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1600 } });
  const dpage = await desktop.newPage();

  const results = { desktop: {}, mobile: {} };
  results.desktop.login = await (async () => { await dpage.goto(base + '/clientarea.php', { waitUntil: 'domcontentloaded' }); return analyzeAuth(dpage, 'desktop-login'); })();
  results.desktop.reset = await (async () => { await dpage.goto(base + '/password/reset', { waitUntil: 'domcontentloaded' }); return analyzeAuth(dpage, 'desktop-reset'); })();
  results.desktop.register = await (async () => { await dpage.goto(base + '/register.php', { waitUntil: 'domcontentloaded' }); return analyzeAuth(dpage, 'desktop-register'); })();
  results.desktop.domain = await domainFlow(dpage, 'desktop');
  results.desktop.checkout = await reviewCheckout(dpage, 'desktop');
  await desktop.close();

  const mobile = await browser.newContext({ ...devices['iPhone 13'] });
  const mpage = await mobile.newPage();
  results.mobile.login = await (async () => { await mpage.goto(base + '/clientarea.php', { waitUntil: 'domcontentloaded' }); return analyzeAuth(mpage, 'mobile-login'); })();
  results.mobile.reset = await (async () => { await mpage.goto(base + '/password/reset', { waitUntil: 'domcontentloaded' }); return analyzeAuth(mpage, 'mobile-reset'); })();
  results.mobile.register = await (async () => { await mpage.goto(base + '/register.php', { waitUntil: 'domcontentloaded' }); return analyzeAuth(mpage, 'mobile-register'); })();
  results.mobile.domain = await domainFlow(mpage, 'mobile');
  results.mobile.checkout = await reviewCheckout(mpage, 'mobile');
  await mobile.close();
  await browser.close();

  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
  console.log(outDir);
})();
