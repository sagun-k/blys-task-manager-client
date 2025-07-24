import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginSchema } from "../utils/validation";
import LoadingButton from "./common/LoadingButton";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 ${
                  errors.email && touched.email
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 bg-white"
                }`}
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 ${
                  errors.password && touched.password
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 bg-white"
                }`}
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <LoadingButton type="submit" isLoading={isLoading}>
              Sign In
            </LoadingButton>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 font-medium"
              onClick={() => {
                setFieldValue("email", "demo@blys.com");
                setFieldValue("password", "password");
              }}
            >
              Auto fill Demo A/c
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
