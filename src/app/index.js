import React, { useState } from "react";

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
import { toggleArrayItem } from "./util";

function onError() {
  return "Opps, something goes wrong";
}

function App() {
  const [favourites, setFavourites] = useState([]);
  const [cart, setCart] = useState([]);
  const { loading: isLoading, products, error } = useFetch({
    onError,
    src: "https://boiling-reaches-93648.herokuapp.com/food-shop/products",
    initialState: [],
    dataKey: "products"
  });

  const toggleFavourite = id => {
    setFavourites(toggleArrayItem(favourites, id));
  };
  const addToCart = id => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      setCart(
        cart.map((item, i) =>
          i === itemIndex ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, count: 1 }]);
    }
  };
  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            path={ROUTES.defaultPage}
            exact
            render={() => (
              <Products
                toggleFavourite={toggleFavourite}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                products={products}
                favourites={favourites}
                cart={cart}
                isLoading={isLoading}
                error={error}
              />
            )}
          />
          <Route
            path={ROUTES.cart}
            exact
            render={() => <Cart cart={cart} products={products} />}
          />
          <Route
            path={ROUTES.favourites}
            exact
            render={() => (
              <Favourites
                toggleFavourite={toggleFavourite}
                favourites={favourites}
                products={products}
                removeFromCart={removeFromCart}
                cart={cart}
                addToCart={addToCart}
              />
            )}
          />
          <Route
            path={ROUTES.product}
            exact
            render={props => {
              const { id } = props.match.params;
              const product = products.find(product => product.id === id);
              return (
                <SingleProduct
                  {...props}
                  product={product}
                  isLoading={isLoading}
                />
              );
            }}
          />
          <Redirect from={ROUTES.home} to={ROUTES.defaultPage} exact />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
