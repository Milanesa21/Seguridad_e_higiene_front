import { createContext, useReducer, useEffect, useState, useContext } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";
import { ValidateService } from "../service/validateService";
import { AccessToken } from "../service/tokenService";
import { UserService } from "../service/userService";

export const AuthContext = createContext();
// a
export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") || null;
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});

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
        AccessToken.removeToken();
        setUserId("");
        setUser({});
        return;
      }

      dispatch({
        type: types.LOGIN,
        payload: { token },
      });

      try {
        const response = ValidateService.validateToken();

        if (!response.ok) {
          dispatch({ type: types.LOGOUT });
          AccessToken.removeToken();
          return;
        }

        const data = await response.json();
        if (data && data.Usuario) {
          setUserId(data.Usuario.id);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        dispatch({ type: types.LOGOUT });
        AccessToken.removeToken();
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
        const response = await UserService.getUserById(userId);

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

  const login = (token) => {
    localStorage.setItem("token", token);
    dispatch({
      type: types.LOGIN,
      payload: { token },
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

export const useAuth = () => useContext(AuthContext);