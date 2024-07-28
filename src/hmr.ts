import chalk from 'chalk';
import path from 'path';
import { paths } from './path';

function getShortName(file: string, root: string) {
  return file.startsWith(root + '/') ? path.posix.relative(root, file) : file;
}

export function handleHMRUpdate(opts: { file: string; ws: any }) {
  const { file, ws } = opts;
  const filename = getShortName(file, paths.appDir);
  const timestamp = Date.now();

  console.log(`[Updated] ${chalk.dim(chalk.green(filename))}`);
  const isCss = filename.endsWith('.css');

  const updates = [
    {
      type: isCss ? 'css-update' : 'js-update',
      timestamp,
      path: `/${filename}`,
      acceptedPath: `/${filename}`,
    },
  ];

  ws.send({
    type: 'update',
    updates,
  });
}
