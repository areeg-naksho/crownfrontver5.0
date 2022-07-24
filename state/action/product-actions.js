import * as ProductsStates from "./../type/product-state";
import { getProducts } from "../../api-services/product-services";
export const fetchProductsRequest = () => {
  return {
    type: ProductsStates.FETCH_PRODUCTS_REQUEST,
  };
};
export const fetchProductsSuccess = (data) => {
  return {
    type: ProductsStates.FETCH_PRODUCTS_SUCCESS,
    payload: data,
  };
};
export const fetchProductsError = (error) => {
  return {
    type: ProductsStates.FETCH_PRODUCTS_ERROR,
    payload: error,
  };
};

//////////////////
export const getProductsApi = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      getProducts().then((res) => {
        dispatch(fetchProductsSuccess(res.data.data));
      });
    } catch (error) {
      dispatch(fetchProductsError(error));
    }
  };
};
