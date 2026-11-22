import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// Built pages arrive pre-rendered: attach to the existing HTML. The dev server
// serves an empty #root, so render from scratch there.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
