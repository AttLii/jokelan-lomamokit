import * as dotenv from 'dotenv'
dotenv.config()
import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

console.log('vite', (process.env.VITE_ORIGIN || ""))
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
    ],
  };
});
