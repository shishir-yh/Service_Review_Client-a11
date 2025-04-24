import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/router.jsx';
import Authprovider from './Components/Authprovider/Authprovider.jsx';
import DarkModeProvider from './Components/DarkMode/DarkModeContext.jsx'; // 🔥 import korben

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider> {/* 🌓 DarkModeProvider দিয়ে wrap করলেন */}
      <Authprovider router={<RouterProvider router={router} />} />
    </DarkModeProvider>
  </StrictMode>
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { RouterProvider } from 'react-router-dom'
// import router from './Router/router.jsx'
// import Authprovider from './Components/Authprovider/Authprovider.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Authprovider router={<RouterProvider router={router}></RouterProvider>}>

//     </Authprovider>
//   </StrictMode>,
// )
