import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const artifactDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uploadsDir = path.resolve(artifactDir, '../../attached_assets');
const outputDir = path.join(artifactDir, 'src/assets/optimized');
const originals = await fs.readdir(uploadsDir);

async function sourceFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(async entry => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(filename);
    return /\.(ts|tsx)$/.test(entry.name) ? [filename] : [];
  }));
  return groups.flat();
}

const images = new Map();
for (const filename of await sourceFiles(path.join(artifactDir, 'src'))) {
  const source = await fs.readFile(filename, 'utf8');
  for (const match of source.matchAll(/from ['"](?:@assets\/|@\/assets\/optimized\/)([^'"]+)['"]/g)) {
    const stem = path.parse(match[1]).name;
    // Leave the brand mark untouched; this pass only optimises photographs.
    if (stem === 'image_1788175621031') continue;
    const original = originals.find(name => path.parse(name).name === stem && /\.(png|jpe?g)$/i.test(name));
    if (!original) throw new Error(`Missing original photograph: ${match[1]}`);
    const width = filename.endsWith('Products.tsx') ? 900 :
      stem === 'image_1788154081149' ? 1600 : 1200;
    images.set(original, Math.max(width, images.get(original) || 0));
  }
}

await fs.mkdir(outputDir, { recursive: true });
let originalBytes = 0;
let optimizedBytes = 0;
for (const [original, width] of images) {
  const input = path.join(uploadsDir, original);
  const output = path.join(outputDir, `${path.parse(original).name}.webp`);
  // Keep the complete image, orientation and aspect ratio. Never upscale.
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(output);
  const before = (await fs.stat(input)).size;
  const after = (await fs.stat(output)).size;
  originalBytes += before;
  optimizedBytes += after;
  console.log(`${original}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
}
console.log(`${images.size} photographs: ${(originalBytes / 1048576).toFixed(2)} MB → ${(optimizedBytes / 1048576).toFixed(2)} MB (${(100 * (1 - optimizedBytes / originalBytes)).toFixed(1)}% smaller).`);
