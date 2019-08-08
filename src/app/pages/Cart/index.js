import React, { useContext } from "react";
import "./index.scss";
import ShopContext from "../../components/ShopContext";

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
function Cart() {
  const { products, cart } = useContext(ShopContext);
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
      {!cart.length && <Error />}
      {!!cartItems.length && <CartHeader />}
      {cartItems.map(item => (
        <CartRow {...item} key={item.id} />
      ))}
      {!!cartItems.length && <Total total={total} />}
    </div>
  );
}

export default Cart;
