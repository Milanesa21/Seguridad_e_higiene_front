import { createContext, useReducer, useEffect, useState, useContext } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";
import { ValidateService } from "../service/validateService";
import { AccessToken } from "../service/tokenService";
import { UserService } from "../service/userService";
import { EmpresaService } from "../service/empresaService";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") || null;
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [empresaId, setEmpresaId] = useState('')
  const initialState = {
    logged: false,
    token: null,
  };


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
        const response = await ValidateService.validateToken();
        
        const data = await response.json();
        if (data && data.Usuario) {
          if (data.Usuario.id_user !== undefined) {
            setUserId(data.Usuario.id_user)
            setEmpresaId('')
          }
          if (data.Usuario.id_empresa !== undefined) {
            setEmpresaId(data.Usuario.id_empresa)
            setUserId('')
          }
        }
      } catch (error) {
        console.error("Error validating token:", error);
        dispatch({ type: types.LOGOUT });
        AccessToken.removeToken();
      }
    };

    validateToken();
  }, [token, userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId){
        const response = await UserService.getUserById(userId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.Usuario) {
            setUser(data.Usuario);
          }
        }}
        if (empresaId !== undefined && empresaId !== null && empresaId !== ''){
          const response = await EmpresaService.getById(empresaId)
          if (response.ok){
            const data = await response.json();
            if (data) {
              setUser(data);
          }
        }
      }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      
    };
    fetchUser();
  }, [empresaId, userId]);

  const login = (token, rol= null) => {
    AccessToken.setToken(token)
    if (rol !== null) localStorage.setItem("rol", rol); 
    dispatch({
      type: types.LOGIN,
      payload: { token, rol }, 
    });
  };
  

  const logout = () => {
    AccessToken.removeToken()
    dispatch({ type: types.LOGOUT });
    setUserId('')
    setUser('')
    setEmpresaId('')
  };
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