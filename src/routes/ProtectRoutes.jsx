import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export const ProtectRoutes = () => {
  const { state } = useContext(AuthContext);
  console.log(state);

  return <div>{state.logged ? <Navigate to="/" /> : <Outlet />}</div>;
};
