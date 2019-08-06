import { MODULE_NAME } from "./constants";
export const getProducts = state => state[MODULE_NAME].products.data;
export const isLoadingProducts = state => state[MODULE_NAME].products.loading;
export const getProductsError = state => state[MODULE_NAME].products.error;
export const getFavourites = state => state[MODULE_NAME].favourites;
export const getCart = state => state[MODULE_NAME].cart;

export const getCartItem = (state, id) =>
  getCart(state).find(item => item.id === id);

export const isProductFavourite = (state, id) =>
  getFavourites(state).includes(id);

export const getCartProducts = state => {
  const cartProducts = getCart(state).map(item => {
    const product = getProducts(state).find(({ id }) => id === item.id);
    return { ...product, ...item };
  });
  return cartProducts;
};

export const getFavouriteProducts = state => {
  const favouriteProducts = getProducts(state).filter(product =>
    getFavourites(state).includes(product.id)
  );
  return favouriteProducts;
};

export const getProductById = (state, id) =>
  getProducts(state).find(product => product.id === id);
