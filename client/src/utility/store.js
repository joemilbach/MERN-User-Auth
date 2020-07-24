import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

let middleware = [thunk];

// Only log redux in DEV
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, createLogger()];
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
