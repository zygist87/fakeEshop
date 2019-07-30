import React from "react";
import { Loader, ProductCard } from "../../components";
import "./index.scss";

function Products({
  isLoading,
  error,
  products = [],
  favourites,
  cart,
  ...restProps
}) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};
        return (
          <ProductCard
            {...restProps}
            key={data.id}
            {...data}
            isFavourite={favourites.includes(data.id)}
            cartCount={count}
          />
        );
      })}
    </div>
  );
}

export default Products;
