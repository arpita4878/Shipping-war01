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
        <br />
        <div className="container">
          <div className="row align-items-center">
            {/* Image with scale hover & fade-right animation */}
          

            {/* Text with fade-left animation */}
           <br /><br />
            <div className="col-lg-12" data-aos="fade-left">
               <center>
              <h2 className="text-dark  text-uppercase fw-bold mb-3">
                About Us
              </h2>
              </center>
              <br />
              <h1 className="mb-4 ml-5 text-dark fw-bold">
                Trusted & Faster Shipping Service Provider
              </h1>
              <p className="mb-4 text-dark   ml-5 fs-5">
                Am voluptatum? Laudantium  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga laboriosam suscipit sunt culpa fugit ad praesentium similique iste, a velit. quis totam saepe, repellat velit suscipit aperiam ducimus alias? Voluptatibus voluptatum voluptate placeat a, earum sit corrupti. Voluptatem modi  
              </p>
             
            </div>
          </div>
        </div>
        <br /><br />
      </div>
    </>
  );
}

export default About;
