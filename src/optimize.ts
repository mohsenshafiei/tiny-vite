import resolve from 'resolve';
import { build } from 'esbuild';
import { paths } from './path';
import { esbuildDepPlugin } from './esbuildDepPlugin';

export async function optmize(opts: { pkgs: string[] }) {
  const deps = opts.pkgs.reduce(
    (memo, pkg) => {
      // TODO: 优先解析包的 esm 文件
      memo[pkg] = resolve.sync(pkg, {
        basedir: paths.appDir,
      });
      return memo;
    },
    {} as Record<string, string>,
  );

  await build({
    entryPoints: opts.pkgs,
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    splitting: true,
    sourcemap: true,
    outdir: paths.cache,
    treeShaking: true,
    metafile: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
    plugins: [esbuildDepPlugin(deps)],
  });
}
