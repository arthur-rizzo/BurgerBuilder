import React from 'react';
import Button from '../../UI/Button/Button'

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
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCanceled}>CANCEL </Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>);
};

export default orderSummary;
