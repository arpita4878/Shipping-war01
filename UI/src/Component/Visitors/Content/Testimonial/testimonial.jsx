import "./testimonial.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Testimonial() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <div className="text-center pb-4" data-aos="fade-down">
            <h5 className="text-primary text-uppercase fw-bold">Testimonials</h5>
            <h2 className="text-dark">What Our Clients Say</h2>
          </div>

          <div className="row justify-content-center">
            {/* Testimonial 1 */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <i
                  className="fa fa-quote-right text-primary fa-2x float-end"
                  style={{ opacity: 0.2 }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assests/img/gurjeet.jpg"
                    alt="Client 1"
                    className="img-fluid rounded-circle me-3"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">Gurjeet Singh</h6>
                    <small className="text-muted">Businessman</small>
                  </div>
                </div>
                <p className="mb-0 text-secondary">
                  Reliable, transparent, and fast. The bidding system saved us time and money. Highly recommend their platform.
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <i
                  className="fa fa-quote-right text-primary fa-2x float-end"
                  style={{ opacity: 0.2 }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assests/img/vinay_bhaiya.jpg"
                    alt="Client 2"
                    className="img-fluid rounded-circle me-3"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">Vinay Rajput</h6>
                    <small className="text-muted">Senior Manager</small>
                  </div>
                </div>
                <p className="mb-0 text-secondary">
                  We’ve streamlined our logistics through their system. It’s easy to use and gives us access to verified transporters instantly.
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <i
                  className="fa fa-quote-right text-primary fa-2x float-end"
                  style={{ opacity: 0.2 }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/assests/img/arpita.jpg"
                    alt="Client 3"
                    className="img-fluid rounded-circle me-3"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">Arpita</h6>
                    <small className="text-muted">Client</small>
                  </div>
                </div>
                <p className="mb-0 text-secondary">
                  The service experience was smooth from booking to delivery. The real-time updates kept us informed at every step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
