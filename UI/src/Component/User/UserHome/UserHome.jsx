import './UserHome.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserHome() {
  const [name, setName] = useState('User');

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    // Get user name from localStorage
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="container-fluid py-5 bg-light text-dark">
      <div className="container">
        <div className="row align-items-center">
          {/* Welcome Section */}
          <div className="col-lg-12 text-center" data-aos="fade-up">
            <h2 className="text-uppercase text-primary fw-bold mb-3">
              Welcome, {name}!
            </h2>
            <h1 className="mb-4 fw-bold">
              Your Trusted Partner in <span className="text-primary">Fast & Transparent Shipping</span>
            </h1>
            <p className="mb-4 fs-5">
              We connect you with a network of verified transporters to simplify your freight process with speed, transparency, and full visibility.
            </p>
            <p className="mb-4 fs-6 fst-italic">
              Say goodbye to hidden costs and delays — start managing your shipments smarter today.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex justify-content-center gap-3" data-aos="zoom-in">
            <Link to='/addproduct'>  <button className="btn btn-primary px-4 py-2">
                Start Booking
              </button></Link>
              <button className="btn btn-outline-secondary px-4 py-2" title="Learn about features">
                Learn More
              </button>
            </div>
          </div>

          {/* Optional image or illustration */}
          {/* <div className="col-lg-6 mt-5" data-aos="fade-left">
            <img
              src="/assets/img/shipping-illustration.png"
              alt="Shipping Illustration"
              className="img-fluid rounded shadow"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
