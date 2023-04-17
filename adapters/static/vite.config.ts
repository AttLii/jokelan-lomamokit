import * as dotenv from 'dotenv'
dotenv.config()
import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';
import { transformStringTranslations } from '../../src/plugins/transformStringTranslations';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['@qwik-city-plan'],
      },
    },
    plugins: [
      staticAdapter({
        origin: (process.env.VITE_ORIGIN || ""),
      }),
      transformStringTranslations(),
    ],
  };
});
