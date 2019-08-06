import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import shop from "../../../shop";

function Error() {
  return (
    <p>
      Oh no, you dont have anything in your cart{" "}
      <span role="img" aria-label="broken heart">
        blabla 💔
      </span>
    </p>
  );
}
function CartHeader() {
  return (
    <div className="Cart--header">
      <label className="Cart--headerr">Product:</label>
      <label className="Cart--headerrr">Price:</label>
    </div>
  );
}

function Total({ total }) {
  return (
    <div className="Cart--total">
      <label>Total: </label>
      {total}
    </div>
  );
}

function CartRow({ name, count, price, currencySymbol }) {
  return (
    <div className="Cart--item">
      <span>
        {name} X {count}
      </span>
      <span>
        {price * count} {currencySymbol}
      </span>
    </div>
  );
}
function Cart({ cart, total }) {
  return (
    <div className="Cart">
      {!cart.length && <Error />}
      {!!cart.length && <CartHeader />}
      {cart.map(item => (
        <CartRow {...item} key={item.id} />
      ))}
      {!!cart.length && <Total total={total} />}
    </div>
  );
}

function mapStateToProps(state) {
  const cart = shop.selectors.getCartProducts(state);
  const total = cart.reduce(
    (result, { price, count }) => result + Number(price) * count,
    0
  );
  return { cart, total };
}

export default connect(mapStateToProps)(Cart);
