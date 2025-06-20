import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Document from './ui/Document';
import Subtitle from './ui/Subtitle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <Subtitle />
    </div>
  </StrictMode>,
);
