import { types } from "../types/types";

export const AuthReducer = (state = { logged: false, token: null, rol: null }, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        logged: true,
        token: action.payload.token,
        rol: action.payload.rol || null,
      };
    case types.LOGOUT:
      return {
        ...state,
        logged: false,
        token: null,
        rol: null,
      };
    default:
      return state;
  }
};
