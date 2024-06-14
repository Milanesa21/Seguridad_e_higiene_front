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
        const validateToken = async () => {
        if (token === null || token === undefined ){
            dispatch({
                type: types.LOGOUT
            })
            localStorage.removeItem('token')
            return
        }
        if (token !== null && token !== undefined) {
            dispatch({
                type: types.LOGIN,
                payload: {
                    logged: true,
                    token
                }
            });
        }
        if(state.logged && state.token.token !== null && state.token.token !== undefined){
            await fetch('http://127.0.0.1:8000/auth/validate/token',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token.token}`
                },
                
        }).then(response => {
            if(response.status === 401 || response.status === 403 || response.status === 400 ){
                dispatch({
                    type: types.LOGOUT
                })
                localStorage.removeItem('token')
            }
            response.json()
        })
        .then(data => {
            if (data === undefined || data === null) {
                return
            }
            else {
            setUserId(data.Usuario.id)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}
validateToken();
},[token,state.logged])

useEffect(()=>{
    if(userId === '' || userId === null || userId === undefined) {
        return
    }
    const fetchUser = async () => {
    await fetch(`http://127.0.0.1:8000/Usuarios/${userId}`,
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
}
fetchUser();
},[userId])



    const login = (token) => {
        dispatch({
            type: types.LOGIN,
            payload: token,
        });
    }
    const logout = () => {
        console.log('Cerrando sesión provider')
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