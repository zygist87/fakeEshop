import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.scss";
import { Products, Cart, Favourites, PageNotFound } from "./pages";
import { Layout } from "./components";

class App extends React.Component {
  state = {
    products: [],
    favourites: [],
    isLoading: false,
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
        products: json,
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
              path="/"
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
              path="/cart"
              exact
              render={() => <Cart cart={cart} products={products} />}
            />
            <Route
              path="/favourites"
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
            <Redirect from="/home" to="/" exact />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
