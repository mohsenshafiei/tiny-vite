import express from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { extname, join } from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createWebSocketServer } from './ws';
import { handleHMRUpdate } from './hmr';

import { watch } from './watcher';

const chalky = (() => {
  return (...args: any) => {
    console.log(chalk.green(...args));
  };
})();

import { transformCode, transformJS } from './transformJS';
import { transformCSS } from './transformCSS';

dotenv.config();
// Paths
import { paths } from './path';

export async function dev() {
  const app = express();

  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    let html = readFileSync(paths.htmlSrc, 'utf-8');
    html = html.replace(
      '<head>',
      `<head><script type="module" src="/vite/client"></script>`.trim(),
    );
    res.send(html);
  });

  app.get('/vite/client', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(
      transformCode({
        code: readFileSync(paths.clientSDKSrc, 'utf-8'),
      }).code,
    );
    return;
  });

  app.get('/src/*', (req, res) => {
    chalky('[Request file]', req.path, req.query);
    console.log(req.query);
    if ('import' in req.query) {
      res.set('Content-Type', 'application/javascript');
      res.send(`export default "${req.path}"`);
      return;
    }

    switch (extname(req.path)) {
      case '.svg':
        res.set('Content-Type', 'image/svg+xml');
        res.send(readFileSync(join(paths.appDir, req.path.slice(1)), 'utf-8'));
        break;
      case '.css':
        res.set('Content-Type', 'application/javascript');
        res.send(
          transformCSS({
            path: req.path,
            code: readFileSync(join(paths.appDir, req.path.slice(1)), 'utf-8'),
          }),
        );
        break;
      default:
        res.set('Content-Type', 'application/javascript');
        res.send(
          transformJS({
            appRoot: paths.appDir,
            path: req.path,
            code: readFileSync(join(paths.appDir, req.path.slice(1)), 'utf-8'),
          }).code,
        );
        break;
    }
  });

  const server = createServer(app);

  const watcher = watch();
  const ws = createWebSocketServer(server);
  watcher.on('change', async (file) => {
    handleHMRUpdate({ file, ws });
  });

  const port = 3002;
  server.listen(port, () => {
    chalky(
      `Example app listening at http://${
        process.env.HOST || '127.0.0.1'
      }:${port}`,
    );
  });
}
