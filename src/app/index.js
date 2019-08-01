import React from "react";
import { Provider } from "react-redux";
import shop from "../shop";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.scss";
import {
  Products,
  Cart,
  Favourites,
  PageNotFound,
  SingleProduct
} from "./pages";
import { Layout } from "./components";
import { ROUTES } from "../constants";
import { useFetch } from "./hooks";

import store from "./state";

function onError() {
  return "Opps, something goes wrong";
}

function onSuccess(payload) {
  store.dispatch({ type: shop.actionTypes.SET_PRODUCTS, payload });
  return payload;
}
function App() {
  const { loading: isLoading, products, error } = useFetch({
    onError,
    src: "https://boiling-reaches-93648.herokuapp.com/food-shop/products",
    initialState: [],
    dataKey: "products",
    onSuccess
  });

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route
              path={ROUTES.defaultPage}
              exact
              render={() => <Products isLoading={isLoading} error={error} />}
            />
            <Route path={ROUTES.cart} exact component={Cart} />
            <Route path={ROUTES.favourites} exact component={Favourites} />
            <Route
              path={ROUTES.product}
              exact
              render={props => (
                <SingleProduct {...props} isLoading={isLoading} />
              )}
            />
            <Redirect from={ROUTES.home} to={ROUTES.defaultPage} exact />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
