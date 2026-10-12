import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'dist/public');
const imageDir = path.join(root, 'src/assets/optimized');
const manifest = JSON.parse(await fs.readFile(path.join(imageDir, 'manifest.json'), 'utf8'));

async function htmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const filename = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(filename) : entry.name === 'index.html' ? [filename] : [];
  }))).flat();
}

for (const [filename, image] of Object.entries(manifest)) {
  const full = await sharp(path.join(imageDir, filename)).metadata();
  assert.equal(full.width, image.width);
  assert.equal(full.height, image.height);
  for (const variant of image.variants) {
    const file = path.join(imageDir, variant.file);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.width, variant.width);
    assert.ok(variant.width < image.width, 'Variants must never upscale');
    assert.ok(Math.abs(metadata.height / metadata.width - image.height / image.width) < .005, 'Preserve full-frame aspect ratio');
    assert.equal((await fs.stat(file)).size, variant.bytes);
  }
}

let photoCount = 0;
function attributes(tag) {
  // React's SSR spelling can be camelCase; HTML attributes are case-insensitive.
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)]
    .map(attr => [attr[1].toLowerCase(), attr[2]]));
}
const pages = await htmlFiles(publicDir);
assert.equal(pages.length, 16, 'All public routes must remain pre-rendered');
for (const page of pages) {
  const html = await fs.readFile(page, 'utf8');
  assert.match(html, /<h1\b/, 'Meaningful initial content must remain present');
  assert.match(html, /<title>/);
  const photos = [...html.matchAll(/<img\b[^>]+>/g)]
    .map(match => attributes(match[0]))
    .filter(img => img.src.endsWith('.webp'));
  for (const img of photos) {
    photoCount++;
    assert.ok(Number(img.width) > 0 && Number(img.height) > 0, 'Reserve intrinsic image space');
    assert.ok(img.sizes && img.srcset, 'Responsive choices must be in initial HTML');
    assert.equal(img.decoding, 'async');
    assert.ok(['lazy', 'eager'].includes(img.loading));
    if (img.fetchpriority === 'high') assert.equal(img.loading, 'eager');
    for (const candidate of img.srcset.split(', ')) {
      const [url, width] = candidate.split(' ');
      assert.match(width, /^\d+w$/);
      const asset = path.join(publicDir, decodeURIComponent(url.replace(/^.*\/assets\//, 'assets/')));
      const metadata = await sharp(asset).metadata();
      assert.equal(metadata.width, Number(width.slice(0, -1)));
    }
  }
  if (!page.endsWith('/products/index.html')) {
    const hero = photos.find(img => img.fetchpriority === 'high');
    assert.ok(hero, 'Every photo-led page should prioritise its hero');
    const preload = [...html.matchAll(/<link\b[^>]+>/g)].map(match => attributes(match[0]))
      .find(link => link.imagesrcset);
    assert.equal(preload?.imagesrcset, hero.srcset, 'Hero preload must use responsive choices, not duplicate the fallback download');
    assert.equal(preload?.imagesizes, hero.sizes);
  } else {
    assert.equal(photos.length, 13);
    assert.ok(photos.every(img => img.loading === 'lazy'));
  }
}
console.log(`Verified ${Object.keys(manifest).length} original-photo mappings, all responsive widths/crops, and ${photoCount} photo tags across ${pages.length} pre-rendered routes.`);

// File payloads, not a timing/Core Web Vitals benchmark. Browser choice varies
// with screen size, device pixel ratio, cache state and data-saving preferences.
for (const name of ['image_1788154192187.webp', 'Glass-cleaner_1791199475175.webp', 'hand-cleaner-bottles_1791199475175.webp']) {
  const image = manifest[name];
  console.log(`${name}: supplied ${image.originalBytes} B; existing fallback ${image.bytes} B; ${image.variants.map(v => `${v.width}w ${v.bytes} B`).join('; ')}`);
}
