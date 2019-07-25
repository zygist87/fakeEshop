import React from "react";
import { Loader, ProductCard } from "../../components";
import "./index.scss";

function Products({
  isLoading,
  error,
  products = [],
  toggleFavourite,
  favourites,
  addToCart,
  removeFromCart,
  cart
}) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};
        return (
          <ProductCard
            removeFromCart={removeFromCart}
            toggleFavourite={toggleFavourite}
            key={data.id}
            {...data}
            isFavourite={favourites.includes(data.id)}
            cartCount={count}
            addToCart={addToCart}
          />
        );
      })}
    </div>
  );
}

export default Products;
