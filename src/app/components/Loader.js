import React from "react";
import LoaderSpiner from "react-loader-spinner";

const loaderProps = {
  type: "Puff",
  color: "red",
  height: "100",
  width: "100"
};

function Loader() {
  return <LoaderSpiner {...loaderProps} />;
}

export default Loader;
