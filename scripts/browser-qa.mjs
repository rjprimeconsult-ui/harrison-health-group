import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const base = process.env.QA_URL || 'http://127.0.0.1:4100';
const expectLiveReviews = process.env.QA_EXPECT_LIVE !== 'false';
const expectManagedAssets = process.env.QA_EXPECT_MANAGED_ASSETS !== 'false';
const output = '/home/ubuntu/harrison-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const errors = [];
function check(condition, message) { if (!condition) errors.push(message); }
const pages = ['/', '/business', '/contact', '/about', '/resources', '/resources/private-vs-marketplace', '/resources/self-employed-coverage', '/resources/small-business-benefits', '/faq', '/careers'];
for (const viewport of [{ width: 1365, height: 900 }, { width: 390, height: 844 }]) {
  const mobile = viewport.width < 500;
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.route('https://www.googletagmanager.com/gtag/js?id=AW-18221337260', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  page.on('pageerror', error => errors.push(`${mobile ? 'mobile' : 'desktop'} runtime: ${error.message}`));
  for (const route of pages) {
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    check(response?.status() === 200, `${route} HTTP ${response?.status()}`);
    await page.waitForTimeout(80);
    check(await page.locator('h1').count() === 1, `${route} missing or multiple H1`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2), `${route} horizontal overflow at ${viewport.width}`);
  }
  await page.goto(base + '/');
  const adsTag = page.locator('script[src="https://www.googletagmanager.com/gtag/js?id=AW-18221337260"]');
  check(await adsTag.count() === 1, `Google Ads base tag is missing or duplicated at ${viewport.width}`);
  const adsState = await page.evaluate(() => {
    const records = Array.from(window.dataLayer || []).map(entry => Array.from(entry));
    return {
      config: records.filter(entry => entry[0] === 'config' && entry[1] === 'AW-18221337260').length,
      conversions: records.filter(entry => entry[0] === 'event' && entry[1] === 'conversion').length,
    };
  });
  check(adsState.config === 1 && adsState.conversions === 0, `Google Ads base-tag initialization is invalid at ${viewport.width}: ${JSON.stringify(adsState)}`);
  const delaware = page.locator('#licensed-states svg path[aria-label="Delaware: shown on licensed-state map"]');
  const newMexico = page.locator('#licensed-states svg path[aria-label="New Mexico: not listed on map"]');
  check(await delaware.count() === 1 && await delaware.getAttribute('fill') === '#C9A84C', 'Delaware not highlighted in gold');
  check(await newMexico.count() === 1 && await newMexico.getAttribute('fill') === 'rgba(10,10,10,0.08)', 'New Mexico still highlighted on the map');
  const stateList = await page.locator('#licensed-states details p').textContent();
  check(stateList.includes('Delaware') && !stateList.includes('New Mexico'), 'full state list not corrected');
  await page.screenshot({ path: `${output}/${mobile ? 'mobile' : 'desktop'}-home.png`, fullPage: false });
  if (mobile) {
    check(await page.getByRole('button', { name: 'Open menu' }).isVisible(), 'mobile menu button hidden');
    await page.getByRole('button', { name: 'Open menu' }).click();
    check(await page.locator('#mobile-navigation').isVisible(), 'mobile menu did not open');
    await page.screenshot({ path: `${output}/mobile-menu.png` });
    await page.getByRole('button', { name: 'Close menu' }).click();
  } else check(!await page.locator('.nav-company-menu').isVisible(), 'Company submenu visible while closed');
  if (mobile) await page.locator('main > section').first().getByRole('button', { name: 'Request a Coverage Conversation', exact: true }).click();
  else await page.getByRole('button', { name: 'Request a Quote' }).click();
  check(await page.getByRole('dialog').isVisible(), 'quote dialog did not open');
  const coverage = page.locator('#lead-coverage_intent');
  const states = await coverage.evaluate(el => {
    const first = el.options[0], second = el.options[1];
    return {
      closedBg: getComputedStyle(el).backgroundColor,
      closedFg: getComputedStyle(el).color,
      optionBg: getComputedStyle(second).backgroundColor,
      optionFg: getComputedStyle(second).color,
      disabledBg: getComputedStyle(first).backgroundColor,
      disabledFg: getComputedStyle(first).color,
    };
  });
  check(states.closedBg === 'rgb(17, 17, 17)' && states.closedFg === 'rgb(206, 206, 206)', `dark placeholder select contrast ${JSON.stringify(states)}`);
  check(states.optionBg === 'rgb(255, 255, 255)' && states.optionFg === 'rgb(10, 10, 10)', `open option contrast ${JSON.stringify(states)}`);
  check(states.disabledBg !== states.optionBg && states.disabledFg !== states.optionFg, `placeholder/disabled option contrast ${JSON.stringify(states)}`);
  await coverage.hover();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#lead-coverage_intent')).borderColor === 'rgb(226, 201, 126)', undefined, { timeout: 3000 }).catch(() => null);
  check(await coverage.evaluate(el => getComputedStyle(el).borderColor) === 'rgb(226, 201, 126)', 'hovered dark select border is not gold');
  await coverage.focus();
  check(await coverage.evaluate(el => getComputedStyle(el).outlineStyle !== 'none'), 'focused select has no outline');
  await coverage.selectOption('Individual coverage');
  check(await coverage.inputValue() === 'Individual coverage', 'selected control text missing');
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#lead-coverage_intent')).color === 'rgb(255, 255, 255)', undefined, { timeout: 3000 }).catch(() => null);
  check(await coverage.evaluate(el => getComputedStyle(el).color) === 'rgb(255, 255, 255)', 'selected closed-control foreground not white');
  const chosen = await coverage.evaluate(el => ({ background: getComputedStyle(el.selectedOptions[0]).backgroundColor, color: getComputedStyle(el.selectedOptions[0]).color }));
  check(chosen.background === 'rgb(201, 168, 76)' && chosen.color === 'rgb(10, 10, 10)', `selected option colors ${JSON.stringify(chosen)}`);
  await coverage.evaluate(el => { el.disabled = true; });
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#lead-coverage_intent')).backgroundColor === 'rgb(51, 51, 51)', undefined, { timeout: 3000 }).catch(() => null);
  const disabledControl = await coverage.evaluate(el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color }));
  check(disabledControl.background === 'rgb(51, 51, 51)' && disabledControl.color === 'rgb(206, 206, 206)', `disabled control colors ${JSON.stringify(disabledControl)}`);
  await coverage.evaluate(el => { el.disabled = false; });
  await page.screenshot({ path: `${output}/${mobile ? 'mobile' : 'desktop'}-form.png` });
  await page.getByRole('button', { name: 'Continue' }).click();
  check(await page.getByText('Enter a five-digit ZIP code.').isVisible(), 'validation error absent');
  await page.locator('#lead-state').selectOption('NM');
  await page.getByText('This state is not on our current service-area map.').waitFor({ timeout: 3000 }).catch(() => null);
  check(await page.getByText('This state is not on our current service-area map.').isVisible(), 'New Mexico not flagged as unlisted in the form');
  await page.locator('#lead-state').selectOption('DE');
  await page.getByText('This state is not on our current service-area map.').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => null);
  check(!await page.getByText('This state is not on our current service-area map.').isVisible(), 'Delaware incorrectly flagged as unlisted in the form');
  await page.locator('#lead-state').selectOption('AZ');
  await page.getByText('This state is not on our current service-area map.').waitFor({ timeout: 3000 }).catch(() => null);
  check(await page.getByText('This state is not on our current service-area map.').isVisible(), 'unlisted-state inquiry caveat missing');
  await page.locator('#lead-state').selectOption('FL');
  await page.locator('#lead-zip').fill('33323');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#lead-first_name').fill('Pat');
  await page.locator('#lead-last_name').fill('Example');
  await page.locator('#lead-email').fill('pat@example.org');
  await page.locator('#lead-phone').fill('9546000342');
  await page.locator('#lead-preferred_contact').selectOption('Email');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Submit request' }).click();
  check(await page.getByText('Please confirm how we may contact you about your request.').isVisible(), 'consent validation absent');
  await page.locator('#lead-consent').check();
  check(await page.locator('#lead-consent').isChecked(), 'checkbox not checked');
  let call = 0;
  await page.route('https://api.web3forms.com/submit', async route => {
    call++;
    const data = JSON.parse(route.request().postData());
    check(data.consent_text_version && data.email === 'pat@example.org', 'lead contract missing consent/contact');
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: call > 1 }) });
  });
  await page.getByRole('button', { name: 'Submit request' }).click();
  await page.locator('.form-error-banner').waitFor({ timeout: 5000 }).catch(() => null);
  check(await page.locator('.form-error-banner').isVisible(), 'provider success:false did not show failure fallback');
  const afterFailureConversions = await page.evaluate(() => Array.from(window.dataLayer || []).map(entry => Array.from(entry)).filter(entry => entry[0] === 'event' && entry[1] === 'conversion').length);
  check(afterFailureConversions === 0, `Google Ads conversion fired before provider confirmation: ${afterFailureConversions}`);
  await page.getByRole('button', { name: 'Submit request' }).click();
  await page.getByRole('status').getByText('Request accepted').waitFor({ timeout: 5000 }).catch(() => null);
  check(await page.getByRole('status').getByText('Request accepted').isVisible(), 'provider success:true did not show success');
  const afterSuccessConversion = await page.evaluate(() => {
    const conversions = Array.from(window.dataLayer || []).map(entry => Array.from(entry)).filter(entry => entry[0] === 'event' && entry[1] === 'conversion' && entry[2]?.send_to === 'AW-18221337260/__DOCJGJyLocEKyVzvBD');
    return { count: conversions.length, keys: conversions[0]?.[2] ? Object.keys(conversions[0][2]).sort() : [] };
  });
  check(afterSuccessConversion.count === 1, `Google Ads conversion was not fired exactly once after provider confirmation: ${afterSuccessConversion.count}`);
  check(JSON.stringify(afterSuccessConversion.keys) === JSON.stringify(['send_to']), `Google Ads conversion payload contains unexpected data: ${JSON.stringify(afterSuccessConversion.keys)}`);
  check(call === 2, `mocked provider call count ${call}`);
  await page.getByRole('button', { name: 'Close quote form' }).click();
  check(!await page.getByRole('dialog').isVisible(), 'quote dialog did not close before review inspection');
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) window.scrollTo(0, window.scrollY + section.getBoundingClientRect().top - 90);
  });
  if (expectLiveReviews) await page.locator('#testimonials .google-review-card').first().waitFor({ timeout: 18000 }).catch(() => null);
  else await page.getByText('Live reviews are unavailable right now. You can read the current reviews on Google Maps.').waitFor({ timeout: 18000 }).catch(() => null);
  const reviewCards = page.locator('#testimonials .google-review-card');
  const reviewCount = await reviewCards.count();
  if (expectLiveReviews) {
    check(reviewCount > 0 && reviewCount <= 5, `Google Places review card count ${reviewCount}`);
    check(await page.locator('#testimonials .google-review-author').count() === reviewCount, 'review author attribution missing');
    check(await page.locator('#testimonials .google-review-avatar img').count() === reviewCount, 'review author avatar attribution missing');
    const reviewSources = page.locator('#testimonials .google-review-source');
    check(await reviewSources.count() === reviewCount, 'direct Google Maps review source link missing');
    for (let i = 0; i < await reviewSources.count(); i++) {
      check(/^https:\/\/(?:[a-z0-9-]+\.)*google\.com\//i.test((await reviewSources.nth(i).getAttribute('href')) || ''), `review ${i + 1} does not link to a Google-owned source`);
    }
    const note = page.locator('#testimonials .google-reviews-note');
    check(await note.count() === 1 && (await note.innerText()).includes('ordered by relevance') && (await note.innerText()).includes('does not filter or reorder'), 'review ordering/filtering disclosure missing');
  } else {
    check(reviewCount === 0, `unauthorized production origin rendered ${reviewCount} review cards`);
    check(await page.getByText('Live reviews are unavailable right now. You can read the current reviews on Google Maps.').isVisible(), 'Google review unavailable state missing');
  }
  const listingLink = page.locator('#testimonials .google-reviews-link');
  check(await listingLink.count() === 1 && /^https:\/\/(?:[a-z0-9-]+\.)*google\.com\//i.test((await listingLink.getAttribute('href')) || ''), 'Google Maps listing link missing');
  const googleMark = page.locator('#testimonials img[alt="Google Maps"]');
  await googleMark.evaluate(img => img.decode().catch(() => null));
  check(await googleMark.evaluate(img => img.naturalWidth > 0 && img.naturalHeight > 0), 'official Google Maps attribution mark not loaded');
  check(!(await page.locator('#testimonials').innerText()).includes('seed-'), 'legacy seeded review surfaced');
  check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2), `review cards overflow at ${viewport.width}`);
  await page.screenshot({ path: `${output}/${mobile ? 'mobile' : 'desktop'}-google-reviews.png` });
  await page.goto(base + '/business');
  await page.screenshot({ path: `${output}/${mobile ? 'mobile' : 'desktop'}-business.png`, fullPage: false });
  const business = page.locator('form[aria-label="Business coverage inquiry"]');
  check(await business.locator('#lead-company_name').count() === 1 && await business.locator('#lead-team_size').count() === 1, 'business qualifier fields missing');
  await page.goto(base + '/about');
  const team = page.locator('#team');
  check(await team.getByText('Founder and Senior Health Advisor', { exact: true }).count() === 2, `founder role missing from team-card front/back at ${viewport.width}`);
  check(await team.getByText('Licensed Health Advisor', { exact: true }).count() === 10, `licensed advisor roles missing from team-card fronts/backs at ${viewport.width}`);
  const firstDetails = team.getByRole('button', { name: 'View details for Shaquille Harrison' });
  await firstDetails.click();
  check(await team.getByText('Leads clear, personalized coverage conversations for individuals, families, and business owners—bringing priorities, timing, and plan details into focus.', { exact: true }).isVisible(), `Shaquille specialty missing after flip at ${viewport.width}`);
  check(await team.getByRole('button', { name: 'Back to photo' }).isVisible(), `team card return control missing at ${viewport.width}`);
  await team.getByRole('button', { name: 'Back to photo' }).click();
  if (expectManagedAssets) {
    const teamImages = page.locator('#team img');
    for (let i = 0; i < await teamImages.count(); i++) {
      await teamImages.nth(i).scrollIntoViewIfNeeded();
      await teamImages.nth(i).evaluate(img => img.decode().catch(() => null));
    }
    const imageIssues = await teamImages.evaluateAll(imgs => imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src));
    check(!imageIssues.length, `broken team image(s): ${imageIssues.join(', ')}`);
  }
  await context.close();

  const unavailableContext = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
  const unavailablePage = await unavailableContext.newPage();
  await unavailablePage.route('https://www.googletagmanager.com/gtag/js?id=AW-18221337260', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await unavailablePage.route('**/maps/api/js**', route => route.abort());
  await unavailablePage.goto(base + '/', { waitUntil: 'domcontentloaded' });
  await unavailablePage.evaluate(() => document.querySelector('#testimonials')?.scrollIntoView({ block: 'center' }));
  const unavailable = unavailablePage.getByText('Live reviews are unavailable right now. You can read the current reviews on Google Maps.');
  await unavailable.waitFor({ timeout: 5000 }).catch(() => null);
  check(await unavailable.isVisible(), `Google review unavailable state missing at ${viewport.width}`);
  const fallback = unavailablePage.locator('#testimonials .google-reviews-link');
  check((await fallback.getAttribute('href'))?.startsWith('https://www.google.com/maps/search/?api=1&') === true, `Google review fallback is not a verified Google Maps URL at ${viewport.width}`);
  check(await unavailablePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2), `unavailable review state overflows at ${viewport.width}`);
  await unavailableContext.close();
}
await browser.close();
if (errors.length) { console.error('FAIL browser QA:\n' + errors.join('\n')); process.exit(1); }
console.log('PASS browser QA: 10 routes × desktop/mobile, no overflow/runtime errors, mobile nav, form validation, select contrast/states, consent, zero Google Ads conversions on provider failure and one exact conversion on confirmed receipt, live/unavailable Google review states with attribution, business fields, and configured image checks.');
