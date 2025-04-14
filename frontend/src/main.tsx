import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterUser from "./components/auth/RegisterUser.tsx";
import VerifyEmail from "./components/auth/VerifyEmail.tsx";
import ResetPassword from "./components/auth/ResetPassword.tsx";
import LoginUser from "./components/auth/LoginUser.tsx";

import LearningMaterial from "./components/pages/LearningMaterial.tsx";
import AddLearningMaterials from "./components/pages/AddLearningMaterials.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/materials",
    element: <LearningMaterial />,
  },
  {
    path: "/materials/add",
    element: <AddLearningMaterials />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
