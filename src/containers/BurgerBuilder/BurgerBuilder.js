import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/order';
import * as authActions from '../../store/actions/auth';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    isPurchasable(ingredients) {
        const ingredients2 = {...ingredients};
        const sum = Object.keys(ingredients).map(x => ingredients2[x]).reduce((sum,el) => sum + el, 0);
        return sum > 0;
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients could not be loaded</p> : <Spinner/>;

        if(this.props.ings)
        {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls 
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.isPurchasable(this.props.ings)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}>
                    </BuildControls>             
                </React.Fragment>
            );

            orderSummary =  <OrderSummary
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} 
            ingredients={this.props.ings}
            price={this.props.totalPrice}/>;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </React.Fragment>
        );
    }

    purchaseHandler = () => {

        if(this.props.isAuthenticated) {
            this.setState({purchasing:true});
        } 
        else {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing:false });
    } 

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    } 
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error,
        totalPrice: state.burgerBuilder.totalPrice,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(orderActions.purchaseBurgerInit()),
        onSetRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

