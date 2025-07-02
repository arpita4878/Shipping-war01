import './Register.css';
import { useState } from 'react';
import axios from 'axios'
import { __userapiurl } from '../../../API_URL';

function Register() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState()
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [output , setOutput]=useState()
  const [error , setError] = useState({});


  const validate=()=>{
    const newError={}

    if(!name)  newError.name='Name is required';

    if(!email)  newError.email='Email is required';
     else if (!/\S+@\S+\.\S+/.test(email)) newError.email='Invalid email format';

    if(!mobile)  newError.mobile='Mobile is required';
   else if (!/^[0-9]{10}$/.test(mobile)) newError.mobile = 'Mobile must be 10 digits only';

    if(!city)  newError.city='City is required';

    if(!address)  newError.address='Address is required';

    if(!gender)  newError.gender='Gender is required';

    setError(newError)

    return Object.keys(newError).length==0

  }


  const handleSubmit = () => { 
    
    if(!validate()) return;
    
    const userDetails = { "name":name, "email":email, "mobile":mobile, "address":address,"gender": gender,"city": city };
   // console.log("User Details:", userDetails);

    axios.post(__userapiurl+'save',userDetails).then(()=>{

        // Clear fields
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setCity("");
        setGender("");
        setOutput("User Register Successfully")
    }).catch(()=>{
      setOutput("User Regsitration Failed")
    })
  };

  return (
   
    <div className="container-fluid py-5 bg-dark min-vh-100" id='registration-box'>
  <div className="container " >
    <div className="row justify-content-center ">
      <h1 className="mb-2 text-light fw-bold text-center">
        Create Profile here!!!
      </h1>

       <h1 className="mb-3 text-light fw-bold text-center">
        {output}       </h1>

      <div className="col-lg-8">
        <div className="card shadow-lg border-0 p-4 rounded-4 text-dark fw-bold ">
         
          <form>
            <div className="row mb-3 ">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
               {error.name && <small className='text-danger fw-bold'>{error.name}</small>}
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  
                  onChange={(e) => setEmail(e.target.value)} />
               {error.email && <small className='text-danger fw-bold'>{error.email}</small>}
              </div>
               
            </div>

            

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)} />
               {error.mobile && <small className='text-danger fw-bold'>{error.mobile}</small>}
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)} >
               
                  <optgroup label="Madhya Pradesh">
                    <option>Indore</option>
                    <option>Bhopal</option>
                    <option>Ujjain</option>
                  </optgroup>
                  <optgroup label="Maharashtra">
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Nasik</option>
                  </optgroup>
                </select>
                {error.city && <small className='text-danger fw-bold'>{error.city}</small>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                rows="4"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)} ></textarea>
             {error.address && <small className='text-danger fw-bold'>{error.address}</small>}
            </div>
<br />
            <div className="mb-4">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender == "male"}
                  onChange={(e) => setGender(e.target.value)} />
               
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender == "female"}
                  onChange={(e) => setGender(e.target.value)} />
               
                <label className="form-check-label">Female</label>
             
              </div><br />
                 {error.gender && <small className='text-danger fw-bold'>{error.gender}</small>}
            </div>

            <button type="button" className="btn btn-warning w-100" onClick={handleSubmit}>
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Register;
