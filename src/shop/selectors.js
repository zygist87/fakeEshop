import { MODULE_NAME } from "./constants";
export const getProducts = state => state[MODULE_NAME].products;
export const getFavourites = state => state[MODULE_NAME].favourites;
export const getCart = state => state[MODULE_NAME].cart;

export const getCartItem = (state, id) => {
  const { cart } = state[MODULE_NAME];
  return cart.find(item => item.id === id);
};

export const isProductFavourite = (state, id) =>
  state[MODULE_NAME].favourites.includes(id);

export const getCartProducts = state => {
  const { cart, products } = state[MODULE_NAME];
  const cartProducts = cart.map(item => {
    const product = products.find(({ id }) => id === item.id);
    return { ...product, ...item };
  });
  return cartProducts;
};

export const getFavouriteProducts = state => {
  const { products, favourites } = state[MODULE_NAME];

  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id)
  );
  return favouriteProducts;
};

export const getProductById = (state, id) =>
  state[MODULE_NAME].products.find(product => product.id === id);
