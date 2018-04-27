import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDTIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDTIENT:
        return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state)
        default:
            return state;
    }
}

export default reducer;

function fetchIngredientsFailed(state) {
    return {
        ...state,
        error: true
    };
}

function setIngredients(state, action) {
    return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    };
}

function removeIngredient(state, action) {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: Math.max(0, state.ingredients[action.ingredientName] - 1)
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
}

function addIngredient(state, action) {
    const newState = {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return newState;
}
