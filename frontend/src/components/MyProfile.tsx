import type { FunctionComponent } from "react";

interface MyProfileProps {}

const MyProfile: FunctionComponent<MyProfileProps> = () => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("x-auth-token");
      window.location.href = "/";
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-sm rounded-4 p-4">
            <div className="d-flex flex-column align-items-center text-center mb-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                className="rounded-circle border mb-2"
                alt="Profile"
                width="100"
                height="100"
              />
              <h4 className="mb-0">User Name</h4>
              <p className="text-muted">email@example.com</p>
            </div>

            <hr />

            <div className="mb-4">
              <h5 className="mb-3">Shipping Address</h5>
              <div className="bg-light p-3 rounded-3">
                <p className="mb-1">
                  <strong>Address:</strong> 123 Herzl St, Tel Aviv, Israel
                </p>
                <p className="mb-1">
                  <strong>Zip Code:</strong> 678901
                </p>
                <p className="mb-1">
                  <strong>Phone:</strong> +972-50-1234567
                </p>
                <button className="btn btn-outline-primary btn-sm mt-2">
                  Edit Shipping Info
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="mb-3">Account Information</h5>
              <div className="bg-light p-3 rounded-3">
                <p className="mb-1">
                  <strong>Username:</strong> user.name123
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> email@example.com
                </p>
                <p className="mb-1">
                  <strong>Joined:</strong> Jan 1, 2024
                </p>
                <button className="btn btn-outline-secondary btn-sm mt-2">
                  Edit Account Info
                </button>
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
