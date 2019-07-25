import React from "react";
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

class App extends React.Component {
  state = {
    products: [],
    favourites: [],
    isLoading: false, //pakeisti i true
    error: null,
    cart: []
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://boiling-reaches-93648.herokuapp.com/food-shop/products"
    );

    if (response.ok) {
      const json = await response.json();
      this.setState({
        products: [{ ...json[0], id: "hello" }, ...json], //nutrinti ir palikti products: json,
        isLoading: false
      });
    } else {
      this.setState({ error: "Opps, something goes wrong", isLoading: false });
    }
  }

  toggleFavourite = id => {
    const { favourites } = this.state;

    if (favourites.includes(id)) {
      this.setState({
        favourites: favourites.filter(favouriteId => favouriteId !== id)
      });
    } else {
      this.setState({ favourites: [...favourites, id] });
    }
  };

  addToCart = addId => {
    this.setState(state => {
      const itemIndex = state.cart.findIndex(({ id }) => id === addId);
      if (itemIndex > -1) {
        return {
          cart: state.cart.map((cartItem, i) =>
            i === itemIndex
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        };
      }
      return { cart: [...state.cart, { id: addId, count: 1 }] };
    });
  };
  removeFromCart = removeId => {
    this.setState(state => {
      return { cart: state.cart.filter(({ id }) => id !== removeId) };
    });
  };
  render() {
    const { products, isLoading, error, favourites, cart } = this.state;
    return (
      <Router>
        <Layout>
          <Switch>
            <Route
              path={ROUTES.defaultPage}
              exact
              render={() => (
                <Products
                  toggleFavourite={this.toggleFavourite}
                  addToCart={this.addToCart}
                  removeFromCart={this.removeFromCart}
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
                  toggleFavourite={this.toggleFavourite}
                  favourites={favourites}
                  products={products}
                  removeFromCart={this.removeFromCart}
                  cart={cart}
                  addToCart={this.addToCart}
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
}

export default App;
