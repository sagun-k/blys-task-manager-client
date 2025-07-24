import { AuthProvider } from "./contexts/AuthContext"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-left" />
    </AuthProvider>
  )
}
