
import './services.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
    
      {/* Services Start */}
      <div className="container-fluid bg-dark pt-5">
        <div className="container">
          <div className="text-center pb-2">
            {/* <h5 className="text-primary text-uppercase font-weight-bold">Our Services</h5> */}
            <div className="block-heading-1">
              <h1 className="text-primary" data-aos="fade-down">
                What We Offer
              </h1><br />
              <p className="text-light" data-aos="fade-up" data-aos-delay="200">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div><br /><br /><br />
          <div className="row pb-3">
           

            <div className="col-lg-4 col-md-6 text-center mb-5" data-aos="fade-up" data-aos-delay="200">
              <div className="d-flex align-items-center p-5 border shadow-sm justify-content-center bg-light mb-4 p-4">
                <div className="block__35630">
                  <div className="icon mb-0">
                    <span className="flaticon-box"></span>
                  </div>
                  <h3 className="mb-3 text-primary">Packaging</h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5" data-aos="fade-up" data-aos-delay="300">
              <div className="d-flex align-items-center p-5 border shadow-sm justify-content-center bg-light mb-4 p-4">
                <div className="block__35630">
                  <div className="icon mb-0">
                    <span className="flaticon-lorry"></span>
                  </div>
                  <h3 className="mb-3 text-primary">Trucking</h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5" data-aos="fade-up" data-aos-delay="400">
              <div className="d-flex align-items-center p-5 border shadow-sm justify-content-center bg-light mb-4 p-4">
                <div className="block__35630">
                  <div className="icon mb-0">
                    <span className="flaticon-warehouse"></span>
                  </div>
                  <h3 className="mb-3 text-primary">Warehouse</h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            </div>

            

         
          </div>
        </div>
      </div><br /><br />
      {/* Services End */}
    </>
  );
}

export default Services;
