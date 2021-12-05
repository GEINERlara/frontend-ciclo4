import { types } from "../types/types"

export const setCategories = (data) => {
  return ({
    type: types.setCategories,
    payload: {
      categories: data,
    }
  })
}