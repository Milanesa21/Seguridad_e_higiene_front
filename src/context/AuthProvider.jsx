import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token') || null;
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});
    
    const initialState = {
        logged: false,
        token: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                dispatch({ type: types.LOGOUT });
                localStorage.removeItem('token');
                return;
            }

            dispatch({
                type: types.LOGIN,
                payload: { token }
            });

            try {
                const response = await fetch('http://127.0.0.1:8000/auth/validate/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    dispatch({ type: types.LOGOUT });
                    localStorage.removeItem('token');
                    return;
                }

                const data = await response.json();
                if (data && data.Usuario) {
                    setUserId(data.Usuario.id);
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: types.LOGOUT });
                localStorage.removeItem('token');
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
                const response = await fetch(`http://127.0.0.1:8000/Usuarios/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.Usuario) {
                        setUser(data.Usuario);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [userId]);

    const login = (token) => {
        localStorage.setItem('token', token);
        dispatch({
            type: types.LOGIN,
            payload: { token },
        });
    };

    const logout = () => {
        console.log('Cerrando sesión provider');
        localStorage.removeItem('token');
        dispatch({ type: types.LOGOUT });
    };

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            state,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
