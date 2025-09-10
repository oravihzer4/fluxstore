import type { FunctionComponent } from "react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  const { items, cartTotal, clearCart } = useCart();

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    clearCart();
  };

  const DEFAULT_IMAGE =
    "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8 text-center">
          <div className="d-flex flex-column align-items-center mb-3">
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{ width: 70, height: 70 }}
            >
              <i className="fa-solid fa-credit-card fa-2x"></i>
            </div>
            <h2 className="fw-bold mb-1">Checkout</h2>
            <p className="lead  mb-0">
              Review your order and place it securely.
            </p>
          </div>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center ">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-outline-dark mt-3">
            Back to Shop
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {items.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.id}>
                <div className="card h-100 border-0 shadow-lg checkout-card-hover rounded-4">
                  <img
                    src={
                      typeof (item.image as any) === "object"
                        ? (item.image as any)?.url || DEFAULT_IMAGE
                        : item.image || DEFAULT_IMAGE
                    }
                    className="card-img-top rounded-4"
                    alt={
                      typeof (item.image as any) === "object"
                        ? (item.image as any)?.alt || item.title
                        : item.title
                    }
                    style={{ height: "120px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-2">{item.title}</h5>
                    <p className=" mb-1">
                      Price: ${Number(item.price).toFixed(2)}
                    </p>
                    <p className=" mb-2">Quantity: {item.quantity}</p>
                    <p className="mt-auto fw-bold">
                      Total: ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-top pt-3 d-flex justify-content-between align-items-center">
            <h4>Total:</h4>
            <h4>${cartTotal.toFixed(2)}</h4>
          </div>
          <div className="text-end mt-4">
            <button className="btn btn-success px-4" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
      <style>{`
        .checkout-card-hover:hover {
          box-shadow: 0 0 0.75rem 0.1rem #0d6efd33;
          transform: translateY(-2px) scale(1.03);
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
