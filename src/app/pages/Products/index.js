import React from "react";
import { connect } from "react-redux";
import { Loader, ProductCard } from "../../components";
import "./index.scss";

function Products({ isLoading, error, products = [] }) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => {
        return <ProductCard key={data.id} {...data} />;
      })}
    </div>
  );
}

function mapStateToProps(state) {
  const { products } = state.shop;
  return { products };
}

export default connect(mapStateToProps)(Products);
