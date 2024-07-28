import { Plugin } from 'esbuild';
import { extname } from 'path';
import { paths } from './path';

export function esbuildDepPlugin(deps: Record<string, string>): Plugin {
  return {
    name: 'dep-pre-bundle',
    setup(build) {
      build.onResolve({ filter: /^[\w@][^:]/ }, async ({ path: id, kind }) => {
        const isEntry = kind === 'entry-point';
        if (id in deps) {
          return isEntry ? { path: id, namespace: 'dep' } : { path: deps[id] };
        } else {
          return {};
        }
      });

      // @ts-ignore
      build.onLoad({ filter: /.*/, namespace: 'dep' }, ({ path: id }) => {
        let contents: string = '';
        contents += `import d from "${deps[id]}";export default d;\n`;
        contents += `export * from "${deps[id]}";\n`;

        let loader = extname(deps[id]).slice(1);
        if (loader === 'mjs') {
          loader = 'js';
        }

        return {
          loader,
          contents,
          resolveDir: paths.appDir,
        };
      });
    },
  };
}
