import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";

const FluxNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("user");
  const [isAdmin, setIsAdmin] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch user info from /users/me
      import("axios").then((axios) => {
        axios.default
          .get(`${import.meta.env.VITE_API_BASE}users/me`, {
            headers: { "x-auth-token": token },
          })
          .then((res) => {
            const firstName = res.data?.name?.first || "user";
            setUserName(firstName);
            setIsAdmin(!!res.data?.isAdmin);
            localStorage.setItem("user-name", firstName);
          })
          .catch(() => {
            setUserName("user");
            setIsAdmin(false);
          });
      });
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Navbar
      expand="lg"
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      className={`px-3 position-sticky top-0 shadow-sm ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      style={{ zIndex: 1030 }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-1"
        >
          <i className="fa-solid fa-ghost fa-bounce m-1 opacity-75 "></i>
          <span> flux.</span>
        </Navbar.Brand>
        {isAdmin && (
          <Link
            to="/adminDashboard"
            className="btn btn-light btn-sm text-danger"
          >
            Admin Dashboard
          </Link>
        )}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav " className="justify-content-center">
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
        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn btn-sm bg-light rounded-circle shadow-sm ${
              darkMode ? "btn-light" : "btn-dark"
            }`}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className={`fa-solid ${
                darkMode ? "fa-sun " : "fa-moon text-dark"
              }`}
            ></i>
          </button>
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

// Add global dark mode styles
// TODO: Move global dark mode useEffect to App.tsx or a top-level component for proper application-wide effect.

export default FluxNavbar;
