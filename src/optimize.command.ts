import { optmize } from './optimize';

(async () => {
  await optmize({
    pkgs: ['react', 'react-dom/client'],
  });
})();
