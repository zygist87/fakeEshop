import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./index.scss";
import { ROUTES } from "../../../constants";
import shop from "../../../shop";
import { compose, bindActionCreators } from "redux";

//HOC (higher order component) example
function withHOC(Component) {
  function WrappedComponent(props) {
    return <Component {...props} text="Amazing" />;
  }
  return WrappedComponent;
}

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
  removeFromCart,
  history,
  text
}) {
  const className = isFavourite
    ? "ProductCard ProductCard__favourite"
    : "ProductCard";
  const completePurchase = () => history.push(ROUTES.cart);
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
          <button type="button" onClick={() => toggleFavourite(id)}>
            <span role="img" aria-label="add to cart illustration">
              {isFavourite ? "🧡" : "🖤"}
            </span>
          </button>
          {!!cartCount && (
            <button type="button" onClick={() => removeFromCart(id)}>
              <span role="img" aria-label="remove from cart cart">
                🗑️
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={() => addToCart({ id, count: cartCount + 1 })}
          >
            <span role="img" aria-label="add to cart cart">
              🛒
            </span>
            {!!cartCount && (
              <div className="ProductCard--cta-count">{cartCount}</div>
            )}
          </button>

          <button type="button" onClick={completePurchase}>
            Complete Purchase {text}
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, { id }) {
  const item = shop.selectors.getCartItem(state, id);
  return {
    cartCount: item ? item.count : 0,
    isFavourite: shop.selectors.isProductFavourite(state, id)
  };
}

const enhance = compose(
  withHOC,
  withRouter,
  connect(
    mapStateToProps,
    dispatch =>
      bindActionCreators(
        {
          addToCart: shop.actions.addToCart,
          removeFromCart: shop.actions.removeFromCart,
          toggleFavourite: shop.actions.toggleFavourite
        },
        dispatch
      )
  )
);

export default enhance(ProductCard);
