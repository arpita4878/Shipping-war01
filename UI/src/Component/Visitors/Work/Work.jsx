import './Work.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Work() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
    <div className="container-fluid py-5 bg-light">
  <div className="container">
    <div className="text-center mb-5">
      <h1 className="text-dark" data-aos="fade-down">HOW IT WORKS</h1>
    </div>

    <div className="row g-4">
      {/* Step 1 */}
      <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
        <div className="card h-100 shadow-lg border-0 rounded-4">
          <img
            src="/assests/img/consignment.jpg"
            alt="Book Consignment"
            className="card-img-top rounded-top-4"
            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">1. Book Consignment</h5>
            <p className="card-text small">
              List your shipment details in minutes through our simple online form.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
        <div className="card h-100 shadow-lg border-0 rounded-4">
          <img
            src="/assests/img/Bidding.jpg"
            alt="Start Bidding"
            className="card-img-top rounded-top-4"
            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">2. Start Bidding</h5>
            <p className="card-text small">
              Verified transporters place bids. Choose the best offer instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
        <div className="card h-100 shadow-lg border-0 rounded-4">
          <img
            src="/assests/img/payment.jpg"
            alt="Make Payment"
            className="card-img-top rounded-top-4"
            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">3. Make Payment</h5>
            <p className="card-text small">
              Secure your booking with transparent and easy online payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Work;
