import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { createContext, useState, useEffect } from "react";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import AdminDashboard from "./components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Context/CartContext";
import { AnimatePresence } from "framer-motion";
import FadePage from "./components/FadePage";
import NotFound from "./components/NotFound";
import MyProfile from "./components/MyProfile";

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <FadePage>
              <Products />
            </FadePage>
          }
        />
        <Route
          path="/contact"
          element={
            <FadePage>
              <Contact />
            </FadePage>
          }
        />
        <Route
          path="/about"
          element={
            <FadePage>
              <About />
            </FadePage>
          }
        />
        <Route
          path="/cart"
          element={
            <FadePage>
              <Cart />
            </FadePage>
          }
        />
        <Route
          path="/checkout"
          element={
            <FadePage>
              <Checkout />
            </FadePage>
          }
        />
        <Route path="/adminDashboard" element={<AdminDashboard />} /> // Add
        route for AdminDashboard
        <Route
          path="/login"
          element={
            <FadePage>
              <Login />
            </FadePage>
          }
        />
        <Route
          path="/register"
          element={
            <FadePage>
              <Register />
            </FadePage>
          }
        />
        <Route
          path="myprofile"
          element={
            <FadePage>
              <MyProfile />
            </FadePage>
          }
        />
        <Route
          path="*"
          element={
            <FadePage>
              <NotFound />
            </FadePage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export const ThemeContext = createContext<{
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}>({ darkMode: false, setDarkMode: () => {} });

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    let style = document.getElementById("global-dark-mode-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "global-dark-mode-style";
      document.head.appendChild(style);
    }
    style.innerHTML = `
      body.dark-mode {
        background: #181a1b !important;
        color: #eaeaea !important;
      }
      body.dark-mode .card, body.dark-mode .navbar, body.dark-mode .dropdown-menu, body.dark-mode .form-control, body.dark-mode .form-select {
        background: #23272b !important;
        color: #eaeaea !important;
        border-color: #444 !important;
      }
      body.dark-mode .btn-dark, body.dark-mode .btn-outline-dark {
        background: #23272b !important;
        color: #eaeaea !important;
        border-color: #444 !important;
      }
      body.dark-mode .btn-light {
        background: #eaeaea !important;
        color: #23272b !important;
      }
      body.dark-mode .text-dark {
        color: #eaeaea !important;
      }
      body.dark-mode .text-light {
        color: #23272b !important;
      }
      body.dark-mode input, body.dark-mode select, body.dark-mode textarea {
        background: #23272b !important;
        color: #eaeaea !important;
        border-color: #444 !important;
      }
      body.dark-mode a {
        color: #90caf9 !important;
      }
    `;
    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <CartProvider>
        <Router>
          <ToastContainer />
          <Navbar />
          <AppContent />
          <Footer />
        </Router>
      </CartProvider>
    </ThemeContext.Provider>
  );
}

export default App;
