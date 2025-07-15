import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import MarketingAssetsTranslator from './ui/MarketingAssetsTranslator';
import Document from './ui/Document';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <MarketingAssetsTranslator />
      {/* <Document /> */}
    </div>
  </StrictMode>,
);
