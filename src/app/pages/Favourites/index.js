import React from "react";
import { connect } from "react-redux";
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

function Favourites({ favourites, ...restProps }) {
  return (
    <div className="Favourites">
      {!favourites.length && <Error />}
      {favourites.map(data => {
        return <ProductCard {...restProps} key={data.id} {...data} />;
      })}
    </div>
  );
}

function mapStateToProps(state) {
  const { products, favourites } = state.shop;

  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id)
  );
  return { favourites: favouriteProducts };
}

export default connect(mapStateToProps)(Favourites);
