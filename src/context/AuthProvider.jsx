import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token') || null;
    const [user,setUser] = useState({});

    useEffect(()=>{

        if(state.logged){
            fetch('http://127.0.0.1:8000/auth/validate/token',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token.token}`
                },
                
        }).then(response => {
            response.json()
            if(response.status === 401){
                dispatch({
                    type: types.LOGOUT
                })
                localStorage.removeItem('token')
            }
            if(response.status === 200 && token !== null){
                dispatch({
                    type: types.LOGIN,
                    payload: {
                        logged: true,
                        token
                    }
                });
            }
        })
        .then(data => {
            /* setUser(data) */
            console.log(data)
        })
    }
})

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