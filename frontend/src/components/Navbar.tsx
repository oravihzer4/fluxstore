import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const FluxNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("user");

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      setIsLoggedIn(true);
      const storedName = localStorage.getItem("user-name");
      setUserName(storedName ?? "user");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="px-3 position-sticky top-0 shadow-sm"
      style={{ zIndex: 1030 }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-1"
        >
          <i className="fa-brands fa-slack fa-spin m-1 opacity-75 "></i>
          <span> flux.</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="text-center gap-2 mx-auto">
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>

            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/register" className="text-primary">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="text-success">
                  Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/myprofile" className="text-dark">
                My Profile
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center gap-2">
          {isLoggedIn && (
            <Link
              to="/myprofile"
              className="text-success text-decoration-none d-flex align-items-center gap-1"
            >
              <span>hi, {userName}</span>
              <i className="fa-solid fa-earth-americas wave p-1"></i>
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default FluxNavbar;
