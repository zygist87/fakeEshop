const INITIAL_STATE = {
  products: [],
  favourites: [],
  cart: []
};
function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };
    case "ADD_TO_CART":
      const itemIndex = state.cart.findIndex(({ id }) => id === payload.id);

      if (itemIndex > -1) {
        return {
          ...state,
          cart: state.cart.map((item, i) => (i == itemIndex ? payload : item))
        };
      }

      return { ...state, cart: [...state.cart, payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(({ id }) => id !== payload) };
    case "TOGGLE_FAVOURITE":
      if (state.favourites.includes(payload)) {
        return {
          ...state,
          favourites: state.favourites.filter(id => id !== payload)
        };
      }
      return { ...state, favourites: [...state.favourites, payload] };
    default:
      return state;
  }
}

export default reducer;
