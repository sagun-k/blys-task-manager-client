import { useRouteError } from "react-router-dom";

const ErrorDetails = () => {
  const error = useRouteError();
  let message = "An error occurred!";

  if (error as any) {
    message = (error as Error).message;
  } else if (error as Error) {
    const serviceError = error as any;
    message = `${serviceError.message} [id: ${serviceError.errorId}; status code: ${serviceError.statusCode}]`;
  }

  return (
    <div className="m-5 border border-gray-200 rounded shadow-sm bg-white p-4">
      <h2 className="text-lg font-semibold text-red-600 mb-3">{message}</h2>
      <pre className="text-sm text-gray-500 overflow-x-auto whitespace-pre-wrap">
        {(error as Error)?.stack}
      </pre>
    </div>
  );
};

export default ErrorDetails;
