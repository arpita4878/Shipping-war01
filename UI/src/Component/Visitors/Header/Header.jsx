import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Header() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true }); // once: true animates only once
    AOS.refresh();
  }, []);

  return (
    <div
      className="jumbotron jumbotron-fluid bg-dark text-center mb-5 position-relative"
      style={{ minHeight: '90vh' }} // add height to enable scroll
    >
      <div className="container py-5">
        <h2 className="text-warning fw-bold" data-aos="fade-right">
          SHIPPING WAR
        </h2>

        <h1 className="text-light display-4 fw-bold mb-4" data-aos="zoom-in">
          Choose Your <span className="text-primary">Best Delivery</span>
        </h1>

        <div
          className="mx-auto"
          style={{ width: '100%', maxWidth: '500px' }}
          data-aos="fade-left"
        >
          <div className="input-group shadow-lg">
            <input
              type="text"
              className="form-control border-0 py-3 px-4"
              placeholder="Enter Tracking ID"
              style={{
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
              }}
            />
            <button
              className="btn btn-primary px-4"
              style={{
                borderTopRightRadius: '30px',
                borderBottomRightRadius: '30px',
              }}
            >
              Track & Trace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
