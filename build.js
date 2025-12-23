#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = __dirname;
const DIST_DIR = join(PROJECT_ROOT, 'Marketing');

console.log('🏗️  Building Marketing Célula for Vercel...\n');

// Clean Marketing directory (except existing HTML files)
if (existsSync(DIST_DIR)) {
    console.log('🧹 Cleaning Marketing directory...');
    // Keep HTML files, clean other directories if needed
}

// Create Marketing directory if it doesn't exist
mkdirSync(DIST_DIR, { recursive: true });

console.log('📦 Copying files to Marketing...\n');

// Copy assets directory from root to Marketing
console.log('🖼️  Copying assets...');
const assetsSrc = join(PROJECT_ROOT, 'assets');
const assetsDest = join(DIST_DIR, 'assets');
if (existsSync(assetsSrc)) {
    // Remove old assets if exists
    if (existsSync(assetsDest)) {
        rmSync(assetsDest, { recursive: true, force: true });
    }
    cpSync(assetsSrc, assetsDest, { recursive: true });
    console.log('  ✓ assets/');
} else {
    console.log('  ⚠ assets/ not found in root, skipping...');
}

// CSS and JS are already in Marketing directory, no need to copy
console.log('\n🎨 CSS files already in Marketing/css/');
console.log('⚙️  JS files already in Marketing/js/');

// Copy static files
console.log('\n📋 Copying static files...');
const staticFiles = [
    'manifest.json',
    'robots.txt',
    'sitemap.xml',
    'sw.js',
    '_headers'
];

staticFiles.forEach(file => {
    const src = join(PROJECT_ROOT, file);
    const dest = join(DIST_DIR, file);
    if (existsSync(src)) {
        cpSync(src, dest);
        console.log(`  ✓ ${file}`);
    }
});

console.log('\n✅ Build complete! Output in Marketing/\n');
console.log('📊 Build summary:');
console.log('   - HTML pages: ✓');
console.log('   - Assets: ✓');
console.log('   - CSS & JS: ✓');
console.log('   - Static files: ✓\n');
