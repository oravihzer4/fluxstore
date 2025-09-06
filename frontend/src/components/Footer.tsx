import type { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./About";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      setShowBanner(true);
    }
  }, []);

  const handleRegisterClick = () => {
    setShowBanner(false);
    navigate("/register");
  };

  return (
    <>
      {showBanner && (
        <div
          className="position-fixed bottom-0 end-0 mb-5 me-3 bg-light shadow rounded px-4 py-2 d-flex align-items-center justify-content-between gap-3"
          style={{ zIndex: 1050, width: "340px" }}
        >
          <div className="d-flex flex-column">
            <span className="fw-semibold text-dark">Not our friend yet?</span>
            <small className="text-muted">
              No account, no loot — sign up and start collecting the best
            </small>
          </div>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      )}

      <footer className="bg-body-tertiary text-center fixed-bottom d-flex justify-content-around p-2">
        <div className="container d-flex justify-content-around gap-4">
          <Link to="/" className="text-dark text-decoration-none fw-medium">
            Home
          </Link>
          <Link to="/cart" className="text-dark text-decoration-none fw-medium">
            Cart
            <i className="fa-solid fa-cart-shopping p-1"></i>
          </Link>
        </div>
      </footer>

      <About />
    </>
  );
};

export default Footer;
