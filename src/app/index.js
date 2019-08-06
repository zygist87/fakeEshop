import React, { useEffect } from "react";
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

import store from "./state";

function App() {
  useEffect(() => {
    store.dispatch(shop.actions.getProducts());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path={ROUTES.defaultPage} exact component={Products} />
            <Route path={ROUTES.cart} exact component={Cart} />
            <Route path={ROUTES.favourites} exact component={Favourites} />
            <Route path={ROUTES.product} exact component={SingleProduct} />
            <Redirect from={ROUTES.home} to={ROUTES.defaultPage} exact />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
