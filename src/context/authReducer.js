import { types } from "../types/types";

export const AuthReducer = (state = { logged: false, token: null }, action) => {
  switch (action.type) {
    case types.LOGIN:
      console.log("Iniciando sesión reducer");
      return {
        ...state,
        logged: true,
        token: action.payload.token,
      };
    case types.LOGOUT:
      console.log("Cerrando sesión reducer");
      return {
        ...state,
        logged: false,
        token: null,
      };
    default:
      return state;
  }
};
