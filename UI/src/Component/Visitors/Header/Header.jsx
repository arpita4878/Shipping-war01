import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    AOS.refresh();
  }, []);

  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingId.trim() === '') {
      alert('Please enter a Tracking ID');
      return;
    }
    navigate(`/track/${trackingId.trim()}`);
  };

  return (
    <div
      className="jumbotron jumbotron-fluid bg-dark text-center mb-5 position-relative"
      style={{ minHeight: '90vh' }}
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
              className="form-control border-0 py-3 px-3"
              placeholder="Enter Tracking ID"
              style={{
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                fontSize: '1rem',
                minWidth: '0', // important for flexbox shrinking on mobile
              }}
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button
              className="btn btn-primary px-3 px-sm-4"
              style={{
                borderTopRightRadius: '30px',
                borderBottomRightRadius: '30px',
                fontSize: '1rem',
                minWidth: '100px',
              }}
              onClick={handleTrack}
            >
              Track &amp; Trace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
