import React from "react";
import "./index.scss";

function Cart({ products, cart }) {
  const cartItems = cart.map(item => {
    const product = products.find(({ id }) => id === item.id);

    return { ...product, ...item };
  });
  console.log(cartItems);
  const total = cartItems.reduce(
    (result, { price, count }) => result + Number(price) * count,
    0
  );

  return (
    <div className="Cart">
      {!cart.length && (
        <p>
          Oh no, you dont have anything in your cart{" "}
          <span role="img" aria-label="broken heart">
            blabla 💔
          </span>
        </p>
      )}
      {!!cartItems.length && (
        <div className="Cart--header">
          <label className="Cart--headerr">Product:</label>
          <label className="Cart--headerrr">Price:</label>
        </div>
      )}
      {cartItems.map(({ id, name, price, currencySymbol, count }) => {
        return (
          <div className="Cart--item" key={id}>
            <span>
              {name} X {count}
            </span>
            <span>
              {price * count} {currencySymbol}
            </span>
          </div>
        );
      })}
      {!!cartItems.length && (
        <div className="Cart--total">
          <label>Total: </label>
          {total}
        </div>
      )}
    </div>
  );
}

export default Cart;
