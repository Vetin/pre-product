import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Dubbing from './ui/Dubbing';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <Dubbing />
    </div>
  </StrictMode>,
);
