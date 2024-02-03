import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import Welcome from './pages/Welcome.tsx';
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'


const router = createBrowserRouter([
  {
    path: "/home",
    element: <Welcome />
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
