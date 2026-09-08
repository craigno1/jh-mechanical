import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, '../dist/public');
const baseUrl = (process.env.URL || 'http://localhost:5173').replace(/\/+$/, '');

const routes = [
  '/',
  '/about',
  '/services/diesel-mechanic',
  '/services/diesel-servicing',
  '/services/vehicle-maintenance',
  '/services/vehicle-breakdown',
  '/services/vehicle-repairs',
  '/service-areas/heathcote',
  '/service-areas/bendigo',
  '/service-areas/seymour',
  '/service-areas/macedon',
  '/service-areas/shepparton',
  '/service-areas/lockington',
  '/service-areas/melbourne',
  '/service-areas/sunbury'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/services/') ? '0.9' : route.includes('/service-areas/') ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;

if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);
  console.log('Sitemap and robots.txt generated successfully.');
} else {
  console.log('Build directory not found, skipping sitemap generation.');
}
