import './Login.css';
import { useEffect, useState } from 'react';
import { __userapiurl } from '../../../API_URL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [captchaText, setCaptchaText] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newError = {};
    if (!email) newError.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Invalid email format';

    if (!password) newError.password = 'Password is required';
    if (!userInputCaptcha) newError.captchaError = 'Captcha required';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const generateCaptcha = (length = 5) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInputCaptcha('');
    setCaptchaError('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (userInputCaptcha !== captchaText) {
      setCaptchaError('Captcha does not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(__userapiurl + 'login', { email, password });
      const user = response.data.userDetails;

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('mobile', user.mobile);
      localStorage.setItem('address', user.address);
      localStorage.setItem('city', user.city);
      localStorage.setItem('gender', user.gender);
      localStorage.setItem('role', user.role);
      localStorage.setItem('info', user.info);

      setTimeout(() => {
        navigate(user.role === 'admin' ? '/admin' : '/user');
      }, 1500); // wait for animation
    } catch (err) {
      setOutput('Invalid email or password.');
      refreshCaptcha();
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card rounded shadow-lg p-5">
        <h2 className="text-center mb-4 text-primary">Login to Shipping War</h2>
        {output && <div className="alert alert-danger text-center">{output}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className={`form-control ${error.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <div className="invalid-feedback">{error.email}</div>}
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <div className="password-input d-flex align-items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${error.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {error.password && <div className="invalid-feedback d-block">{error.password}</div>}
          </div>

          <div className="form-group mb-4">
            <label>Captcha</label>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="captcha-text">{captchaText}</div>
              <i
                className="fa fa-sync-alt text-primary fs-5 cursor-pointer"
                title="Refresh Captcha"
                onClick={refreshCaptcha}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter captcha here"
              value={userInputCaptcha}
              onChange={(e) => setUserInputCaptcha(e.target.value)}
            />
            {captchaError && <small className="text-danger">{captchaError}</small>}
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-100 py-2 fw-semibold truck-btn ${loading ? 'loading' : ''}`}
          >
            {!loading ? (
              <>
                <span className="truck-icon">🚚</span> Log In <span className="arrow">&rarr;</span>
              </>
            ) : (
              <span className="loading-truck">🚚 Logging in...</span>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <small className="text-muted">New to Shipping? <a href="/register">Register here</a></small>
        </div>
      </div>
    </div>
  );
}

export default Login;
