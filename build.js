import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'aula-02.html',
  'styles.css',
  'script.js',
  'aula-01-mentoria-trafego.pdf'
];
for (const file of filesToCopy) {
  const src = path.join(__dirname, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to public/${file}`);
  }
}

// Also create alias aula-2.html in public/ and root for convenience
const aula2Src = path.join(__dirname, 'aula-02.html');
if (fs.existsSync(aula2Src)) {
  fs.copyFileSync(aula2Src, path.join(publicDir, 'aula-2.html'));
  fs.copyFileSync(aula2Src, path.join(__dirname, 'aula-2.html'));
  console.log('Created aula-2.html alias');
}

console.log('Build complete: assets copied to public/ for Vercel CDN deployment.');
