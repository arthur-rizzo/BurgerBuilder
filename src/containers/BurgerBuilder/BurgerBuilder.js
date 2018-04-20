import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {

        // axios.get('/ingredients.json')
        //     .then(response => { 
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error:true})
        //     });
    }

    updatePurchaseState(ingredients) {
        const ingredients2 = {...ingredients};
        const sum = Object.keys(ingredients).map(x => ingredients2[x]).reduce((sum,el) => sum + el, 0);
        this.setState({purchasable: sum > 0});
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients could not be loaded</p> : <Spinner/>;

        if(this.state.ingredients)
        {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}>
                    </BuildControls>             
                </React.Fragment>
            );

            orderSummary =  <OrderSummary
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>;
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

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
            return;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount - 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing:false });
    } 

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = '?' + queryParams.join('&');
        
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    } 
}

export default withErrorHandler(BurgerBuilder, axios);

