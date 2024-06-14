import { types } from "../types/types";

export const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN:
        return {
            ...state,
            logged: true,
            token: action.payload,
        };
        case types.LOGOUT:
            console.log('Cerrando sesión reducer')
            return {
                ...state,
                logged: false,
                token: null,
            }
        default:
            return state;
    }
}