import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  next(action);
  //   const prevState = getState();
  //   next(action);
  //   const nextState = getState();
  //   console.log(prevState, nextState);
};

// process.env.NODE_ENV

const middlewares = [logger, thunk, apiMiddleware];
const composeMiddlewares =
  process.env.NODE_ENV !== "production"
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducers, composeMiddlewares);

export default store;
