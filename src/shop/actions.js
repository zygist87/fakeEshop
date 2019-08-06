import * as types from "./actionTypes";

export const removeFromCart = id => ({
  type: types.REMOVE_FROM_CART,
  payload: id
});

export const toggleFavourite = id => ({
  type: types.TOGGLE_FAVOURITE,
  payload: id
});

export const addToCart = payload => ({
  type: types.ADD_TO_CART,
  payload
});

export const setProducts = payload => ({
  type: types.SET_PRODUCTS,
  payload
});

export const getProducts = () => async dispatch => {
  dispatch({ type: types.GET_PRODUCTS });

  try {
    const result = await fetch("");
    const json = await result.json();

    dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: json });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_FAILURE,
      payload: "Something went bad!"
    });
  }

  dispatch({ type: types.GET_PRODUCTS });
};
