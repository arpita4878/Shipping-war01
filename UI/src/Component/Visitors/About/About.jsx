import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-down">
            <h2 className="text-uppercase text-dark fw-bold">About Us</h2>
            <p className="lead text-secondary">
              Empowering Businesses with Smart, Transparent & Fast Freight Solutions
            </p>
          </div>

          <div className="row g-5">
            {/* Who We Are */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="p-4 border bg-white h-100 shadow-sm rounded">
                <h4 className="fw-bold text-primary">Who We Are</h4>
                <p className="text-dark">
                  We are a tech-driven freight logistics platform connecting manufacturers, traders, and businesses with reliable transporters. Our solution simplifies and accelerates the movement of goods through a smart bidding system and real-time digital tools.
                </p>
              </div>
            </div>

            {/* What We Offer */}
            <div className="col-lg-6" data-aos="fade-left">
              <div className="p-4 border bg-white h-100 shadow-sm rounded">
                <h4 className="fw-bold text-success">What We Offer</h4>
                <p className="text-dark">
                  From instant load listing and competitive bids to tracking and delivery insights — our platform ensures fast, secure, and cost-effective freight management for businesses of all sizes, especially SMEs and MSMEs.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="p-4 border bg-white h-100 shadow-sm rounded">
                <h4 className="fw-bold text-warning">Our Vision</h4>
                <p className="text-dark">
                  To revolutionize logistics by eliminating inefficiencies, bringing transparency to freight pricing, and giving every transporter a fair chance through real-time auctions and digital collaboration.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="col-lg-6" data-aos="fade-left">
              <div className="p-4 border bg-white h-100 shadow-sm rounded">
                <h4 className="fw-bold text-danger">Why Choose Us</h4>
                <ul className="text-dark">
                  <li>✔ Spot-based freight booking with real-time bidding</li>
                  <li>✔ Trusted network of verified transporters</li>
                  <li>✔ Transparent pricing with no hidden costs</li>
                  <li>✔ Easy-to-use platform for both clients and carriers</li>
                  <li>✔ Data-driven decisions with tracking & insights</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="mt-5 text-center" data-aos="zoom-in">
            <h5 className="fw-bold text-dark">Join us to move your goods smarter, faster, and more reliably than ever before.</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
