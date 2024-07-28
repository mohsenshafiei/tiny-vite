const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

export const HMR_HEADER = 'vite-hmr';
export const paths = {
  projectRoot,
  // Files
  htmlSrc: path.resolve(projectRoot, 'example/index.html'),
  clientSDKSrc: path.resolve(projectRoot, 'src/client.ts'),
  entryPointSrc: path.resolve(projectRoot, 'src/index.tsx'),
  typescriptConfigSrc: path.resolve(projectRoot, 'tsconfig.json'),

  // Values
  cache: path.join(path.resolve(projectRoot, 'example'), 'src', '.cache'),

  // Directories
  srcDir: path.resolve(projectRoot, 'src'),
  distDir: path.resolve(projectRoot, 'dist'),
  appDir: path.resolve(projectRoot, 'example'),
};
