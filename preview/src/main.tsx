import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import SubtitleTranslation from './ui/SubtitleTranslation';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <SubtitleTranslation />
    </div>
  </StrictMode>,
);
