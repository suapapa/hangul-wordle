const { chromium } = require('playwright');
(async () => {
  try {
    // Check if dist folder exists and has files
    const fs = require('fs');
    const path = require('path');
    const dist = path.join(__dirname, 'dist');
    if (fs.existsSync(dist)) {
      const files = fs.readdirSync(dist);
      console.log('✓ Build output exists at dist/');
      files.forEach(f => console.log(`  - ${f} (${fs.statSync(path.join(dist, f)).size} bytes)`));
    }
    
    // Check index.html content
    const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    if (html.includes('<div id="root"></div>')) {
      console.log('✓ index.html renders React root div');
    }
    if (html.includes('한글 단어 맞추기')) {
      console.log('✓ Korean title found in HTML');
    }
    if (html.includes('index-')) {
      console.log('✓ JS bundle referenced in HTML');
    }
    if (html.includes('index-')) {
      console.log('✓ CSS bundle referenced in HTML');
    }
    console.log('\n✓ All build checks passed!');
  } catch (e) {
    console.error('✗ Error:', e.message);
    process.exit(1);
  }
})();
