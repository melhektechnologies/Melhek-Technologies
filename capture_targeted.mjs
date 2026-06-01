/**
 * Targeted screenshot script for:
 *  - Pharmacy: bypasses JWT cookie auth to capture /dashboard
 *  - Happy Optics: bypasses Supabase auth to capture /dashboard
 */
import puppeteer from 'puppeteer';
import { execSync, spawn } from 'child_process';
import { createHmac } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioDir = path.join(__dirname, 'public', 'portfolio');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function captureScreenshot(browser, url, outFile, setup, waitMs = 5000) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  try {
    if (setup) await setup(page);
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
  return spawn('npm', ['run', 'dev', '--', '-p', String(port)], {
    cwd, shell: true, stdio: 'ignore', detached: false,
  });
}

async function waitForPort(port, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      execSync(`netstat -ano | findstr ":${port}.*LISTEN"`, { stdio: 'ignore' });
      return true;
    } catch { await sleep(1500); }
  }
  return false;
}

// ── Build a valid pharmacy JWT token using the real AUTH_SECRET ──
function buildPharmacyToken() {
  const AUTH_SECRET = 'melhek_pms_super_secret_session_key_2026';
  const b64url = (input) =>
    Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64url(JSON.stringify({
    sub: 'screenshot-user',
    role: 'ADMIN',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
  }));
  const body = `${header}.${payload}`;
  const sig = b64url(createHmac('sha256', AUTH_SECRET).update(body).digest());
  return `${body}.${sig}`;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  // ── 1. Pharmacy Management — dashboard after real JWT auth ──────────────
  console.log('\n📸 Pharmacy Management System (Dashboard)...');
  const pharmProc = startServer('C:\\Projects\\Pharmacy Management System', 3020);
  if (await waitForPort(3020)) {
    await sleep(4000);
    const token = buildPharmacyToken();
    const pharmSetup = async (page) => {
      // Set the session cookie before navigation
      await page.setCookie({
        name: 'melhek_session',
        value: token,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
      });
    };
    await captureScreenshot(
      browser,
      'http://localhost:3020/dashboard',
      path.join(portfolioDir, 'pharmacy-management.png'),
      pharmSetup,
      6000
    );
  } else { console.error('  ❌ Pharmacy server did not start in time'); }
  pharmProc.kill();
  await sleep(2000);

  // ── 2. Happy Optics — dashboard after Supabase session injection ────────
  console.log('\n📸 Happy Optics (Dashboard)...');
  const SUPABASE_URL = 'https://jkgfhmaclfiyulgdbbsq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ2ZobWFjbGZpeXVsZ2RiYnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDE2MjAsImV4cCI6MjA4MjA3NzYyMH0.po3Dv7s4UlgyywafjoeJKgN_fTdOY5Jn6pTejiEWb08';
  // The storage key Supabase uses: sb-<ref>-auth-token
  const STORAGE_KEY = 'sb-jkgfhmaclfiyulgdbbsq-auth-token';

  const opticsProc = startServer('C:\\Projects\\happy-optics-system', 3040);
  if (await waitForPort(3040)) {
    await sleep(4000);
    const opticsSetup = async (page) => {
      // Navigate to the app first to set origin, then inject session
      await page.goto('http://localhost:3040', { waitUntil: 'domcontentloaded', timeout: 20000 });
      await sleep(1000);
      // Inject a mock Supabase session into localStorage so the auth check passes
      await page.evaluate((storageKey) => {
        const fakeSession = {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzY3JlZW5zaG90IiwicmVmIjoiamtnZmhtYWNsZml5dWxnZGJic3EiLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImV4cCI6OTk5OTk5OTk5OX0.fake',
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: 9999999999,
          refresh_token: 'fake-refresh-token',
          user: {
            id: 'screenshot-user',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'demo@happyoptics.com',
            email_confirmed_at: '2024-01-01T00:00:00Z',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            app_metadata: { provider: 'email' },
            user_metadata: { full_name: 'Demo User' },
          }
        };
        localStorage.setItem(storageKey, JSON.stringify(fakeSession));
      }, STORAGE_KEY);
      await sleep(500);
    };
    await captureScreenshot(
      browser,
      'http://localhost:3040/dashboard',
      path.join(portfolioDir, 'happy-optics.png'),
      opticsSetup,
      6000
    );
  } else { console.error('  ❌ Happy Optics server did not start in time'); }
  opticsProc.kill();

  await browser.close();
  console.log('\n✅ Targeted screenshots complete!');
})();
