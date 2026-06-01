import puppeteer from 'puppeteer';
import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioDir = path.join(__dirname, 'public', 'portfolio');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function captureScreenshot(browser, url, outFile, waitMs = 4000) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  try {
    console.log(`  → Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(waitMs);
    await page.screenshot({ path: outFile, type: 'png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log(`  ✅ Saved: ${outFile}`);
    return true;
  } catch (e) {
    console.error(`  ❌ Failed: ${e.message}`);
    return false;
  } finally {
    await page.close();
  }
}

function startServer(cwd, port) {
  console.log(`  Starting dev server on port ${port} in ${cwd}...`);
  const proc = spawn('npm', ['run', 'dev', '--', '-p', String(port)], {
    cwd, shell: true, stdio: 'ignore', detached: false,
  });
  return proc;
}

async function waitForPort(port, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      execSync(`netstat -ano | findstr ":${port}.*LISTEN"`, { stdio: 'ignore' });
      return true;
    } catch {
      await sleep(1500);
    }
  }
  return false;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  // ── 1. Amen Car Import ── port 3010
  console.log('\n📸 [1/5] Amen Car Import...');
  const amenProc = startServer('C:\\Projects\\Amen Car  Import', 3010);
  if (await waitForPort(3010)) {
    await sleep(4000);
    await captureScreenshot(browser, 'http://localhost:3010', path.join(portfolioDir, 'amen-car-import.png'), 7000);
  } else { console.error('  ❌ Amen Car Import timed out'); }
  amenProc.kill();
  await sleep(2000);

  // ── 2. Happy Optics ── port 3040
  console.log('\n📸 [2/5] Happy Optics...');
  const opticsProc = startServer('C:\\Projects\\happy-optics-system', 3040);
  if (await waitForPort(3040)) {
    await sleep(4000);
    await captureScreenshot(browser, 'http://localhost:3040', path.join(portfolioDir, 'happy-optics.png'), 6000);
  } else { console.error('  ❌ Happy Optics timed out'); }
  opticsProc.kill();
  await sleep(2000);

  // ── 3. Kidist Arsema ── HTML file
  console.log('\n📸 [3/5] Kidist Arsema...');
  await captureScreenshot(
    browser,
    'file:///C:/Projects/Kidist%20Arsema/index.html',
    path.join(portfolioDir, 'kidist-arsema.png'),
    4000
  );

  // ── 4. Belete Tasew Law Firm ── HTML file
  console.log('\n📸 [4/5] Belete Tasew Law Firm...');
  await captureScreenshot(
    browser,
    'file:///C:/Projects/Belete/index.html',
    path.join(portfolioDir, 'belete-tasew-law.png'),
    4000
  );

  // ── 5. Pharmacy Management System ── port 3020
  console.log('\n📸 [5/5] Pharmacy Management System...');
  const pharmProc = startServer('C:\\Projects\\Pharmacy Management System', 3020);
  if (await waitForPort(3020)) {
    await sleep(4000);
    await captureScreenshot(browser, 'http://localhost:3020', path.join(portfolioDir, 'pharmacy-management.png'), 5000);
  } else { console.error('  ❌ Pharmacy timed out'); }
  pharmProc.kill();
  await sleep(2000);

  // ── 6. Gym Management System ── port 3030
  console.log('\n📸 [6/6] Gym Management...');
  const gymProc = startServer('C:\\Projects\\Gym', 3030);
  if (await waitForPort(3030)) {
    await sleep(4000);
    await captureScreenshot(browser, 'http://localhost:3030', path.join(portfolioDir, 'gym-management.png'), 5000);
  } else { console.error('  ❌ Gym timed out'); }
  gymProc.kill();

  await browser.close();
  console.log('\n🎉 All screenshots complete!');
})();
