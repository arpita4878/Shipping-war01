import './Admin.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Admin() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            {/* Image with scale hover & fade-right animation */}
            {/* <div
              className="col-lg-5 pb-4 pb-lg-0 position-relative about-image-wrapper"
              data-aos="fade-right"
            >
              <img
                src="/assests/img/about.jpg"
                alt="About us"
                className="img-fluid rounded shadow-lg about-image"
              />
              <div className="bg-primary text-dark text-center p-4 mt-3 rounded shadow-sm">
                <h3 className="m-0 fw-bold">New Innovative Approach</h3>
              </div>
            </div> */}

            {/* Text with fade-left animation */}
            <div className="col-lg-12" data-aos="fade-left">
              <h2 className="text-primary text-uppercase fw-bold mb-3">
                Welcome to Admin Pannel
              </h2>
              <h1 className="mb-4 text-light fw-bold">
                Trusted & Faster <span className="text-primary">Shipping Service</span> Provider
              </h1>
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
    </>
  );
}

export default Admin;
