import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import categoriesReducer from "./categories-reducer";
import CartReducer from "./cart-reducer";
import settingsReducer from "./settings-reducer";

const reducers = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: CartReducer,
  settings: settingsReducer,
});
export default reducers;
