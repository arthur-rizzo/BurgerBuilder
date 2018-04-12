import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];
    for(let ingredientName in props.ingredients) {
        ingredients.push(ingredientName + ' (' + props.ingredients[ingredientName] + ')');
    }
    const ingredientsSpans = ingredients.map(i => {
        return (<span 
            key = {i}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{i}
        </span>);
    });

    return (
        <div className={classes.Order}>
            <p >Ingredients: {ingredientsSpans}</p>
            <p>Price <strong>{(+props.price).toFixed(2)}</strong></p>
        </div>
    );
}
 
export default order;