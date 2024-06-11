import { createContext, useReducer, useEffect } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token') || null;

    useEffect(() => {
        if (token !== null) {
            dispatch({
                type: types.LOGIN,
                payload: {
                    logged: true,
                    token
                }
            });
        }
    },[token]);

    const inicialState = {
        logged: false,
        token: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, inicialState);
    const login = (token) => {
        dispatch({
            type: types.LOGIN,
            payload: token,
        });
    }
    const logout = () => {
        dispatch({
            type: types.LOGOUT,
        });
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            state,
        }}>
            {children}
        </AuthContext.Provider>
    );

}