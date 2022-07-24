import * as CartState from "./../type/cart-state";

const initialState = {
  data: [],
  currentState: "",
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartState.ADD_PRODUCT_TO_CART:
      let array = localStorage.getItem("cart");
      array = JSON.parse(array);

      if (
        array
          ? array.some((a) => {
              return a.product_id === action.payload.id;
            })
          : state.data.some((a) => {
              return a.product_id === action.payload.id;
            })
      ) {
        localStorage.setItem(
          "cart",
          JSON.stringify(
            array.map((a) => {
              if (a.product_id === action.payload.id) a.quantity++;
              return a;
            })
          )
        );
        return {
          ...state,
          currentState: action.type,
          data: state.data.map((a) => {
            if (a.product_id === action.payload.id) a.quantity++;
            return a;
          }),
        };
      } else {
        if (array !== null) {
          array.push({
            product_id: action.payload.id,
            quantity: 1,
          });
          localStorage.setItem("cart", JSON.stringify([...array]));
        } else {
          localStorage.setItem(
            "cart",
            JSON.stringify([
              ...state.data,
              {
                product_id: action.payload.id,
                quantity: 1,
              },
            ])
          );
        }
        return {
          ...state,
          currentState: action.type,
          data: [
            ...state.data,
            {
              product_id: action.payload.id,
              quantity: 1,
            },
          ],
        };
      }
    case CartState.DELETE_PRODUCT_FROM_CART:
      let array1 = localStorage.getItem("cart");
      array1 = JSON.parse(array1);

      let flag = false;
      let res;
      array1 &&
        (res = array1.map((a) => {
          if (a.product_id === action.payload.id)
            if (a.quantity === 1) flag = true;
            else a.quantity--;
          console.log(a);
          return a;
        }));
      if (flag) {
        array1 &&
          (res = array1.filter((a) => a.product_id !== action.payload.id));
        localStorage.setItem("cart", JSON.stringify(res));
      } else {
        localStorage.setItem("cart", JSON.stringify(res));
      }
      return {
        ...state,
        currentState: action.type,
        data: res,
      };
    case CartState.UPDATE_CART:
      return {
        ...state,
        currentState: action.type,
        data: action.payload.cart,
      };

    default:
      return state;
  }
};
export default CartReducer;
