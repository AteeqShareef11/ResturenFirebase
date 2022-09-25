const initial_state = {
  cartItems: [],
};

const cartItemsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "setCartItems":
      let cart = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(cart));
      return { cartItems: cart };
    case "RemoveFromCart":
      let removeCart = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(removeCart));

      return { cartItems: removeCart };

    default:
      return {
        // totalPrice:
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
      };
  }
};

export default cartItemsReducer;
