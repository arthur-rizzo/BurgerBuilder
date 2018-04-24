import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
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
        let burger = this.state.error ? <p>Ingredients could not be loaded</p> : <Spinner/>;

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
                        ordered={this.purchaseHandler}>
                    </BuildControls>             
                </React.Fragment>
            );

            orderSummary =  <OrderSummary
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} 
            ingredients={this.props.ings}
            price={this.props.totalPrice}/>;
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

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing:false });
    } 

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    } 
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDTIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDTIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

