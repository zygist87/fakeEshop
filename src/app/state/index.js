import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const logger = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  next(action);
  //   const prevState = getState();
  //   next(action);
  //   const nextState = getState();
  //   console.log(prevState, nextState);
};

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
