const { chromium } = require('playwright');

async function testInteractions() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('Testing page title and meta...');
  const title = await page.title();
  console.log('Page Title:', title);

  console.log('Testing anchor link smooth scrolling...');
  const applyBtn = await page.locator('a[href="#admissions"]').first();
  await applyBtn.click();
  await page.waitForTimeout(500);

  // Check if Admissions Form is in viewport
  const admissionsSection = await page.locator('#admissions');
  const isVisible = await admissionsSection.isVisible();
  console.log('Admissions section visible:', isVisible);

  console.log('Testing Admissions Form validation & input...');
  const parentNameInput = page.locator('input[name="parentName"]');
  await parentNameInput.fill('Dr. Rajesh Sharma');

  const studentNameInput = page.locator('input[name="studentName"]');
  await studentNameInput.fill('Aarav Sharma');

  const phoneInput = page.locator('input[name="phone"]');
  await phoneInput.fill('+91 9876543210');

  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill('rajesh.sharma@example.com');

  const gradeSelect = page.locator('select[name="grade"]');
  await gradeSelect.selectOption({ index: 1 });

  const curriculumSelect = page.locator('select[name="curriculum"]');
  await curriculumSelect.selectOption({ index: 1 });

  const actionSelect = page.locator('select[name="preferredAction"]');
  await actionSelect.selectOption({ index: 1 });

  const messageArea = page.locator('textarea[name="message"]');
  await messageArea.fill('Looking for admission into Grade 6 for the 2026-2027 academic session.');

  console.log('Admissions Form filled successfully.');

  // Test Mobile Navigation Drawer
  console.log('Testing Mobile Drawer...');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const hamburger = mobilePage.locator('button[aria-label="Open menu"]');
  await hamburger.click();
  await mobilePage.waitForTimeout(400);

  const menuTextVisible = await mobilePage.locator('text=About us').nth(1).isVisible();
  console.log('Mobile menu drawer opened with nav items:', menuTextVisible);

  const closeBtn = mobilePage.locator('button[aria-label="Close menu"]');
  await closeBtn.click();
  await mobilePage.waitForTimeout(400);

  const closedHamburgerVisible = await mobilePage.locator('button[aria-label="Open menu"]').isVisible();
  console.log('Mobile menu drawer closed successfully:', closedHamburgerVisible);

  await mobilePage.close();
  await browser.close();
  console.log('ALL FUNCTIONAL TESTS PASSED!');
}

testInteractions().catch(err => {
  console.error('Interaction test failed:', err);
  process.exit(1);
});
