import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const AdminDashboard: FunctionComponent = () => {
  return (
    <div className="container py-4">
      <h1>Admin Panel</h1>
      <div className="d-flex flex-column gap-3 mt-4">
        <Link to="/admin/products" className="btn btn-outline-primary">
          Manage Products
        </Link>
        <Link to="/admin/users" className="btn btn-outline-secondary">
          Manage Users
        </Link>
        <Link to="/admin/orders" className="btn btn-outline-success">
          Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
