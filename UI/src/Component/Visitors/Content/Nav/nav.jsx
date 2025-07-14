import { Link } from 'react-router-dom';
import './nav.css'
import { useEffect, useState } from 'react';
import Auth from '../../../Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function Nav() {

  const [Nav, setNav] = useState()

  useEffect(() => {

    setInterval(() => {

      if (localStorage.getItem("token") != undefined && localStorage.getItem("role") == "admin") {
        setNav(
          <div className="container-fluid bg-dark p-0">
            <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3">
              {/* Logo */}
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <h1 className="m-0 text-uppercase text-primary fw-bold">
                  <i className="fa fa-truck me-2"></i>Shipping War
                </h1>
              </Link>

              {/* Toggle for mobile */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse">
                <span><i className="fa fa-bars"></i></span>
              </button>


              {/* Nav links */}
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mx-auto text-center">

                  <Link
                    to="/admin"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>

                     Home
                  </Link>

                  <Link
                    to="/manageuser"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>
                    Manage User
                  </Link>

                  <div className="nav-item dropdown px-3">
                    <a

                      className="nav-link dropdown-toggle fw-bold text-light"
                      data-bs-toggle="dropdown"
                      role="button" >
                      Manage Category
                    </a>
                    <div className="dropdown-menu border-5 shadow-sm mt-2">
                      <Link className="dropdown-item custom-dropdown-link" to="/addcategory">Add Category</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/addsubcategory">Add SubCategory</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/updatecategory">Update Category</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/updatesubcategory">Update Sub Category</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/manageproduct">Manage  Producut</Link>

                    </div>
                  </div>






                  {/* Dropdown */}
                  <div className="nav-item dropdown px-3">
                    <a

                      className="nav-link dropdown-toggle fw-bold text-light"
                      data-bs-toggle="dropdown"
                      role="button" >
                      Settings
                    </a>
                    <div className="dropdown-menu border-5 shadow-sm mt-2">
                      <Link className="dropdown-item custom-dropdown-link" to="/epadmin">Edit Profile</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/cpadmin">Change password</Link>

                    </div>
                  </div>

                </div>


                <Link
                  to="/logout"
                  className="btn btn-primary  px-5 py-2 rounded-pill shadow-sm fw-bold" >
                  Log out
                </Link>
              </div>
            </nav>
          </div>
        )
      }



      else if (localStorage.getItem("token") != undefined && localStorage.getItem("role") == "user") {
        setNav(
          <div className="container-fluid bg-dark p-0">
            <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3">
              {/* Logo */}
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <h1 className="m-0 text-uppercase text-primary fw-bold">
                  <i className="fa fa-truck me-2"></i>Shipping War
                </h1>
              </Link>

              {/* Toggle for mobile */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse" >

                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Nav links */}
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mx-auto text-center">
                  <Link
                    to="/user"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>

                    Home
                  </Link>

                  <Link
                    to="/search"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>

                    Search
                  </Link>

                  <Link
                    to="/availableproduct"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>

                    Products
                  </Link>

                  <div className="nav-item dropdown px-3">
                    <a

                      className="nav-link dropdown-toggle fw-bold text-light"
                      data-bs-toggle="dropdown"
                      role="button" >
                      Manage Product
                    </a>
                    <div className="dropdown-menu border-5 shadow-sm mt-2">
                      <Link className="dropdown-item custom-dropdown-link" to="/addproduct">Add Product</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/myproduct">My Product</Link>

                    </div>
                  </div>

                  {/* dropdown */}
                  <div className="nav-item dropdown px-3">
                    <a

                      className="nav-link dropdown-toggle fw-bold text-light"
                      data-bs-toggle="dropdown"
                      role="button" >
                      Settings
                    </a>
                    <div className="dropdown-menu border-5 shadow-sm mt-2">
                      <Link className="dropdown-item custom-dropdown-link" to="/epuser">Edit Profile</Link>
                      <Link className="dropdown-item custom-dropdown-link" to="/cpuser">Change password</Link>

                    </div>
                  </div>


                </div>
                <br />
                {/* Login Button */}
                <Link
                  to="/logout"
                  className="btn btn-primary px-5 py-2 rounded-pill shadow-sm fw-bold" >

                  Log out
                </Link>
              </div>
            </nav>
          </div>
        )
      }



      else {
        setNav(
          <div className="container-fluid bg-dark p-0">
            <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3">
              {/* Logo */}
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <h1 className="m-0 text-uppercase text-primary fw-bold">
                  <i className="fa fa-truck me-2"></i>Shipping War
                </h1>
              </Link>

              {/* Toggle for mobile */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse" >

                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Nav links */}
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mx-auto text-center">
                  <Link
                    to="/"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>

                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }} >

                    About
                  </Link>

                  <Link
                    to="/register"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }}>

                    Register
                  </Link>


                  <Link
                    to="/contact"
                    className="nav-item nav-link px-3 py-2 fw-bold text-light transition"
                    style={{ transition: 'all 0.3s' }} >

                    Contact
                  </Link>
                </div>
                <br />
                {/* Login Button */}
                <Link
                  to="/login"
                  className="btn btn-primary px-5 py-2 rounded-pill shadow-sm fw-bold" >

                  Log In
                </Link>
              </div>
            </nav>
          </div>
        )


      }
    }, 1)
  }, [])


  return (
    <>

      {<Auth />}

      {Nav}

    </>
  );
}

export default Nav;
