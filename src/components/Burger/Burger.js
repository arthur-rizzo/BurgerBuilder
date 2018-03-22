import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let ingredientsJSXArray = createIngredientsJSXArray(props);

    if(ingredientsJSXArray.length === 0) {
        ingredientsJSXArray = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsJSXArray}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;

function createIngredientsJSXArray(props) {
    let ingredientsJSXArray = [];
    let keys = Object.keys(props.ingredients);
    for (let i = 0; i < keys.length; i++) {
        let currentKey = keys[i];
        for (let j = 1; j <= props.ingredients[currentKey]; j++) {
            let jsx = <BurgerIngredient key={currentKey + j} type={currentKey} />;
            ingredientsJSXArray.push(jsx);
        }
    }
    return ingredientsJSXArray;
}
