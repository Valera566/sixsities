import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {mockOfferData} from './mock/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={mockOfferData} />
  </React.StrictMode>
);

