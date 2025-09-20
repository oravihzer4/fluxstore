import type { FunctionComponent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik, type FormikValues } from "formik";
import { successMassage } from "../Services/FeedbackService";
import { loginUser } from "../Services/userService";
import { errorMassage } from "../Services/FeedbackService";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const formik: FormikValues = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .trim()
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        });
        const token = response.data.token;
        localStorage.setItem("x-auth-token", token);
        successMassage("Login successful! Welcome back.");
        resetForm();
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      } catch (error: any) {
        errorMassage(
          error?.response?.data ||
            "Login failed. Please check your credentials."
        );
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <form
        className="d-flex flex-column align-items-center justify-content-center p-5"
        onSubmit={formik.handleSubmit}
      >
        <h1>Login</h1>
        <div className="mb-3 w-50">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoComplete="off"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev: boolean) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          <div className="mt-2 text-end">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-primary"
            >
              Forgot my password?
            </Link>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br />
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
