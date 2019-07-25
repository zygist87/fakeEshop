import React from "react";
import "./index.scss";
import { ProductCard } from "../../components";

function Favourites({
  favourites,
  products = [],
  cart,
  toggleFavourite,
  addToCart,
  removeFromCart
}) {
  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id)
  );
  return (
    <div className="Favourites">
      {!favourites.length && (
        <p>
          Oh no, you dont have
          <span role="img" aria-label="broken heart">
            blabla 💔
          </span>
        </p>
      )}
      {favouriteProducts.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};
        return (
          <ProductCard
            removeFromCart={removeFromCart}
            key={data.id}
            {...data}
            toggleFavourite={toggleFavourite}
            isFavourite
            addToCart={addToCart}
            cartCount={count}
          />
        );
      })}
    </div>
  );
}

export default Favourites;
