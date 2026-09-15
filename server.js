import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets from public/ and root directory
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}
app.use(express.static(__dirname));

// Explicit asset handlers with strict MIME types for Vercel/Node bundle compatibility
app.get('/styles.css', (req, res) => {
  const file = fs.existsSync(path.join(publicDir, 'styles.css'))
    ? path.join(publicDir, 'styles.css')
    : path.join(__dirname, 'styles.css');
  res.type('text/css').sendFile(file);
});

app.get('/script.js', (req, res) => {
  const file = fs.existsSync(path.join(publicDir, 'script.js'))
    ? path.join(publicDir, 'script.js')
    : path.join(__dirname, 'script.js');
  res.type('application/javascript').sendFile(file);
});

app.get('/aula-01-mentoria-trafego.pdf', (req, res) => {
  const file = fs.existsSync(path.join(publicDir, 'aula-01-mentoria-trafego.pdf'))
    ? path.join(publicDir, 'aula-01-mentoria-trafego.pdf')
    : path.join(__dirname, 'aula-01-mentoria-trafego.pdf');
  res.type('application/pdf').sendFile(file);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve index.html for page routes; return 404 for missing assets with file extensions
app.get('*', (req, res) => {
  if (path.extname(req.path)) {
    return res.status(404).send('Asset not found');
  }
  const indexFile = fs.existsSync(path.join(publicDir, 'index.html'))
    ? path.join(publicDir, 'index.html')
    : path.join(__dirname, 'index.html');
  res.sendFile(indexFile);
});

app.listen(PORT, HOST, () => {
  console.log(`Mentoria de Tráfego server running at http://${HOST}:${PORT}`);
});
