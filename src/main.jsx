import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";


const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
