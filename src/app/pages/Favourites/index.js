import React from "react";
import "./index.scss";
import { ProductCard } from "../../components";

function Error() {
  return (
    <p>
      Oh no, you dont have
      <span role="img" aria-label="broken heart">
        blabla 💔
      </span>
    </p>
  );
}

function Favourites({ favourites, products = [], cart, ...restProps }) {
  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id)
  );
  return (
    <div className="Favourites">
      {!favourites.length && <Error />}
      {favouriteProducts.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};
        return (
          <ProductCard
            {...restProps}
            key={data.id}
            {...data}
            isFavourite
            cartCount={count}
          />
        );
      })}
    </div>
  );
}

export default Favourites;
