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

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Checkout</h2>

      {items.length === 0 ? (
        <div className="text-center text-muted">
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
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted mb-1">
                      Price: ${Number(item.price).toFixed(2)}
                    </p>
                    <p className="card-text text-muted mb-2">
                      Quantity: {item.quantity}
                    </p>
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
    </div>
  );
};

export default Checkout;
