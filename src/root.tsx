import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/RouterHead';

import './global.css';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <RouterHead />
        <meta charSet="utf-8" />
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
