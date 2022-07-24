import * as CategoriesStates from "./../type/category-state";

const initialState = {
    data: [],
    error: "",
    currentState: "",
}
const categoriesReducer = (state = initialState, action) => {

    //////////Git-Api//////////

    switch (action.type) {
        case CategoriesStates.FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                currentState: CategoriesStates.FETCH_CATEGORIES_REQUEST,
            };
        case CategoriesStates.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                currentState: CategoriesStates.FETCH_CATEGORIES_SUCCESS,
                error: "",
                data: action.payload,
            }
        case CategoriesStates.FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                currentState: CategoriesStates.FETCH_CATEGORIES_ERROR,
                error: action.payload,
            }

        default: return state;
    }

}
export default categoriesReducer