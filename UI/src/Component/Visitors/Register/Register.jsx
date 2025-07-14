import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};

    if (!name) newError.name = 'Full name is required';
    if (!email) newError.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Invalid email address';

    if (!mobile) newError.mobile = 'Mobile number is required';
    else if (!/^[0-9]{10}$/.test(mobile)) newError.mobile = 'Mobile must be 10 digits';

    if (!city) newError.city = 'City is required';
    if (!address) newError.address = 'Address is required';
    if (!gender) newError.gender = 'Gender is required';
    if (!password) newError.password = 'Password is required';

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const userDetails = { name, email, mobile, city, address, gender, password };

    axios.post(__userapiurl + 'save', userDetails)
      .then(() => {
        setOutput('✅ Registered successfully!');
        setName('');
        setEmail('');
        setMobile('');
        setCity('');
        setAddress('');
        setGender('');
        setPassword('');
        setError({});
      })
      .catch(() => setOutput('❌ Registration failed. Try again.'));
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Your Shipping Profile</h2>

        {output && (
          <div className={`alert ${output.includes('success') ? 'alert-success' : 'alert-danger'} output-message`}>
            {output}
          </div>
        )}

        <form className="register-form" onSubmit={e => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className={`form-control ${error.name ? 'is-invalid' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
              {error.name && <div className="invalid-feedback">{error.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={`form-control ${error.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
              />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                type="text"
                className={`form-control ${error.mobile ? 'is-invalid' : ''}`}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="1234567890"
              />
              {error.mobile && <div className="invalid-feedback">{error.mobile}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={`form-control ${error.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
              {error.password && <div className="invalid-feedback">{error.password}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <select
                id="city"
                className={`form-select ${error.city ? 'is-invalid' : ''}`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select city</option>
                <optgroup label="Madhya Pradesh">
                  <option value="Indore">Indore</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Ujjain">Ujjain</option>
                </optgroup>
                <optgroup label="Maharashtra">
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Nasik">Nasik</option>
                </optgroup>
              </select>
              {error.city && <div className="invalid-feedback">{error.city}</div>}
            </div>

            <div className="form-group gender-group">
              <label>Gender</label>
              <div className="gender-options">
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male">Male</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              {error.gender && <div className="invalid-feedback d-block">{error.gender}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              rows="3"
              className={`form-control ${error.address ? 'is-invalid' : ''}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street, City, State"
            />
            {error.address && <div className="invalid-feedback">{error.address}</div>}
          </div>

          <button
            type="button"
            className="btn btn-primary w-100 mt-4"
            onClick={handleSubmit}
          >
            Register Now
          </button>

          <p className="text-center mt-3">
            Already registered?{' '}
            <Link to="/login" className="link-login">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
