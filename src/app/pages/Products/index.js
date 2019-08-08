import React, { useContext } from "react";
import { Loader, ProductCard, ShopContext } from "../../components";
import "./index.scss";

function Products() {
  const { products, error, loading } = useContext(ShopContext);
  return (
    <div className="Products">
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => (
        <ProductCard key={data.id} {...data} />
      ))}
    </div>
  );
}

export default Products;
