import React, { useContext } from "react";
import "./index.scss";
import { ProductCard, ShopContext } from "../../components";

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

function Favourites() {
  const { products, favourites } = useContext(ShopContext);
  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id)
  );
  return (
    <div className="Favourites">
      {!favourites.length && <Error />}
      {favouriteProducts.map(data => (
        <ProductCard key={data.id} {...data} />
      ))}
    </div>
  );
}

export default Favourites;
