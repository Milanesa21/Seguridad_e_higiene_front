import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { WebSocketProvider } from "./context/WebSocketContext";
import { NotificationProvider } from "./context/NotificationContext";
import { RoutesComponent } from "./routes/Routes.jsx";

const router = createBrowserRouter([
  { path: "/*", element: <RoutesComponent /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <WebSocketProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </WebSocketProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
