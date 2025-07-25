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
      address: {
        street: "",
        houseNumber: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
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
      address: yup.object({
        street: yup.string().required("Street is required"),
        houseNumber: yup.string().required("House number is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        zipCode: yup.string().required("Zip code is required"),
        country: yup.string().required("Country is required"),
      }),
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
    <div className="container">
      <form
        className="d-flex flex-column align-items-center justify-content-center p-5"
        onSubmit={formik.handleSubmit}
      >
        <h1>Register</h1>

        {/* First Name */}
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

        {/* Middle Name */}
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

        {/* Last Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Address */}
        <div className="mb-3 w-50">
          <label className="form-label">Address</label>
          <div className="row g-2">
            {[
              { label: "Street", name: "street" },
              { label: "House Number", name: "houseNumber" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Zip Code", name: "zipCode" },
              { label: "Country", name: "country" },
            ].map(({ label, name }) => (
              <div className="col-md-6" key={name}>
                <input
                  type="text"
                  name={`address.${name}`}
                  className="form-control"
                  placeholder={label}
                  value={formik.values.address[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.[name] &&
                  formik.errors.address?.[name] && (
                    <p className="text-danger">{formik.errors.address[name]}</p>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-danger">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Image URL */}
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

        {/* isBusiness */}
        <div className="form-check mb-3 w-50">
          <input
            type="checkbox"
            className="form-check-input"
            id="isBusiness"
            name="isBusiness"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.isBusiness}
          />
          <label className="form-check-label" htmlFor="isBusiness">
            Business Account
          </label>
          <p className="text-secondary opacity-75 mt-1">
            * Optional, check if you want to register as a business account for
            posting your own products.
          </p>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <br />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
