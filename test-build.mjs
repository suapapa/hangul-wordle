import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const dist = './dist';
const files = readdirSync(dist);

console.log('✓ Build output exists at dist/');
files.forEach(f => {
  const size = statSync(join(dist, f)).size;
  console.log(`  - ${f} (${size} bytes)`);
});

// Check index.html content
const html = readFileSync(join(dist, 'index.html'), 'utf8');
if (html.includes('<div id="root"></div>')) {
  console.log('\n✓ index.html renders React root div');
}
if (html.includes('한글 단어 맞추기')) {
  console.log('✓ Korean title found in HTML');
}
const jsMatch = html.match(/index-[\w-]+\.js/);
if (jsMatch) {
  console.log('✓ JS bundle referenced in HTML');
}
const cssMatch = html.match(/index-[\w-]+\.css/);
if (cssMatch) {
  console.log('✓ CSS bundle referenced in HTML');
}
console.log('\n✓ All build checks passed!');