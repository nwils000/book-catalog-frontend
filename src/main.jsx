import React from 'react';
import { useState, useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './styles/index.css';
import ReactDOM from 'react-dom/client';
import ErrorPage from './components/ErrorPage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import { AuthContext } from './context/authContext';
import { UserInfoContext } from './context/userInfoContext';
import { AllBooksContext } from './context/allBooksContext';

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function ProtectedUserDashboard({ children }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  if (!auth.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/user-dashboard',
        element: (
          <ProtectedUserDashboard>
            <UserDashboard />
          </ProtectedUserDashboard>
        ),
      },
    ],
  },
]);

const AllBooksContextProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState('');

  const books = {
    allBooks,
    setAllBooks,
  };

  return (
    <AllBooksContext.Provider value={{ books }}>
      {children}
    </AllBooksContext.Provider>
  );
};

const UserInfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState('');
  const [username, setUsername] = useState('');

  const info = {
    userInfo,
    setUserInfo,
    username,
    setUsername,
  };

  return (
    <UserInfoContext.Provider value={{ info }}>
      {children}
    </UserInfoContext.Provider>
  );
};

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  const auth = {
    accessToken,
    setAccessToken,
  };

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AllBooksContextProvider>
    <UserInfoContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </UserInfoContextProvider>
  </AllBooksContextProvider>
);
