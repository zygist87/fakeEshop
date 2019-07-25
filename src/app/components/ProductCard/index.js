import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

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
          <button type="button" onClick={() => addToCart(id)}>
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

export default ProductCard;
