import React from 'react';
import { useState, useContext, useEffect } from 'react';
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
  const [allBooks, setAllBooks] = useState(() => {
    return JSON.parse(localStorage.getItem('allBooks')) || '';
  });

  useEffect(() => {
    if (allBooks) {
      localStorage.setItem('allBooks', JSON.stringify(allBooks));
    } else {
      localStorage.removeItem('allBooks');
    }
  }, [allBooks]);

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
  const [userInfo, setUserInfo] = useState(() => {
    return JSON.parse(localStorage.getItem('userInfo')) || '';
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const [username, setUsername] = useState(() => {
    return JSON.parse(localStorage.getItem('username')) || '';
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', JSON.stringify(username));
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

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
  const [accessToken, setAccessToken] = useState(() => {
    return JSON.parse(localStorage.getItem('accessToken')) || '';
  });

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

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
