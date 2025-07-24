import { Link } from "react-router-dom";
import ErrorDetails from "./ErrorDetails";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const environment = import.meta.env.MODE;

const CustomGlobalError = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops, Something went wrong! 😭
        </h1>
        <p className="text-gray-600 mb-6">
          Apologies, but we are experiencing technical difficulties. Please try again later.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <i className="mdi mdi-home mr-2"></i>
          Back to home
        </Link>

        {environment !== "production" && (
          <div className="mt-8 text-left">
            <ErrorDetails />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomGlobalError;
