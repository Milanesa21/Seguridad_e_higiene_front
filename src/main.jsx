import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext.jsx"; // Nuevo
import { AuthProvider } from "./context/AuthProvider.jsx";
import { RoutesComponent } from "./routes/Routes.jsx"; // Ahora importamos RoutesComponent

const router = createBrowserRouter([
  { path: "/*", element: <RoutesComponent /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
