import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { dataReducer } from "../reducers/dataReducer";
import { uiReducer } from "../reducers/uiReducer";

const reducers = combineReducers({
  auth: authReducer,
  data: dataReducer,
  ui: uiReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)