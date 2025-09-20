import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  setAdmin,
  updateUser,
} from "../../Services/userService";
import type { User } from "../../interfaces/users/User";

const AdminUsers: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const fetchUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to fetch users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data || "Failed to delete user");
    }
  };

  const handleSetAdmin = async (id: string, isAdmin: boolean) => {
    try {
      await setAdmin(id, isAdmin);
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data || "Failed to update admin status");
    }
  };

  const handleEdit = (user: any) => {
    setEditUserId(user._id);
    setEditData({
      ...user,
      name: {
        first: user.name?.first || "",
        middle: user.name?.middle || "",
        last: user.name?.last || "",
      },
      address: {
        street: user.address?.street || "",
        houseNumber: user.address?.houseNumber || 0,
        city: user.address?.city || "",
        country: user.address?.country || "",
        zip: user.address?.zip || 0,
        state: user.address?.state || "",
      },
      image: {
        url: user.image?.url || "",
        alt: user.image?.alt || "",
      },
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => {
      const newData = { ...prev };
      if (["first", "middle", "last"].includes(name)) {
        newData.name = {
          ...newData.name,
          first: newData.name?.first ?? "",
          middle: newData.name?.middle ?? "",
          last: newData.name?.last ?? "",
          [name]: value,
        };
      } else if (
        ["street", "houseNumber", "city", "country", "zip", "state"].includes(
          name
        )
      ) {
        newData.address = {
          ...newData.address,
          street: newData.address?.street ?? "",
          houseNumber: newData.address?.houseNumber ?? 0,
          city: newData.address?.city ?? "",
          country: newData.address?.country ?? "",
          zip: newData.address?.zip ?? 0,
          state: newData.address?.state ?? "",
          [name]:
            name === "houseNumber" || name === "zip" ? Number(value) : value,
        };
      } else if (["url", "alt"].includes(name)) {
        newData.image = {
          ...newData.image,
          url: newData.image?.url ?? "",
          alt: newData.image?.alt ?? "",
          [name]: value,
        };
      } else {
        (newData as any)[name] = value;
      }
      return newData;
    });
  };

  const handleEditSave = async (id: string) => {
    try {
      await updateUser(id, editData);
      setEditUserId(null);
      setEditData({});
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data || "Failed to update user");
    }
  };

  const handleEditCancel = () => {
    setEditUserId(null);
    setEditData({});
  };

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || idx}>
                  {editUserId === user._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="first"
                          value={editData.name?.first || ""}
                          onChange={handleEditChange}
                          placeholder="First Name"
                          title="First name of the user"
                        />
                        <input
                          type="text"
                          name="middle"
                          value={editData.name?.middle || ""}
                          onChange={handleEditChange}
                          placeholder="Middle Name (optional)"
                          title="Middle name of the user"
                        />
                        <input
                          type="text"
                          name="last"
                          value={editData.name?.last || ""}
                          onChange={handleEditChange}
                          placeholder="Last Name"
                          title="Last name of the user"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editData.email || ""}
                          onChange={handleEditChange}
                          placeholder="Email"
                          title="User email address"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone || ""}
                          onChange={handleEditChange}
                          placeholder="Phone"
                          title="User phone number"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="street"
                          value={editData.address?.street || ""}
                          onChange={handleEditChange}
                          placeholder="Street"
                          title="Street address"
                        />
                        <input
                          type="number"
                          name="houseNumber"
                          value={editData.address?.houseNumber || ""}
                          onChange={handleEditChange}
                          placeholder="House Number"
                          title="House number"
                        />
                        <input
                          type="text"
                          name="city"
                          value={editData.address?.city || ""}
                          onChange={handleEditChange}
                          placeholder="City"
                          title="City"
                        />
                        <input
                          type="text"
                          name="country"
                          value={editData.address?.country || ""}
                          onChange={handleEditChange}
                          placeholder="Country"
                          title="Country"
                        />
                        <input
                          type="number"
                          name="zip"
                          value={editData.address?.zip || ""}
                          onChange={handleEditChange}
                          placeholder="Zip"
                          title="Zip code"
                        />
                        <input
                          type="text"
                          name="state"
                          value={editData.address?.state || ""}
                          onChange={handleEditChange}
                          placeholder="State (optional)"
                          title="State"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="url"
                          value={editData.image?.url || ""}
                          onChange={handleEditChange}
                          placeholder="Image URL"
                          title="Image URL"
                        />
                        <input
                          type="text"
                          name="alt"
                          value={editData.image?.alt || ""}
                          onChange={handleEditChange}
                          placeholder="Image Alt Text (optional)"
                          title="Image alt text"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleEditSave(user._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
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
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        <button
                          className={`btn btn-${
                            user.isAdmin ? "secondary" : "primary"
                          } btn-sm`}
                          onClick={() =>
                            handleSetAdmin(user._id, !user.isAdmin)
                          }
                        >
                          {user.isAdmin ? "Remove Admin" : "Make Admin"}
                        </button>
                      </td>
                    </>
                  )}
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
