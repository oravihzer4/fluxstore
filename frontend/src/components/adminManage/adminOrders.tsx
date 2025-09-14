import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AdminOrdersProps {}

const AdminOrders: FunctionComponent<AdminOrdersProps> = () => {
  return (
    <>
      <div className="container text-center">
        <h3 className="p-4 m-4 text-danger">Soon .. </h3>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Link to="/adminDashboard" className="btn btn-outline-primary">
          Back to Admin Dashboard
        </Link>
      </div>
    </>
  );
};

export default AdminOrders;
