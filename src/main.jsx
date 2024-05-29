import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import { AuthContext } from './context/authContext';

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

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState([]);

  const auth = {
    accessToken,
    setAccessToken,
  };

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
