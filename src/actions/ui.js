import { types } from "../types/types"

export const setDashboardTitle = (title) => {
  return ({
    type: types.setDashboardTitle,
    payload: {
      title: title,
    }
  })
}