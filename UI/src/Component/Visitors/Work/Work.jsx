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
          <div className="block-heading-1">
            <center>
              <h1 className="text-dark" data-aos="fade-down">
                HOW IT WORKS
              </h1>
            </center>
            <br />
            {/* <p className="text-dark  ml-5" data-aos="fade-up" data-aos-delay="200">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
              </p> */}
            <br /><br />
          </div>
          <div className="row align-items-center">
            {/* Image with scale hover & fade-right animation */}
            <div
              className="col-lg-4 pb-4 pb-lg-0 position-relative about-image-wrapper"
              data-aos="fade-right"
            >
              <img
                src="/assests/img/consignment.jpg"
                alt="About us"
                className="img-fluid rounded shadow-lg about-image"
              />
              <br /><br />
              <div className="bg-primary text-white text-center p-4 mt-3 rounded shadow-sm">
                <h4 className="m-0 fw-bold">1. Book Consignment</h4>
                <p className="mb-0 small">List your shipment details in minutes through our simple online form.</p>
              </div>

            </div>

            <div
              className="col-lg-4 pb-4 pb-lg-0 position-relative about-image-wrapper"
              data-aos="fade-right"
            >
              <img
                src="/assests/img/Bidding.jpg"
                alt="About us"
                className="img-fluid rounded shadow-lg about-image"
              /> <br /><br />
              <div className="bg-primary text-white text-center p-4 mt-3 rounded shadow-sm">
                <h4 className="m-0 fw-bold">2. Start Bidding</h4>
                <p className="mb-0 small">Verified transporters place bids. Choose the best offer instantly.</p>
              </div>

            </div>

            <div
              className="col-lg-4 pb-4 pb-lg-0 position-relative about-image-wrapper"
              data-aos="fade-right"
            >
              <img
                src="/assests/img/payment.jpg"
                alt="About us"
                className="img-fluid rounded shadow-lg about-image"
              /> <br /><br />
              <div className="bg-primary text-white text-center p-4 mt-3 rounded shadow-sm">
                <h4 className="m-0 fw-bold">3. Make Payment</h4>
                <p className="mb-0 small">Secure your booking with transparent and easy online payment.</p>
              </div>

            </div>


          </div>
        </div>
        <br /><br />
      </div>

    </>
  );
}

export default Work;
