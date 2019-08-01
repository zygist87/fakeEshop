import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";
import shop from "../../../shop";

function ProductCard({
  name,
  image,
  description,
  price,
  currencySymbol,
  id,
  toggleFavourite,
  isFavourite,
  addToCart,
  cartCount,
  removeFromCart
}) {
  const className = isFavourite
    ? "ProductCard ProductCard__favourite"
    : "ProductCard";
  return (
    <div className={className}>
      <div className="ProductCard--image">
        <img alt={`product: ${name}`} src={image} />
      </div>
      <div className="ProductCard--info">
        <Link to={`/product/${id}`}>
          <h3>{name}</h3>
        </Link>
        <p>{description}</p>
      </div>
      <div className="ProductCard--cta">
        <p>
          <span>Price:</span>
          <span>{`${price}${currencySymbol}`}</span>
        </p>
        <div>
          <button type="button" onClick={toggleFavourite}>
            <span role="img" aria-label="add to cart illustration">
              {isFavourite ? "🧡" : "🖤"}
            </span>
          </button>
          {!!cartCount && (
            <button type="button" onClick={removeFromCart}>
              <span role="img" aria-label="remove from cart cart">
                🗑️
              </span>
            </button>
          )}
          <button type="button" onClick={() => addToCart(cartCount)}>
            <span role="img" aria-label="add to cart cart">
              🛒
            </span>
            {!!cartCount && (
              <div className="ProductCard--cta-count">{cartCount}</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  const { cart, favourites } = state.shop;
  const item = cart.find(({ id }) => id === props.id);
  return {
    cartCount: item ? item.count : 0,
    isFavourite: favourites.includes(props.id)
  };
}

function mapDispatchToProps(dispatch, { id }) {
  return {
    addToCart: count =>
      dispatch({
        type: shop.actionTypes.ADD_TO_CART,
        payload: { id, count: count + 1 }
      }),
    removeFromCart: () =>
      dispatch({ type: shop.actionTypes.REMOVE_FROM_CART, payload: id }),
    toggleFavourite: () =>
      dispatch({ type: shop.actionTypes.TOGGLE_FAVOURITE, payload: id })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
