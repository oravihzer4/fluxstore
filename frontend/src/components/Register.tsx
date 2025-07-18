import type { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik, type FormikValues } from "formik";
import { successMassage } from "../Services/FeedbackService";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  let navigate = useNavigate();
  const formik: FormikValues = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      imageUrl: "",
      isBusiness: false,
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      middleName: yup.string().optional(),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().required("Phone number is required"),
      address: yup.string().required("Address is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      imageUrl: yup.string().url("Invalid URL format").optional(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      navigate("/login");
      successMassage("Registration successful! You can now log in.");
    },
  });
  return (
    <>
      <div className="container">
        <form
          className="d-flex flex-column align-items-center justify-content-center p-5"
          onSubmit={formik.handleSubmit}
        >
          <h1>Register</h1>
          <div className="mb-3 w-50">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              autoComplete="off"
              name="firstName"
              required
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-danger">{formik.errors.firstName}</p>
            )}
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              className="form-control"
              id="middleName"
              autoComplete="off"
              name="middleName"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.middleName && formik.errors.middleName && (
              <p className="text-danger">{formik.errors.middleName}</p>
            )}
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              autoComplete="off"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-danger">{formik.errors.lastName}</p>
            )}
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="off"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="phone"
              className="form-control"
              id="phone"
              autoComplete="off"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              autoComplete="off"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <p className="opacity-50 ">
              By this order: "Street, House Number, City, State, Zip Code,
              Country"
            </p>
            {formik.touched.address && formik.errors.address && (
              <p className="text-danger">{formik.errors.address}</p>
            )}
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="off"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              autoComplete="off"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-danger">{formik.errors.confirmPassword}</p>
              )}
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="imageUrl" className="form-label">
              Profile Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="imageUrl"
              placeholder="https://example.com/your-image.jpg"
              name="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <p className="text-danger">{formik.errors.imageUrl}</p>
            )}
          </div>

          <div className="form-check mb-3 w-50">
            <input
              type="checkbox"
              className="form-check-input"
              id="isBusiness"
              name="isBusiness"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isBusiness}
            />
            {formik.touched.isBusiness && formik.errors.isBusiness && (
              <p className="text-danger">{formik.errors.isBusiness}</p>
            )}
            <label className="form-check-label" htmlFor="isBusiness">
              Business Account
            </label>
            <br />
            <br />
            <p className="text-secondary opacity-75">
              * Optional, check if you want to register as a business account
              for posting your own products.
            </p>
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>

          <br />
          <br />
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
