const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

export const paths = {
  projectRoot,
  // Files
  htmlSrc: path.resolve(projectRoot, 'example/index.html'),
  entryPointSrc: path.resolve(projectRoot, 'src/index.tsx'),
  typescriptConfigSrc: path.resolve(projectRoot, 'tsconfig.json'),

  // Directories
  srcDir: path.resolve(projectRoot, 'src'),
  distDir: path.resolve(projectRoot, 'dist'),
};
