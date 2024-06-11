import { types } from "../types/types";

export const AuthReducer = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case types.LOGIN:
        return {
            ...state,
            logged: true,
            token: action.payload,
        };
        case types.LOGOUT:
            return {
                ...state,
                logged: false,
                token: null,
            }
        default:
            return state;
    }
}