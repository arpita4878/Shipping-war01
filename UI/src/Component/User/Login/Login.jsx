import './Login.css';
import { useEffect, useState } from 'react';
import { __userapiurl } from '../../../API_URL';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
//import ReCAPTCHA from "react-google-recaptcha"

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [output, setOutput] = useState()
  const [type, setType] = useState('password')
  const [passwordText, setPasswordText] = useState("Show Password")
  const [error, setError] = useState({})
  const [captchaText, setCaptchaText] = useState();
  const [userInputCaptcha, setUserInputCaptcha] = useState();
  const [captchaError, setCaptchaError] = useState();



  //validations  
  const validate = () => {
    const newError = {}

    if (!email) newError.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Invalid email format';

    if (!password) newError.password = 'Password is required'

    setError(newError)

    return Object.keys(newError).length == 0
  };




  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return;

    if (userInputCaptcha !== captchaText) {
      setCaptchaError("captcha does not match")
      return;
    }

    const loginDetails = { "email": email, "password": password }

    // console.log("loginDetais:",loginDetails);

    axios.post(__userapiurl + "login", loginDetails).then((response) => {
      // console.log(response.data)
      const user = response.data.userDetails;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("mobile", user.mobile);
      localStorage.setItem("address", user.address);
      localStorage.setItem("city", user.city);
      localStorage.setItem("gender", user.gender);
      localStorage.setItem("role", user.role);
      localStorage.setItem("info", user.info);

      (user.role == "admin") ? navigate("/admin") : navigate("/user")

    }).catch((error) => {
      setEmail("");
      setPassword("");
      setUserInputCaptcha('')
      setCaptchaText(generateCaptcha());
      // if(recaptchaRef.current) recaptchaRef.current.reset();
      setOutput("Incorrect Email or Password ", error)
    });
  }


  //for  text show password or hide password
  const handleToggle = () => {
    if (type == 'password') {
      setType('text')
      setPasswordText('Hide Password')
    }
    else {
      setType('password')
      setPasswordText('Show Password')
    }
  }



  //captcha google

  // function onChange(value) {
  //   console.log("Captcha value:", value);
  //    setVerify(true); 

  // }

  //captcha number and alphabet
  const generateCaptcha = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result;
  }


  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, [])

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInputCaptcha('')
  }



  return (
    <>
      <div className="d-flex justify-content-center align-items-center   " style={{ minHeight: '40vh', paddingTop: '10px' }} id='login-box'>

        <div className="col-10 col-sm-8 col-md-6  mt-5 col-lg-4  ">

          <h2 style={{ color: "black" }}>{output}</h2>

          <div className="login-card ">

            <form >
              <h2 className="text-center text-dark mb-4">Login</h2>

              <div className="form-group mb-3">

                <input
                  type="email"
                  className="form-control p-3"
                  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {error.email && <small className='text-danger'>{error.email}</small>}
              </div>


              <div className="form-group mb-2">

                <input
                  type={type}
                  className="form-control p-3"
                  placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                {/* //checkbox show password hide password */}
                <input type="checkbox" className='mt-2 ml-1' onClick={handleToggle} /><label style={{ 'color': 'black', 'marginLeft': '5px' }}>{passwordText}</label>
                <br />
                {error.password && <small className='text-danger ' >{error.password}</small>}
              </div>



              {/* captcha */}
              {/* <div className='form-group mb-3'>
           <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange} />

                {error.captcha && <small className='text-danger'>{error.captcha}</small>}

            </div> */}


              {/* word number captcha */}
              <div className="form-group mb-3">

                <span style={{ fontSize: '28px', color: 'red', letterSpacing: '10px', textDecoration: 'line-through' }}>{captchaText}</span>&nbsp;&nbsp; <i class="fa fa-sync" style={{ color: 'black' }} onClick={refreshCaptcha}></i>

                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="Enter Captcha" value={userInputCaptcha} onChange={(e) => setUserInputCaptcha(e.target.value)} />
                <small className='text-danger'>{captchaError}</small>
              </div>



              <button
                className="btn btn-primary w-100 py-2"
                type="button" onClick={handleSubmit} >

                Log In
              </button>

            </form>

          </div>
          <br /><br />
        </div>

      </div>

    </>
  );
}

export default Login;




