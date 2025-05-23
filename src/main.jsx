import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/router.jsx';
import Authprovider from './Components/Authprovider/Authprovider.jsx';
import DarkModeProvider from './Components/DarkMode/DarkModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <Authprovider router={<RouterProvider router={router} />} />
    </DarkModeProvider>
  </StrictMode>
);

