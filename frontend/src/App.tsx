import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout"; // ✅ הוספנו את Checkout
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
          path="/checkout" // ✅ הוספנו את ה-Route הזה
          element={
            <FadePage>
              <Checkout />
            </FadePage>
          }
        />
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

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastContainer />
        <Navbar />
        <AppContent />
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
