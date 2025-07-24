import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerSchema } from "../utils/validation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingButton from "./common/LoadingButton";
import { ToasUtils } from "../utils/ToastUtils";

type RegisterProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Register = ({ setIsLogin }: RegisterProps) => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegisterSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await register(values.name, values.email, values.password);
      setIsLogin(true);
    } catch (error) {
      ToasUtils.showErrorToast("Error register user", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={handleRegisterSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Full Name
              </label>
              <Field
                type="text"
                name="name"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 ${
                  errors.name && touched.name
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 bg-white"
                }`}
                placeholder="Enter your full name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

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
              Create Account
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Register;
