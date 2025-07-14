import './UserHome.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserHome() {
  const [name, setName] = useState('User');

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const storedName = localStorage.getItem('name');
    if (storedName) setName(storedName);
  }, []);

  return (
    <div className="userhome-hero d-flex bg-dark align-items-center">
      <div className="container text-white text-center">
        <div className="glass-card mx-auto p-5" data-aos="zoom-in-up">
          <h2 className="fw-bold text-uppercase mb-3">Welcome, {name}!</h2>
          <h1 className="display-5 fw-bold mb-4">
            Transform Your Shipping with <span className="text-gradient">Bidding & Auctions</span>
          </h1>
          <p className="lead mb-3">
            Our platform connects shippers and transporters in a real-time bidding environment to ensure
            competitive pricing, efficient delivery, and transparency throughout the process.
          </p>
          <p className="fst-italic text-light mb-4">
            Save time. Cut costs. Gain control over your logistics like never before.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4" data-aos="fade-up">
            <Link to="/addproduct">
              <button className="btn btn-lg btn-light text-primary px-4 py-2 fw-semibold shadow">
                🚚 Add Product for Bidding
              </button>
            </Link>
            <Link to="/availableproduct">
              <button className="btn btn-lg btn-outline-light px-4 py-2 fw-semibold">
                📦 View Available Shipments
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="features mt-5 pt-5" data-aos="fade-up">
          <h3 className="text-white fw-bold mb-4">Why Choose Our Platform?</h3>
          <div className="row text-start text-light">
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 h-100">
                <h5>📈 Transparent Bidding</h5>
                <p className="mb-0">
                  Get the best deals by inviting multiple transporters to bid on your shipment. Highest bid wins.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 h-100">
                <h5>⏱️ Real-Time Auctions</h5>
                <p className="mb-0">
                  Set time-bound auctions for urgent shipments. Let transporters compete and optimize cost.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 h-100">
                <h5>📊 Smart Shipment Dashboard</h5>
                <p className="mb-0">
                  Track your products, bidding history, and allocations through your personal dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Callout */}
        <div className="mt-5 pt-5" data-aos="zoom-in">
          <p className=" text-light small">
            Ready to streamline your shipping operations? Join our growing network of smart shippers and verified transporters.
          </p>
        </div>
      </div>
    </div>
    
  );
}

export default UserHome;
