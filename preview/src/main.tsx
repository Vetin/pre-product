import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './ui/Form';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ width: 800, margin: '0 auto' }}>
      <Form />
    </div>
  </StrictMode>,
);
