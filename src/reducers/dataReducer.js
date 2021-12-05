import { types } from "../types/types";

export const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.setCategories:
      return {
        ...action.payload,
      }
  
    default:
      return state;
  }
}