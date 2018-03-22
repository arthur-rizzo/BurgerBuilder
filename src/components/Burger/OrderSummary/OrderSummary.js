import React from 'react';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(i => 
            <li key={i}>
                <span style={{ textTransform: 'capitalize'}}>
                {i}
                </span>: {props.ingredients[i]}</li>);

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with  the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </React.Fragment>);
};

export default orderSummary;
