import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Sorry, Page not Found 😭
        </h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for is not available!
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <i className="mdi mdi-home mr-2" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
