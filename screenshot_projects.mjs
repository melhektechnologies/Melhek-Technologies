import puppeteer from 'puppeteer';
import { execSync, spawn } from 'child_process';
import fs from 'fs';
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
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await sleep(waitMs);
    const clip = { x: 0, y: 0, width: 1440, height: 900 };
    await page.screenshot({ path: outFile, type: 'png', clip });
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
    cwd,
    shell: true,
    stdio: 'ignore',
    detached: false,
  });
  return proc;
}

async function waitForPort(port, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      execSync(`netstat -ano | findstr ":${port}.*LISTEN"`, { stdio: 'ignore' });
      return true;
    } catch {
      await sleep(1000);
    }
  }
  return false;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  //------------------------------------------------------
  // 1. Happy Optics (already on 3000) - login page shows real UI
  //------------------------------------------------------
  console.log('\n📸 Happy Optics...');
  await captureScreenshot(
    browser,
    'http://localhost:3000/auth/login/staff?branch=Bole',
    path.join(portfolioDir, 'happy-optics.png'),
    5000
  );

  //------------------------------------------------------
  // 2. Amen Car Import - start on port 3010
  //------------------------------------------------------
  console.log('\n📸 Amen Car Import...');
  const amenDir = 'C:\\Projects\\Amen Car  Import';
  const amenProc = startServer(amenDir, 3010);
  const amenReady = await waitForPort(3010, 45000);
  if (amenReady) {
    await sleep(3000);
    await captureScreenshot(
      browser,
      'http://localhost:3010',
      path.join(portfolioDir, 'amen-car-import.png'),
      6000
    );
  } else {
    console.error('  ❌ Amen Car Import server did not start in time');
  }
  amenProc.kill();

  //------------------------------------------------------
  // 3. Kidist Arsema - HTML file
  //------------------------------------------------------
  console.log('\n📸 Kidist Arsema...');
  const kidistPath = 'file:///C:/Projects/Kidist%20Arsema/index.html';
  await captureScreenshot(
    browser,
    kidistPath,
    path.join(portfolioDir, 'kidist-arsema.png'),
    4000
  );

  //------------------------------------------------------
  // 4. Belete Tasew Law Firm - HTML file
  //------------------------------------------------------
  console.log('\n📸 Belete Tasew Law Firm...');
  const beletePath = 'file:///C:/Projects/Belete/belete-tasew-law.html';
  await captureScreenshot(
    browser,
    beletePath,
    path.join(portfolioDir, 'belete-tasew-law.png'),
    4000
  );

  //------------------------------------------------------
  // 5. Pharmacy Management System - start on port 3020
  //------------------------------------------------------
  console.log('\n📸 Pharmacy Management System...');
  const pharmDir = 'C:\\Projects\\Pharmacy Management System';
  const pharmProc = startServer(pharmDir, 3020);
  const pharmReady = await waitForPort(3020, 45000);
  if (pharmReady) {
    await sleep(3000);
    await captureScreenshot(
      browser,
      'http://localhost:3020',
      path.join(portfolioDir, 'pharmacy-management.png'),
      5000
    );
  } else {
    console.error('  ❌ Pharmacy server did not start in time');
  }
  pharmProc.kill();

  //------------------------------------------------------
  // 6. Gym Management System - HTML file
  //------------------------------------------------------
  console.log('\n📸 Gym Management...');
  const gymPath = 'file:///C:/Projects/Gym/index.html';
  await captureScreenshot(
    browser,
    gymPath,
    path.join(portfolioDir, 'gym-management.png'),
    4000
  );

  await browser.close();
  console.log('\n🎉 All screenshots complete!');
})();
