import React, {Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }    

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}>
                </CheckoutSummary>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData price={this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>)}>
                </Route>
            </div>
        );
    }

}

export default Checkout;