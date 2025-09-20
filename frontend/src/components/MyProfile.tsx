import type { User } from "../interfaces/users/User";
import { useState, useEffect } from "react";

const MyProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("x-auth-token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}users/me`,
          {
            headers: { "x-auth-token": token || "" },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("x-auth-token");
      window.location.href = "/";
    }
  };

  const openEditModal = () => {
    if (!user) return;
    setEditForm({
      name: {
        first: user.name.first,
        middle: user.name.middle || "",
        last: user.name.last,
      },
      email: user.email,
      phone: user.phone,
      image: {
        url: user.image?.url || "",
        alt: user.image?.alt || "",
      },
      address: {
        street: user.address.street,
        houseNumber: user.address.houseNumber,
        city: user.address.city,
        country: user.address.country,
        zip: user.address.zip,
        state: user.address.state || "",
      },
    });
    setShowEdit(true);
    setEditError(null);
  };

  const closeEditModal = () => {
    setShowEdit(false);
    setEditError(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => {
      const newForm = { ...prev };
      if (["first", "middle", "last"].includes(name)) {
        newForm.name = {
          first: name === "first" ? value : newForm.name?.first || "",
          middle: name === "middle" ? value : newForm.name?.middle || "",
          last: name === "last" ? value : newForm.name?.last || "",
        };
      } else if (
        ["street", "houseNumber", "city", "country", "zip", "state"].includes(
          name
        )
      ) {
        newForm.address = {
          street: name === "street" ? value : newForm.address?.street || "",
          houseNumber:
            name === "houseNumber"
              ? Number(value)
              : newForm.address?.houseNumber || 0,
          city: name === "city" ? value : newForm.address?.city || "",
          country: name === "country" ? value : newForm.address?.country || "",
          zip: name === "zip" ? Number(value) : newForm.address?.zip || 0,
          state: name === "state" ? value : newForm.address?.state || "",
        };
      } else if (["url", "alt"].includes(name)) {
        newForm.image = {
          url: name === "url" ? value : newForm.image?.url || "",
          alt: name === "alt" ? value : newForm.image?.alt || "",
        };
      } else {
        (newForm as any)[name] = value;
      }
      return newForm;
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const token = localStorage.getItem("x-auth-token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token || "",
          },
          body: JSON.stringify(editForm),
        }
      );
      if (!response.ok) throw new Error("Failed to update profile");
      const updated = await response.json();
      setUser(updated);
      setShowEdit(false);
    } catch (err: any) {
      setEditError(err.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading profile...</div>;
  }
  if (!user) {
    return (
      <div className="text-center py-5 text-danger">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-4 p-4 bg-light">
            <div className="d-flex align-items-center gap-4 mb-4">
              <img
                src={
                  user.image?.url ||
                  "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                }
                alt={user.image?.alt || "Profile"}
                className="rounded-circle border border-2 border-primary"
                style={{ width: 90, height: 90, objectFit: "cover" }}
              />
              <div>
                <h2 className="mb-0 fw-bold text-dark">
                  {user.name.first} {user.name.middle} {user.name.last}
                </h2>
                <p className="mb-0 text-muted">
                  Member since{" "}
                  {(user as any).createdAt
                    ? new Date((user as any).createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-2">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong> {user.phone}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2">
                  <strong>Address:</strong> {user.address.street}{" "}
                  {user.address.houseNumber}, {user.address.city},{" "}
                  {user.address.country}
                </div>
                <div className="mb-2">
                  <strong>Zip:</strong> {user.address.zip}
                </div>
                <div className="mb-2">
                  <strong>State:</strong> {user.address.state || "-"}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-primary px-4"
                onClick={openEditModal}
              >
                Edit Profile
              </button>
              <button className="btn btn-danger px-4" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ background: "#0008" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeEditModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {editError && (
                    <div className="alert alert-danger">{editError}</div>
                  )}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first"
                        value={editForm.name?.first || ""}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last"
                        value={editForm.name?.last || ""}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Middle Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="middle"
                        value={editForm.name?.middle || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={editForm.email || ""}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={editForm.phone || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="url"
                        value={editForm.image?.url || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Image Alt</label>
                      <input
                        type="text"
                        className="form-control"
                        name="alt"
                        value={editForm.image?.alt || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Street</label>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={editForm.address?.street || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">House Number</label>
                      <input
                        type="number"
                        className="form-control"
                        name="houseNumber"
                        value={editForm.address?.houseNumber || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={editForm.address?.city || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={editForm.address?.country || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Zip</label>
                      <input
                        type="number"
                        className="form-control"
                        name="zip"
                        value={editForm.address?.zip || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={editForm.address?.state || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeEditModal}
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={editLoading}
                  >
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .profile-card-hover:hover {
          box-shadow: 0 0 0.75rem 0.1rem #0d6efd33;
          transform: translateY(-2px) scale(1.03);
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MyProfile;
