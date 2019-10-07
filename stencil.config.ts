import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalScript: 'src/global.ts',
  outputTargets: [{
    type: 'www',
    serviceWorker: null
  }],
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
  // bundles: [
  //   { components: ['app-shell', 'app-header', 'app-menu'] }
  // ],
};
