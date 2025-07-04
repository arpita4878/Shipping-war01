import './Footer.css'

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid bg-light text-dark mt-5 py-5 px-sm-3 px-md-5">
        <div className="row pt-5">
          <div className="col-lg-7 col-md-6">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h3 className="text-primary mb-4 fw-bold">Get In Touch</h3>
                <p><i className="fa fa-map-marker-alt me-2 text-primary"></i> Clerk Colony, INDORE</p>
                <p><i className="fa fa-phone-alt me-2 text-primary"></i>xxxx xxx xxx</p>
                <p><i className="fa fa-envelope me-2 text-primary"></i>info@example.com</p>
                <div className="d-flex gap-3 mt-4">
                  <a className="btn btn-outline-primary btn-social " href="#"><i className="fab fa-twitter" ></i></a>
                  <a className="btn btn-outline-primary btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-outline-primary btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a className="btn btn-outline-primary btn-social" href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h3 className="text-primary mb-4 fw-bold">Quick Links</h3>
                <div className="d-flex flex-column gap-2">
                  <a className="text-dark text-decoration-none link-hover" href="#"><i className="fa fa-angle-right me-2"></i>Home</a>
                  <a className="text-dark text-decoration-none link-hover" href="#"><i className="fa fa-angle-right me-2"></i>About Us</a>
                  <a className="text-dark text-decoration-none link-hover" href="#"><i className="fa fa-angle-right me-2"></i>Our Services</a>
                  <a className="text-dark text-decoration-none link-hover" href="#"><i className="fa fa-angle-right me-2"></i>Register</a>
                  <a className="text-dark text-decoration-none link-hover" href="#"><i className="fa fa-angle-right me-2"></i>Contact Us</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 mb-5">
            <h3 className="text-primary mb-4 fw-bold">Newsletter</h3>
            <p>Subscribe to our newsletter for the latest updates, offers, and news.</p>
            <div className="w-100">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control border-primary"
                  style={{ padding: "18px" }}
                  placeholder="Your Email Address"
                />
                <button className="btn btn-primary px-4">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{ borderColor: "#3E3E4E" }}>
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-md-start mb-3 mb-md-0">
            <p className="m-0 small">
              &copy; {new Date().getFullYear()} <a href="#" className="text-primary text-decoration-none fw-bold">Shipping War</a>. All Rights Reserved. Designed by <a href="#" className="text-primary text-decoration-none fw-bold">Shipping War</a>
            </p>
          </div>
          <div className="col-lg-6 text-center text-md-end">
            <ul className="nav justify-content-center justify-content-md-end gap-3">
              <li className="nav-item">
                <a className="nav-link text-white small px-2 link-hover" href="#">Privacy</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white small px-2 link-hover" href="#">Terms</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white small px-2 link-hover" href="#">FAQs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white small px-2 link-hover" href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}

export default Footer;
