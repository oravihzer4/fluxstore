import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const AdminDashboard: FunctionComponent = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 p-4 bg-light">
            <div className="d-flex align-items-center mb-4 gap-3">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 70, height: 70 }}
              >
                <i className="fa-solid fa-crown fa-2x"></i>
              </div>
              <div>
                <h2 className="mb-0 fw-bold text-dark">Admin Dashboard</h2>
                <p className=" mb-0">Welcome, manage your store efficiently</p>
              </div>
            </div>
            <hr />
            <div className="row g-4">
              <div className="col-md-4">
                <Link
                  to="/adminManage/adminProducts"
                  className="text-decoration-none"
                >
                  <div className="card h-100 border-0 shadow-sm admin-card-hover">
                    <div className="card-body text-center">
                      <i className="fa-solid fa-box-open fa-2x text-primary mb-2"></i>
                      <h5 className="fw-bold mb-2">Products</h5>
                      <p className="">
                        Add, edit, or remove products from your store.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link
                  to="/adminManage/adminUsers"
                  className="text-decoration-none"
                >
                  <div className="card h-100 border-0 shadow-sm admin-card-hover">
                    <div className="card-body text-center">
                      <i className="fa-solid fa-users fa-2x text-secondary mb-2"></i>
                      <h5 className="fw-bold mb-2">Users</h5>
                      <p className="">
                        View and manage registered users and permissions.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link
                  to="/adminManage/adminOrders"
                  className="text-decoration-none"
                >
                  <div className="card h-100 border-0 shadow-sm admin-card-hover">
                    <div className="card-body text-center">
                      <i className="fa-solid fa-file-invoice-dollar fa-2x text-success mb-2"></i>
                      <h5 className="fw-bold mb-2">Orders</h5>
                      <p className="">
                        Track, process, and manage customer orders.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .admin-card-hover:hover {
          box-shadow: 0 0 0.75rem 0.1rem #0d6efd33;
          transform: translateY(-2px) scale(1.03);
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
