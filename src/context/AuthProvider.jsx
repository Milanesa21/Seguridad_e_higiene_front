import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "../context/authReducer";
import { types } from "../types/types";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token') || null;
    const [userId,setUserId] = useState('');
    const [user,setUser] = useState({});
    const inicialState = {
        logged: false,
        token: null,
    };
    const [state, dispatch] = useReducer(AuthReducer, inicialState);

    useEffect(()=>{
        if (token === null) return
        if (token !== null) {
            dispatch({
                type: types.LOGIN,
                payload: {
                    logged: true,
                    token
                }
            });
        }
        if(state.logged){
            fetch('http://127.0.0.1:8000/auth/validate/token',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token.token}`
                },
                
        }).then(response => {
            if(response.status === 401){
                dispatch({
                    type: types.LOGOUT
                })
                localStorage.removeItem('token')
            }
            return response.json()
        })
        .then(data => {
            setUserId(data.Usuario.id)
        })
        .catch(error => {
            console.log(error)
        })
    }
},[token,state.logged])

useEffect(()=>{
    if (userId === '') return
    if (!state.logged) return
    fetch(`http://127.0.0.1:8000/Usuarios/${userId}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
}).then(response => response.json())
    .then(data => {
        setUser(data.Usuario)
    })
    .catch(error => {
        console.log(error)
    })
},[userId])



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
            user,
        }}>
            {children}
        </AuthContext.Provider>
    );

}