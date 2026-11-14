import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.QA_URL || 'https://3000-ifsiavntiryu2vegadhax-ec27a4e7.us1.manus.computer';
const output = process.env.QA_OUTPUT || '/tmp/hhg-quote-form-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const destination = 'AW-18221337260/__DOCJGJyLocEKyVzvBD';
const exactConsent = 'I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the privacy information and site-use information.';
const conversionRecords = page => page.evaluate(() => Array.from(window.dataLayer || []).map(x => Array.from(x)).filter(x => x[0] === 'event' && x[1] === 'conversion').map(x => x[2]));
async function makeContext(width, mode = 'success') {
  const context = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 900 }, isMobile: width < 500, hasTouch: width < 500, reducedMotion: 'reduce' });
  const state = { providers: [], dashboards: [], details: [], thirdPartyZip: [] };
  await context.addInitScript(() => { window.__funnelEvents = []; window.addEventListener('hhg:funnel', e => window.__funnelEvents.push(e.detail)); });
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.hostname === 'www.googletagmanager.com') return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
    if (/googleadservices|doubleclick|google-analytics/.test(url.hostname)) return route.abort();
    if (url.hostname === 'api.web3forms.com') {
      state.providers.push(JSON.parse(request.postData() || '{}'));
      await new Promise(resolve => setTimeout(resolve, 400));
      const success = mode !== 'retry' || state.providers.length > 1;
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success }) });
    }
    if (url.hostname === 'leads.harrisonhealthgroup.com') {
      if (url.pathname.endsWith('/details')) state.details.push(url.pathname);
      if (url.pathname === '/webhooks/web-form') {
        state.dashboards.push(JSON.parse(request.postData() || '{}'));
        if (mode === 'dashboard-network') return route.abort();
        return route.fulfill({ status: mode === 'dashboard-422' ? 422 : 200, contentType: 'application/json', body: mode === 'dashboard-422' ? '{"ok":false}' : '{"ok":true,"lead_id":999}' });
      }
      return route.fulfill({ status: 204, body: '' });
    }
    if (/zippopotam|geonames/.test(url.hostname)) { state.thirdPartyZip.push(request.url()); return route.abort(); }
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(`${width}: ${error.message}`));
  return { context, page, state };
}
async function fill(page) {
  await page.locator('#lead-first_name').fill('QA');
  await page.locator('#lead-phone').fill('+1 (754) 276-7544');
  await page.locator('#lead-zip').fill('33323');
  await page.locator('#lead-consent').check();
}
for (const width of [390, 1365]) {
  const { context, page, state } = await makeContext(width, 'retry');
  await page.goto(base + '/?gclid=qa-gclid&email=not-for-analytics@example.org', { waitUntil: 'networkidle' });
  await page.locator('h1').locator('xpath=ancestor::section[1]').getByRole('button', { name: 'Request a Quote Call', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  const form = page.getByRole('form', { name: 'Private coverage inquiry' });
  await form.waitFor({ state: 'visible' });
  check(await form.locator('input:not([type="hidden"])').count() === 4, `${width}: first name, phone, ZIP, consent only`);
  check(await form.locator('select,#lead-email,#lead-last_name,#lead-coverage_intent').count() === 0, `${width}: no state or optional blocker initially`);
  const call = form.locator('a').filter({ hasText: 'Call now' });
  check(await call.isVisible() === (width < 500), `${width}: responsive mobile call action`);
  check(await call.getAttribute('href') === 'tel:+19544295138' && (await call.innerText()).includes('(954) 429-5138'), `${width}: exact call number`);
  if (width < 500) {
    check(await call.evaluate(x => x.getBoundingClientRect().top >= 0 && x.getBoundingClientRect().bottom < innerHeight), `${width}: call button above fold`);
    await call.evaluate(x => x.addEventListener('click', e => e.preventDefault(), { once: true }));
    await call.click();
    check(await page.evaluate(() => window.__funnelEvents.some(x => x.name === 'click_to_call' && x.context.surface === 'quote_form_mobile')), 'mobile call event');
  }
  await form.getByRole('button', { name: 'Request a call', exact: true }).click();
  check(await page.locator('#lead-first_name-error').isVisible() && await page.locator('#lead-zip-error').isVisible() && await page.locator('#lead-consent-error').isVisible(), `${width}: required validation`);
  check(state.providers.length === 0 && state.dashboards.length === 0 && (await conversionRecords(page)).length === 0, `${width}: validation has no external send`);
  await page.locator('#lead-zip').fill('99999');
  const select = page.locator('#lead-state');
  await select.waitFor();
  check(await select.inputValue() === '' && await select.locator('optgroup').first().locator('option').count() === 31, `${width}: unlisted ZIP fallback/licensed list`);
  const colors = await select.evaluate(x => ({ bg: getComputedStyle(x).backgroundColor, fg: getComputedStyle(x).color, optionBg: getComputedStyle(x.options[1]).backgroundColor, optionFg: getComputedStyle(x.options[1]).color, disabledBg: getComputedStyle(x.options[0]).backgroundColor, disabledFg: getComputedStyle(x.options[0]).color }));
  check(colors.bg === 'rgb(17, 17, 17)' && colors.fg === 'rgb(206, 206, 206)' && colors.optionBg === 'rgb(255, 255, 255)' && colors.optionFg === 'rgb(10, 10, 10)' && colors.disabledBg === 'rgb(231, 231, 231)' && colors.disabledFg === 'rgb(85, 85, 85)', `${width}: explicit dropdown colors ${JSON.stringify(colors)}`);
  await select.hover();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#lead-state')).borderColor === 'rgb(226, 201, 126)');
  await select.focus();
  check(await select.evaluate(x => getComputedStyle(x).outlineStyle !== 'none'), `${width}: dropdown focus`);
  await select.selectOption('NM');
  await form.getByText('This state is not on our current service-area map.').waitFor();
  await select.selectOption('DE');
  await form.getByText('This state is not on our current service-area map.').waitFor({ state: 'hidden' });
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#lead-state')).color === 'rgb(255, 255, 255)' && getComputedStyle(document.querySelector('#lead-state').selectedOptions[0]).backgroundColor === 'rgb(201, 168, 76)');
  await select.evaluate(x => x.disabled = true);
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#lead-state')).backgroundColor === 'rgb(51, 51, 51)');
  check(await select.evaluate(x => getComputedStyle(x).color) === 'rgb(206, 206, 206)', `${width}: disabled select foreground`);
  await select.evaluate(x => x.disabled = false);
  await page.locator('#lead-zip').fill('06390');
  await form.getByText('New York', { exact: true }).waitFor();
  check(await form.locator('select').count() === 0, `${width}: ZIP override replaces fallback, leading-zero state NY`);
  await fill(page);
  check(await page.locator('#lead-phone').inputValue() === '(754) 276-7544', `${width}: auto-format +1 pasted phone`);
  check(await page.locator('#lead-first_name').getAttribute('autocomplete') === 'given-name' && await page.locator('#lead-phone').getAttribute('autocomplete') === 'tel' && await page.locator('#lead-zip').getAttribute('autocomplete') === 'postal-code', `${width}: autofill`);
  check(await page.locator('#lead-phone').getAttribute('inputmode') === 'tel' && await page.locator('#lead-zip').getAttribute('inputmode') === 'numeric', `${width}: phone/ZIP keypads`);
  check(await page.locator('label[for="lead-consent"] span').innerText() === exactConsent, `${width}: unchanged visible consent`);
  await page.getByRole('dialog').evaluate(x => x.scrollTop = 0);
  await page.screenshot({ path: `${output}/${width}-modal.png` });
  await form.evaluate(x => { x.requestSubmit(); x.requestSubmit(); });
  await page.waitForFunction(() => document.querySelector('#lead-phone').matches(':disabled'));
  await page.locator('.form-error-banner').waitFor();
  check(state.providers.length === 1 && state.dashboards.length === 0 && (await conversionRecords(page)).length === 0, `${width}: double submit guard and provider failure isolation`);
  await form.getByRole('button', { name: 'Request a call', exact: true }).click();
  await page.getByRole('status').getByText('Request accepted').waitFor();
  await page.waitForTimeout(100);
  const lead = state.dashboards[0], conversions = await conversionRecords(page);
  check(state.providers.length === 2 && state.dashboards.length === 1 && state.details.length === 0, `${width}: one dashboard after confirmed provider`);
  check(lead?.first_name === 'QA' && lead.last_name === '' && lead.email === '' && lead.phone === '7542767544' && lead.state === 'FL' && lead.zip === '33323' && lead.preferred_contact === 'Phone call', `${width}: exact minimal schema`);
  check(lead?.consent === true && lead.consent_text === exactConsent && lead.gclid === 'qa-gclid' && lead.page_url === new URL(base).origin + '/' && !('access_key' in lead), `${width}: protected contract, attribution and sanitized URL`);
  check(conversions.length === 1 && conversions[0].send_to === destination && Object.keys(conversions[0]).length === 1, `${width}: one unchanged no-PII quote conversion`);
  const events = await page.evaluate(() => window.__funnelEvents);
  check(!JSON.stringify(events).includes('7542767544') && !JSON.stringify(events).includes('not-for-analytics'), `${width}: no PII in events`);
  check(!events.some(x => x.name === 'form_validation_error' && x.context.step === 2), `${width}: no step-two errors in single-step form`);
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${width}: modal horizontal overflow`);
  check(state.thirdPartyZip.length === 0, `${width}: ZIP is local only`);
  await page.getByRole('button', { name: 'Close quote form' }).click();
  await context.close();
  for (const [path, mode] of [['/texas-health-insurance','dashboard-network'],['/small-business-health-insurance-georgia','dashboard-422'],['/seguro-medico-florida','success']]) {
    const item = await makeContext(width, mode);
    await item.page.goto(base + path, { waitUntil: 'networkidle' });
    const inquiry = item.page.locator('form');
    check(await inquiry.locator('select,#lead-email,#lead-company_name').count() === 0, `${width}: ${path} has no blockers or landing-state assumption`);
    await fill(item.page);
    await inquiry.getByText('Florida', { exact: true }).waitFor();
    check(await inquiry.locator('select').count() === 0, `${width}: ${path} ZIP FL overrides landing state`);
    if (path.startsWith('/seguro')) check(await item.page.getByText('El formulario está en inglés.', { exact: false }).count() > 0, 'Spanish notice preserved');
    await inquiry.screenshot({ path: `${output}/${width}-${mode}-inline.png` });
    await inquiry.getByRole('button', { name: 'Request a call', exact: true }).click();
    await item.page.getByRole('status').getByText('Request accepted').waitFor();
    check(item.state.providers.length === 1 && item.state.dashboards.length === 1 && (await conversionRecords(item.page)).length === 1, `${width}: ${mode} dashboard failure does not undo success`);
    check(await item.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${width}: ${path} no overflow`);
    await item.context.close();
  }
}
await browser.close();
await writeFile(`${output}/result.json`, JSON.stringify({ passed: errors.length === 0, errors, realLeadSubmissions: 0, realAdsConversions: 0, viewports: [390,1365] }, null, 2) + '\n');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('PASS: desktop/mobile modal and landing form; only first name, phone, ZIP, consent; ZIP-state auto-fill and ambiguous/manual fallback; explicit dropdown placeholder/selected/disabled/checked/focus/hover colors; mobile Call now exact phone above fold; phone auto-format and +1; optional fields non-blocking; one confirmed-provider dashboard handoff and one exact no-PII conversion; no step-2 error; no PII in analytics; no runtime errors/overflow. All external lead and Ads requests mocked.');
