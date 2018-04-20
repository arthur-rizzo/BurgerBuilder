import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDTIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients
                    [action.ingredientName] = state.ingredients[action.ingredientName] + 1
                }
            };

        case actionTypes.REMOVE_INGREDTIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients
                [action.ingredientName] = Math.max(0, state.ingredients[action.ingredientName] - 1)
            }
        };
        default:
            return state;
    }
}

export default reducer;