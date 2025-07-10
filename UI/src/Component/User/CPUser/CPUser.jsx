import './CPUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL';

function CPAdmin() {
  const navigate = useNavigate();
  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setConfirmNewPassword] = useState('');
  const [output, setOutput] = useState('');

 const handlesubmit = () => {
  const email = localStorage.getItem("email");

  axios.get(__userapiurl + "fetch", {
    params: { email, password: currentpassword }
  }).then(() => {
    if (newpassword === confirmnewpassword) {
      const update_details = {
        condition_obj: { email },
        content_obj: { password: newpassword }
      };
      axios.patch(__userapiurl + "update", update_details)
        .then(() => {
          // Clear local storage or any auth tokens here if needed
          localStorage.clear();  // logout by clearing localStorage
          // Redirect to logout or login page
          navigate("/logout", { replace: true }); // replace to prevent going back
        });
    } else {
      setOutput("New and Confirm new password do not match");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }).catch(() => {
    setOutput("Invalid old password, please try again");
    setCurrentPassword("");
  });
};

  return (
    <div className="container py-5 bg-light min-vh-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

          {/* Output message */}
          {output && (
            <div className="alert alert-danger text-center fw-semibold" role="alert">
              {output}
            </div>
          )}

          <h2 className="mb-4 text-center fw-bold text-primary">
            Change <span className="text-secondary">Password</span> here!
          </h2>

          <form>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg rounded-pill border border-secondary"
                placeholder="Current Password"
                value={currentpassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg rounded-pill border border-secondary"
                placeholder="New Password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="form-control form-control-lg rounded-pill border border-secondary"
                placeholder="Confirm New Password"
                value={confirmnewpassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              onClick={handlesubmit}
              className="btn btn-primary w-100 btn-lg fw-bold rounded-pill shadow-sm btn-hover"
            >
              Change Password
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default CPAdmin;
