import * as CategoriesStates from "./../type/category-state";
import { getCategories } from "../../api-services/categories-services";
export const fetchCategoriesRequest = () => {
  return {
    type: CategoriesStates.FETCH_CATEGORIES_REQUEST,
  };
};
export const fetchCategoriesSuccess = (data) => {
  return {
    type: CategoriesStates.FETCH_CATEGORIES_SUCCESS,
    payload: data,
  };
};
export const fetchCategoriesError = (error) => {
  return {
    type: CategoriesStates.FETCH_CATEGORIES_ERROR,
    payload: error,
  };
};

//////////////////
export const getCategoriesApi = () => {
  return (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
      getCategories().then((res) => {
        dispatch(fetchCategoriesSuccess(res.data.data));
      });
    } catch (error) {
      dispatch(fetchCategoriesError(error));
    }
  };
};
