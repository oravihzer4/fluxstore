import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const About: FunctionComponent = () => {
  return (
    <footer className="bg-light text-light pt-5 pb-4 mt-5 ">
      <div className="container m">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-dark ">flux.</h4>
            <p className="text-muted">
              Next-generation gaming accessories for the modern gamer. Elevate
              your setup with cutting-edge technology.
            </p>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="fw-bold mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Keyboards
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Gaming Mice
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Headsets
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Components
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="fw-bold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/contact" className="text-dark text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Connect</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-dark fs-5" aria-label="Discord">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="text-dark fs-5" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-dark fs-5" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-dark fs-5" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted">
          © {new Date().getFullYear()} flux. All Rights Reserved.
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </footer>
  );
};

export default About;
