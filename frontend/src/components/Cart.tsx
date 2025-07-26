import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { items, removeItem, updateQty, clearCart, cartTotal } = useCart();

  const isLoggedIn = Boolean(localStorage.getItem("x-auth-token"));

  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center">
        <h3>You have to register to buy something, you know...</h3>
        <Link to="/register" className="btn btn-primary mt-3">
          Register Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container my-4">
        <h2 className="mb-4 text-center">Your Cart</h2>
        {items.length === 0 ? (
          <p className="text-center text-muted">
            <p>
              Your cart is empty. Add some amazing gaming gear to get started!
            </p>
            <br />
            <br />
            <Link to="/" className="text-dark">
              <h4>Continue Shopping</h4>
            </Link>
          </p>
        ) : (
          <>
            <div className="list-group mb-3">
              {items.map((item) => (
                <div
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.id}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <h6>{item.title}</h6>
                      <small>${Number(item.price).toFixed(2)}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQty(item.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h4>Total: ${cartTotal.toFixed(2)}</h4>
              <div className="d-flex gap-2">
                <Link to="/checkout" className="btn btn-primary">
                  Checkout
                </Link>
                <button className="btn btn-danger" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ height: "300px" }}></div>
    </>
  );
};

export default Cart;
