import chokidar from 'chokidar';
import { paths } from './path';

export function watch() {
  const watcher = chokidar.watch(paths.appDir, {
    ignored: ['**/node_modules/**', '**/.git/**'],
    ignoreInitial: true,
    ignorePermissionErrors: true,
    disableGlobbing: true,
  });
  watcher;

  return watcher;
}
