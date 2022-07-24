import * as ProductsStates from "./../type/product-state";

const initialState = {
    data: [],
    error: "",
    currentState: "",
}
const productsReducer = (state = initialState, action) => {

    //////////Git-Api//////////

    switch (action.type) {
        case ProductsStates.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                currentState: ProductsStates.FETCH_PRODUCTS_REQUEST,
            };
        case ProductsStates.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                currentState: ProductsStates.FETCH_PRODUCTS_SUCCESS,
                error: "",
                data: action.payload,
            }
        case ProductsStates.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                currentState: ProductsStates.FETCH_PRODUCTS_ERROR,
                error: action.payload,
            }

        default: return state;
    }

}
export default productsReducer