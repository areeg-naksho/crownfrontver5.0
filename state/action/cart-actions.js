import * as CartState from "./../type/cart-state";

export const addProductToCart = (id) => {
  return {
    type: CartState.ADD_PRODUCT_TO_CART,
    payload: {
      id,
    },
  };
};
export const removeProductToCart = (id) => {
  return {
    type: CartState.DELETE_PRODUCT_FROM_CART,
    payload: {
      id,
    },
  };
};
export const updateCart = (cart) => {
  return {
    type: CartState.UPDATE_CART,
    payload: {
      cart,
    },
  };
};
