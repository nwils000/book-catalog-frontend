import '../styles/login.css';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext.js';
import LandingPageNavBar from './LandingPageNavBar.jsx';

export default function Login() {
  const { auth } = useContext(AuthContext);

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  useEffect(() => {
    if (passwordHidden) {
      setPasswordType('password');
    } else {
      setPasswordType('text');
    }
  }, [passwordHidden]);

  return (
    <>
      <LandingPageNavBar />
      <div className="login">
        <div></div>
        <h1>
          Login<span>.</span>
        </h1>
        <p>
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
        <div className="login-input-wrapper">
          <div className="label-input-wrapper" style={{ position: 'relative' }}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="JDizzy-7"
            />
          </div>
          <div className="label-input-wrapper" style={{ position: 'relative' }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={passwordType}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="m#P52s@ap$V"
            />
            {passwordHidden ? (
              <div className="eye" onClick={() => setPasswordHidden(false)}>
                <FaEyeSlash />
              </div>
            ) : (
              <div className="eye" onClick={() => setPasswordHidden(true)}>
                <FaEye />
              </div>
            )}
          </div>
          <Link to="/employee-dashboard" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}