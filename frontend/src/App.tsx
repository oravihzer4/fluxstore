import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import Cart from "./components/Cart";
import Products from "./components/Products"; // ✅ Replace Home with Products
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />{" "}
          {/* ✅ Show products on home */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
