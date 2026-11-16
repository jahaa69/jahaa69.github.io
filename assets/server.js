require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const http = require('http');
const fs   = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8000;
const root = path.join(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  if (urlPath === '/assets/env.js') {
    const config = {
      DISCORD_WEBHOOK:  process.env.DISCORD_WEBHOOK  || '',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    };
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(`window.CONFIG = ${JSON.stringify(config)};`);
    return;
  }

  const filePath = path.join(root, urlPath === '/' ? 'index.html' : urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
