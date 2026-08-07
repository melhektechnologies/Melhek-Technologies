const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, '..', 'public', 'portfolio')

const SITES = [
  {
    url: 'https://amen-car-import-8nnsoucna-melheks-projects.vercel.app/',
    file: 'amen-car-import.png',
  },
  {
    url: 'https://happy-optics-campaign.vercel.app/',
    file: 'happy-optics.png',
  },
  {
    url: 'https://belete-tasew-attorney-at-law.vercel.app/',
    file: 'belete-tasew-law.png',
  },
  {
    url: 'https://neaiomarketing.vercel.app/',
    file: 'neaio-marketing.png',
  },
  {
    url: 'https://ethiopianskylighthotel.vercel.app/',
    file: 'ethiopian-skylight-hotel.png',
  },
  {
    url: 'https://pharmacy-management-system-melhek.vercel.app/',
    file: 'pharmacy-management.png',
  },
  {
    url: 'https://kidist-arsema-traditional-clothes.vercel.app/',
    file: 'kidist-arsema.png',
  },
]

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  })

  for (const site of SITES) {
    const page = await browser.newPage()
    try {
      console.log('Capturing', site.file, '…')
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 90000 })
      await new Promise((r) => setTimeout(r, 1500))
      const dest = path.join(OUT, site.file)
      await page.screenshot({ path: dest, type: 'png', fullPage: false })
      console.log('Saved', dest)
    } catch (err) {
      console.error('FAILED', site.file, err.message)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('Done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
