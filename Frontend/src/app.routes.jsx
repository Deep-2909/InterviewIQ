import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/Home";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { Toaster } from "react-hot-toast";
import Protected from "./features/auth/components/protected.jsx";

function RootLayout() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { 
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Protected><Home /></Protected>
      },
    ],
  },
]);