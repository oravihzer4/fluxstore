import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import About from "./About";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <footer className="bg-body-tertiary text-center fixed-bottom d-flex justify-content-around p-2">
        <div className="container d-flex justify-content-around  gap-4">
          <Link to="/" className="text-dark text-decoration-none fw-medium">
            Home
          </Link>
          <Link to="/cart" className="text-dark text-decoration-none fw-medium">
            Cart
            <i className="fa-solid fa-cart-shopping p-1"> </i>
          </Link>
        </div>
      </footer>
      <About />
    </>
  );
};

export default Footer;
