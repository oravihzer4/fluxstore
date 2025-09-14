import { useEffect, useState } from "react";
import type { FunctionComponent } from "react";

interface MyProfileProps {}

interface UserData {
  name: string;
  email: string;
  username: string;
  joined: string;
  address: string;
  zipCode: string;
  phone: string;
  imageUrl?: string;
}

const MyProfile: FunctionComponent<MyProfileProps> = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("x-auth-token");

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}users/me`,
          {
            headers: {
              "x-auth-token": token || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();

        // Map backend user object to UserData interface
        setUser({
          name: `${data.name?.first || ""} ${data.name?.last || ""}`,
          email: data.email,
          username: `${data.name?.first || ""}.${data.name?.last || ""}`,
          joined: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString()
            : "",
          address: `${data.address?.street || ""} ${
            data.address?.houseNumber || ""
          }, ${data.address?.city || ""}, ${data.address?.country || ""}`,
          zipCode: data.address?.zipCode || "",
          phone: data.phone || "",
          imageUrl:
            data.image?.url ||
            "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("x-auth-token");
      window.location.href = "/";
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
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-2 p-4 bg-light">
            <div className="d-flex align-items-center mb-4 gap-3">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="rounded-circle border border-2 border-primary"
                style={{ width: 70, height: 70, objectFit: "cover" }}
              />
              <div>
                <h2 className="mb-0 fw-bold text-dark">My Profile</h2>
                <p className=" mb-0">Hi, {user.name}!</p>
              </div>
            </div>
            <hr />
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm profile-card-hover">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">Account Information</h5>
                    <p className="mb-1">
                      <strong>Username:</strong> {user.username}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="mb-1">
                      <strong>Joined:</strong> {user.joined}
                    </p>
                    <button className="btn btn-outline-secondary btn-sm mt-2">
                      Edit Account Info
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm profile-card-hover">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">Shipping Address</h5>
                    <p className="mb-1">
                      <strong>Address:</strong> {user.address}
                    </p>
                    <p className="mb-1">
                      <strong>Zip Code:</strong> {user.zipCode}
                    </p>
                    <p className="mb-1">
                      <strong>Phone:</strong> {user.phone}
                    </p>
                    <button className="btn btn-outline-primary btn-sm mt-2">
                      Edit Shipping Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-danger px-4" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
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
