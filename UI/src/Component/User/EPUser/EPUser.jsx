import './EPUser.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __userapiurl } from '../../../API_URL';
import { useNavigate } from 'react-router-dom';

function EPAdmin() {
  const [users, setUserDetails] = useState([])
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [gender, setGender] = useState();
  const [output, setOutput] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    axios.get(__userapiurl + "fetch", {
      params: { "email": email }
    }).then((response) => {
      const users = response.data[0]
      setName(users.name)
      setEmail(users.email)
      setMobile(users.mobile)
      setAddress(users.address)
      setCity(users.city);
      setGender(users.gender || '');
    }).catch((error) => {
      console.log(error);
    })

  }, [])

  const handleSubmit = () => {
    var update_details = {
      "condition_obj": { "email": email },
      "content_obj": { "name": name, "mobile": mobile, "address": address, "city": city, "gender": gender }
    }
    axios.patch(__userapiurl + "update", update_details).then((response) => {
      alert("User profile edited successfully")
      // optionally, you can navigate or update output here
    })
  }

  return (
    <>
      <div className="container-fluid py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <h1 className="mb-5 text-dark fw-bold text-center">
              Edit <span className="text-primary">Profile</span> here!!!
            </h1>

            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
              <div className="card shadow-sm border-0 p-4 rounded-4">
                <form>
                  <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                      <label htmlFor="name" className="form-label text-dark">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label text-dark">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        readOnly
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                      <label htmlFor="mobile" className="form-label text-dark">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="city" className="form-label text-dark">City</label>
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
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label text-dark">Address</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label d-block text-dark">Gender</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>

                  <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
                    Save Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EPAdmin;
