# What Vite Does

Vite is a modern build tool that provides a fast development environment by leveraging native `ES Modules` and `esbuild` for fast dependency pre-bundling.

Here's a detailed look at how Vite operates:

Key Features of Vite are:

### Instant Server Start:

Vite starts the `development server almost instantly` regardless of the size of the application because it serves the source files over native ES Modules, which are supported by modern browsers.

### On-Demand Compilation:

Vite compiles your code on-demand as you navigate your application. `This means it only processes the files that are actually requested by the browser, which leads to much faster initial load times and efficient updates`.

### Hot Module Replacement (HMR):

Vite provides a highly efficient `Hot Module Replacement (HMR)` out of the box.

This means that when you make changes to your code, Vite only updates the parts of the module that changed, without needing a full page reload, providing a seamless development experience. Optimized Production Build:

For `production, Vite uses Rollup to bundle your code`. Rollup is an advanced module bundler that performs tree-shaking and other optimizations to ensure your final build is as efficient as possible. Dependency Pre-Bundling:

Vite uses esbuild to pre-bundle dependencies. Esbuild is an extremely fast bundler written in Go. This step helps to resolve CommonJS and UMD modules into ESM format, which ensures compatibility and significantly speeds up the development server.

## How Vite Works

### Development Mode Native ESM Support:

Vite serves files as native ES Modules directly to the browser. This is possible because modern browsers support ESM natively, which allows for instant module resolution without the need for a bundling step during development.

### File Watching:

Vite watches your source files for changes. When a file is modified, Vite only recompiles that specific file and updates the browser using HMR, providing a near-instant feedback loop.

### ESBuild for Dependencies:

During development, Vite uses esbuild to pre-bundle dependencies. This ensures that large dependencies are loaded quickly and efficiently.

### Production Mode Bundling with Rollup:

When you build your project for production, Vite uses Rollup to bundle your application. Rollup performs advanced optimizations such as tree-shaking (removing unused code) and code splitting (splitting your code into smaller chunks that can be loaded on demand).

### Optimizations:

Vite applies several optimizations to your production build, including `minification`, `chunk splitting`, and more, to ensure that your application loads quickly and performs well.

## What Are the things that we need to create Tiny Vite:

- Create instant Dev server: we can use express to do it
- File watching: We can use chokidar watch directory and trigger events
- HMR: We can use sockets to inform updates in browser. to do this we create the client.ts sdk and will pass it to client and then we start informing updates using sockets
- We need mount http middleware for route registration
- We need to initialize module graph
- initialize plugin system to support different file formats
- We need to perform deps optimizer (this is to pre bundle the 3rd party deps so you have a fast dev experiences) so if you check the package.json and run `npm run optimize` it uses esbuild to take build of third party modules
- In reality Vite perform pre-compiling to minify and compile third party dependencies into js upfront and this is the main reason that vite is fast
- On demand compilation: transpile and minify modules (ts, tsx, jsx, css-modules, etc) on demand using esbuild
- Wait for browser `import` requests
- Production Build with Rollup
- Production Build: Minification, Chunk Splitting, Removing Unused Code

### How to use

First you need install dev dependencies

```bash
npm i
```

Then run

```bash
npm start
```

Enjoy tiny-vite with a simple HMR support.

## Challenges with Vite

- When you are working in an enterprise company with 6000 modules. There will be a Network bottleneck of unbundled ESM during dev
- Esbuild challenges are:
  - Limited chunk control
  - Difficult to customize and extend
- Rollup challenges are:

  - slow build speed compared to native
  - Limited chunk split control compared to webpack
  - No module federation support

- Using the current architecture of Vite makes bundling behaviour inconsistent (Mostly for mixed ESM/CJS deps)

- There are also pipeline inefficiency: multiple parse -> transform -> codegen passes across differnt toolchains
- Vite is creating rolldown -> the rust bundler for vite to remove relience on any other tool
- Features that rolldown is going to support:
  - Built-in transform (TS, JSX, Target Lowering)
  - Built-in minification
  - Built-in Node + TS Compatible resolution
  - Output modes:
    - Library mode (esm w/ scope hoisting a la Rollup / esbuild)
    - App mode (advanced chunk splitting, module federation)
