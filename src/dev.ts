import express from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import chalk from 'chalk';

// Paths
import { paths } from './path';

export async function dev() {
  const app = express();
  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    let html = readFileSync(paths.htmlSrc, 'utf-8');
    html = html.replace(
      '<head>',
      `<head><script type="module" src="/@vite/client"></script>`.trim(),
    );
    res.send(html);
  });

  const server = createServer(app);
  const port = 3002;
  server.listen(port, () => {
    console.log(
      `Example app listening at http://${
        process.env.HOST || '127.0.0.1'
      }:${port}`,
    );
  });
}
