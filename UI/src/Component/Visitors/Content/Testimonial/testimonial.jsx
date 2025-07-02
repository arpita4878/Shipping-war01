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
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center pb-4" data-aos="fade-down">
            <h4 className="text-primary text-uppercase font-weight-bold">
              Testimonial
            </h4>
            <h1 className="mb-4 text-light">Our Clients Say</h1>
          </div>
          <div className="testimonial-carousel d-flex  justify-content-center flex-wrap">
           
           
           

            <div
              className="position-relative p-4 rounded shadow testimonial-card"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ maxWidth: "350px", backgroundColor: "#444", color: "#eee", marginBottom: "30px" }}
            >
              <i
                className="fa fa-3x fa-quote-right text-primary position-absolute"
                style={{ top: "-12px", right: "15px", opacity: 0.2 }}
              ></i>
              <div className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid rounded-circle"
                  src="/assests/img/vinay_bhaiya.jpg"
                  alt="Client 2"
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="ml-3">
                  <h6 className="font-weight-semi-bold m-0" style={{ color: "#eee" }}>
                   Vinay Rajput
                  </h6>
                  <small style={{ color: "#ccc" }}>- Senior Manager</small>
                </div>
              </div>
              <p className="m-0" style={{ color: "#eee" }}>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr clita lorem. Dolor ipsum sanct clita.
              </p>
            </div>
           
           
           
            <div
              className="position-relative  p-4 rounded shadow testimonial-card"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{ maxWidth: "350px", backgroundColor: "#444", color: "#eee", marginBottom: "30px" }}
            >
              <i
                className="fa fa-3x fa-quote-right text-primary position-absolute"
                style={{ top: "-12px", right: "15px", opacity: 0.2 }}
              ></i>
              <div className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid rounded-circle"
                  src="/assests/img/gurjeet.jpg"
                  alt="Client 1"
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="ml-3">
                  <h6 className="font-weight-semi-bold m-0" style={{ color: "#eee" }}>
                   Gurjeet Singh 
                  </h6>
                  <small style={{ color: "#ccc" }}>- Businessman</small>
                </div>
              </div>
              <p className="m-0" style={{ color: "#eee" }}>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr clita lorem. Dolor ipsum sanct clita.
              </p>
            </div>


          
            <div
              className="position-relative p-4 rounded shadow testimonial-card"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ maxWidth: "350px", backgroundColor: "#444", color: "#eee", marginBottom: "30px" }}
            >
              <i
                className="fa fa-3x fa-quote-right text-primary position-absolute"
                style={{ top: "-12px", right: "15px", opacity: 0.2 }}
              ></i>
              <div className="d-flex align-items-center mb-3">
                <img
                  className="img-fluid rounded-circle"
                  src="/assests/img/arpita.jpg"
                  alt="Client 2"
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="ml-3">
                  <h6 className="font-weight-semi-bold m-0" style={{ color: "#eee" }}>
                   Arpita
                  </h6>
                  <small style={{ color: "#ccc" }}>-</small>
                </div>
              </div>
              <p className="m-0" style={{ color: "#eee" }}>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr clita lorem. Dolor ipsum sanct clita.
              </p>
            </div>

            

          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
