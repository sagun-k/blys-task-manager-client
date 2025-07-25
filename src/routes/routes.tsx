import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "../components/AuthenticationPage";
import GlobalErrorBoundary from "../error/GlobalErrorBoundary";
import MainLayout from "../layouts/MainLayout";
import NoAuthLayout from "../layouts/NoAuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import TaskPage from "../pages/tasks/TaskPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          
          {
            index:true,
            element: <TaskPage />,
          },
        ],
      },
    ],
  },
  {
    element: <NoAuthLayout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: "/authentication",
        element: <AuthenticationPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <GlobalErrorBoundary />,
  },
]);
