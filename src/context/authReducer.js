import { types } from "../types/types";

export const AuthReducer = (state = { logged: false, token: null }, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        logged: true,
        token: action.payload.token,
      };
    case types.LOGOUT:
      return {
        ...state,
        logged: false,
        token: null,
      };
    default:
      return state;
  }
};
