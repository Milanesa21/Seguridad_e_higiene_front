import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") || null;
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  console.log(user)

  const initialState = {
    logged: false,
    token: null,
  };
  console.log(userId);

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        dispatch({ type: types.LOGOUT });
        localStorage.removeItem("token");
        setUserId("");
        setUser({});
        return;
      }

      dispatch({
        type: types.LOGIN,
        payload: { token },
      });

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/auth/validate/token/usuario",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          dispatch({ type: types.LOGOUT });
          localStorage.removeItem("token");
          return;
        }

        const data = await response.json();
        if (data && data.Usuario) {
          setUserId(data.Usuario.id);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        dispatch({ type: types.LOGOUT });
        localStorage.removeItem("token");
      }
    };

    validateToken();
  }, [token]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/Usuarios/user/id/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.Usuario) {
            setUser(data.Usuario);
            console.log("User fetched:", data.Usuario);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const login = (token, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol); 
    dispatch({
      type: types.LOGIN,
      payload: { token, rol }, 
    });
  };
  

  const logout = () => {
    console.log("Logging out from provider");
    localStorage.removeItem("token");
    dispatch({ type: types.LOGOUT });
  };
  console.log(user)

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        state,
        user,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
