import './Footer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <footer className="footer bg-dark text-light pt-5 px-3 px-md-5">
        <div className="row g-4">
          {/* Get In Touch */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <h5 className="text-primary fw-bold mb-4">Get In Touch</h5>
            <p><i className="fa fa-map-marker-alt me-2 text-primary"></i> Clerk Colony, INDORE</p>
            <p><i className="fa fa-phone-alt me-2 text-primary"></i> xxxx xxx xxx</p>
            <p><i className="fa fa-envelope me-2 text-primary"></i> info@example.com</p>
            <div className="d-flex gap-2 mt-3">
              <a className="btn btn-outline-light btn-sm rounded-circle" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-sm rounded-circle" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-sm rounded-circle" href="#"><i className="fab fa-linkedin-in"></i></a>
              <a className="btn btn-outline-light btn-sm rounded-circle" href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <h5 className="text-primary fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a className="text-light text-decoration-none d-block mb-2" href="#"><i className="fa fa-angle-right me-2"></i>Home</a></li>
              <li><a className="text-light text-decoration-none d-block mb-2" href="#"><i className="fa fa-angle-right me-2"></i>About Us</a></li>
              <li><a className="text-light text-decoration-none d-block mb-2" href="#"><i className="fa fa-angle-right me-2"></i>Services</a></li>
              <li><a className="text-light text-decoration-none d-block mb-2" href="#"><i className="fa fa-angle-right me-2"></i>Register</a></li>
              <li><a className="text-light text-decoration-none d-block" href="#"><i className="fa fa-angle-right me-2"></i>Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-5 col-md-12" data-aos="fade-left">
            <div className="newsletter-card p-4 rounded-4 shadow-lg">
              <h5 className="text-primary fw-bold mb-3">Newsletter</h5>
              <p className="text-light">Subscribe for updates, offers & news.</p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-transparent text-white border border-light"
                  placeholder="Your Email"
                />
                <button className="btn btn-primary px-4">Sign Up</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="row mt-5 border-top pt-4 small text-center text-md-start">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} <span className="text-primary fw-bold">Shipping War</span>. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end mt-2 mt-md-0">
            <a href="#" className="text-light text-decoration-none me-3">Privacy</a>
            <a href="#" className="text-light text-decoration-none me-3">Terms</a>
            <a href="#" className="text-light text-decoration-none me-3">FAQs</a>
            <a href="#" className="text-light text-decoration-none">Help</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
