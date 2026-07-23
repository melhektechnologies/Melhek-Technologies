/**
 * Logo Compression Script — Melhek Technologies
 * Uses Sharp (bundled with Next.js) to:
 *  1. Resize logo files to a sensible max dimension (400px)
 *  2. Convert to PNG with max compression (keep as .png for compatibility)
 *  3. Also produce a .webp variant for future use
 *  4. Report file sizes before and after
 */

import sharp from 'sharp'
import { readFileSync, writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, 'public')

const filesToOptimize = [
  { input: 'logo-light.png',   output: 'logo-light.png',   maxSize: 400 },
  { input: 'logo-light-2.png', output: 'logo-light-2.png', maxSize: 400 },
  { input: 'melhek Logo.png',  output: 'melhek Logo.png',  maxSize: 400 },
  { input: 'logo-dark.jpg',    output: 'logo-dark.jpg',    maxSize: 400 },
]

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function optimizeLogo(file) {
  const inputPath = join(PUBLIC_DIR, file.input)
  const outputPath = join(PUBLIC_DIR, file.output)
  const webpPath = join(PUBLIC_DIR, file.output.replace(/\.(png|jpg)$/, '.webp'))

  const beforeSize = statSync(inputPath).size
  console.log(`\n📂 ${file.input}`)
  console.log(`   Before: ${formatBytes(beforeSize)}`)

  // Get image metadata
  const meta = await sharp(inputPath).metadata()
  console.log(`   Original dimensions: ${meta.width}×${meta.height}px`)

  // Determine output size — cap at maxSize but don't upscale
  const shouldResize = (meta.width > file.maxSize || meta.height > file.maxSize)

  const pipeline = sharp(inputPath)
    .trim() // Remove transparent/whitespace padding
    
  if (shouldResize) {
    pipeline.resize(file.maxSize, file.maxSize, {
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Save optimized image (PNG or JPG)
  let afterSizeImg = 0
  if (file.output.endsWith('.jpg') || file.output.endsWith('.jpeg')) {
    const jpgBuffer = await pipeline
      .clone()
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer()
    writeFileSync(outputPath, jpgBuffer)
    afterSizeImg = jpgBuffer.length
    console.log(`   After JPG: ${formatBytes(afterSizeImg)} (${Math.round((1 - afterSizeImg / beforeSize) * 100)}% smaller)`)
  } else {
    const pngBuffer = await pipeline
      .clone()
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toBuffer()
    writeFileSync(outputPath, pngBuffer)
    afterSizeImg = pngBuffer.length
    console.log(`   After PNG: ${formatBytes(afterSizeImg)} (${Math.round((1 - afterSizeImg / beforeSize) * 100)}% smaller)`)
  }

  // Save WebP variant (even smaller, for future reference)
  const webpBuffer = await pipeline
    .clone()
    .webp({ quality: 85, lossless: false })
    .toBuffer()

  writeFileSync(webpPath, webpBuffer)
  const afterSizeWebp = webpBuffer.length
  console.log(`   After WebP: ${formatBytes(afterSizeWebp)} — saved to ${file.output.replace(/\.(png|jpg)$/, '.webp')}`)

  return { input: file.input, before: beforeSize, after: afterSizeImg }
}

async function run() {
  console.log('🔧 Melhek Logo Optimizer — using Sharp')
  console.log('═'.repeat(50))

  const results = []
  for (const file of filesToOptimize) {
    try {
      const result = await optimizeLogo(file)
      results.push(result)
    } catch (err) {
      console.error(`   ❌ Failed to process ${file.input}:`, err.message)
    }
  }

  console.log('\n' + '═'.repeat(50))
  console.log('📊 Summary')
  console.log('═'.repeat(50))

  let totalBefore = 0
  let totalAfter = 0
  for (const r of results) {
    totalBefore += r.before
    totalAfter += r.after
    const saving = Math.round((1 - r.after / r.before) * 100)
    console.log(`  ✅ ${r.input}: ${formatBytes(r.before)} → ${formatBytes(r.after)} (−${saving}%)`)
  }

  const totalSaving = Math.round((1 - totalAfter / totalBefore) * 100)
  console.log(`\n  💾 Total saved: ${formatBytes(totalBefore - totalAfter)} (−${totalSaving}% overall)`)
  console.log('\n✨ Done. WebP variants also created for future use.')
}

run().catch(console.error)
