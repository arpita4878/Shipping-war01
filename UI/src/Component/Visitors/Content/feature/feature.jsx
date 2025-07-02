import './feature.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Feature() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            {/* Image with scale hover & fade-right animation */}
            <div
              className="col-lg-6 pb-4 pb-lg-0 position-relative about-image-wrapper"
              data-aos="fade-right">
            
              <img
                src="/assests/img/feature01.jpg"
                alt="About us"
                className="img-fluid rounded shadow-lg about-image" />
             
             
            </div> 

            {/* Text with fade-left animation */}
            <div className="col-lg-6  " data-aos="fade-left">
                <center>
              <h1 className="text-primary  fw-bold mb-3">
                Why Choose Us
              </h1>
              </center><br />
              <h3 className="mb-4 text-light fw-bold">
                Trusted & Faster Shipping Service Provider
              </h3>
              <p className="mb-4 text-light fs-5">
                Am voluptatum? Laudantium quis totam saepe, repellat velit suscipit aperiam ducimus alias? Voluptatibus voluptatum voluptate placeat a, earum sit corrupti. Voluptatem modi placeat facere ad ullam at, soluta, doloremque ducimus natus magnam laboriosam assumenda.
              </p>
              <p className="mb-4 text-light fs-6 fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquid necessitatibus corporis sint recusandae nihil soluta?
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid py-1 bg-light">
        <div className="container">
          <div className="row align-items-center">
            {/* Image with scale hover & fade-right animation */}
          

            {/* Text with fade-left animation */}
            <div className="col-lg-7  " data-aos="fade-left">
                <center>
              <h1 className="text-dark  fw-bold mb-3">
               Transporter Features
              </h1>
              </center>
              <br />
              <h3 className="mb-4 text-dark fw-bold">
                Trusted & Faste Shipping Service Provider
              </h3>
              <p className="mb-4 text-dark fs-5">
                Am voluptatum? Laudantium quis totam saepe, repellat velit suscipit aperiam ducimus alias? Voluptatibus voluptatum voluptate placeat a, earum sit corrupti. Voluptatem modi placeat facere ad ullam at, soluta, doloremque ducimus natus magnam laboriosam assumenda.
              </p>
              <p className="mb-4 text-dark fs-6 fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquid necessitatibus corporis sint recusandae nihil soluta?
              </p>
            </div>

              <div
              className="col-lg-5 pb-4 pb-lg-0 position-relative about-image-wrapper"
              data-aos="fade-right">
            
              <img
                src="/assests/img/feature02.jpg"
                alt="About us"
                className="img-fluid rounded shadow-lg about-image" />
             
             
            </div> 


          </div>
        </div>
      </div>
    </>
  );
}

export default Feature;
