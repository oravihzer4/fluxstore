import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface AdminOrdersProps {}

const AdminOrders: FunctionComponent<AdminOrdersProps> = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    const token = localStorage.getItem("x-auth-token");
    axios
      .get(`${import.meta.env.VITE_API_BASE}orders`, {
        headers: { "x-auth-token": token || "" },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.response?.data || "Failed to fetch orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Orders</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-info">
              <tr>
                <th>User Name</th>
                <th>Address</th>
                <th>Order Date</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id || idx}>
                  <td>
                    {order.userName && typeof order.userName === "object"
                      ? [
                          order.userName.first,
                          order.userName.middle,
                          order.userName.last,
                        ]
                          .filter(Boolean)
                          .join(" ")
                      : order.userName || "-"}
                  </td>
                  <td>{order.userAddress}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <ul className="mb-0">
                      {order.items.map((item: any, i: number) => (
                        <li key={i}>
                          {item.title} x{item.quantity} (${item.price})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="d-flex justify-content-center mt-5">
        <Link to="/adminDashboard" className="btn btn-outline-primary">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminOrders;
