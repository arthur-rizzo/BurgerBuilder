import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5
}

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 4
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDTIENT:
            const newState =  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return newState;

        case actionTypes.REMOVE_INGREDTIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: Math.max(0, state.ingredients[action.ingredientName] - 1)
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
        default:
            return state;
    }
}

export default reducer;