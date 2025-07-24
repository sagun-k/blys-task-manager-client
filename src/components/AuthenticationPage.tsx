import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id || user?.email) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [user, location, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-slate-200">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-orange-600">B</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to <span className="text-orange-600">Blys</span>
          </h1>
          <p className="text-slate-600">Manage your tasks efficiently</p>
        </div>

        {/* Form Toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              isLogin
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              !isLogin
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}

        {isLogin && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-700 font-medium mb-1">
              Demo Account:
            </p>
            <p className="text-sm text-blue-600">demo@blys.com / password</p>
          </div>
        )}
      </div>
    </div>
  );
}
