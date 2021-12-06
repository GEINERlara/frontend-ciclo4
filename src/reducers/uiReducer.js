import { types } from "../types/types";

export const uiReducer = (state = { title: 'Dashboard' }, action) => {
  switch (action.type) {
    case types.setDashboardTitle:
      return {
        ...action.payload,
      }
  
    default:
      return state;
  }
}