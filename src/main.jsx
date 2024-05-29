import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './styles/index.css';

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
