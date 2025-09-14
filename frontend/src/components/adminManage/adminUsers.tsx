import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../Services/userService";
import type { User } from "../../interfaces/users/User";

const AdminUsers: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to fetch users");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Users</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>
                    {user.name.first}
                    {user.name.middle ? user.name.middle + " " : ""}
                    {user.name.last}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.address.street} {user.address.houseNumber},
                    {user.address.city}, {user.address.country}
                    {user.address.zip}
                  </td>
                  <td>
                    {user.image?.url ? (
                      <img
                        src={user.image.url}
                        alt={user.image.alt || "User"}
                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
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

export default AdminUsers;
