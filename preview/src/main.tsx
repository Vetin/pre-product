import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Dubbing from './ui/Dubbing';
import Subtitle from './ui/Subtitle';
import Document from './ui/Document';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <Document />
    </div>
  </StrictMode>,
);
