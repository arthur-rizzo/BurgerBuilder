import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Street"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "ZIP Code"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Country"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your E-Mail"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'}, 
                        {value: 'cheapest', displayValue: "Cheapest"}
                    ]
                },
                value: '',
                valid: true,
                touched: false
            }
        },
        loading: false
    }
    
    orderHandler = (event) => {

        event.preventDefault();

        this.setState({ loading: true } );

        const formData = {};
        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log('deu bom');   
                this.setState({ loading: false } );
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);                
                this.setState({ loading: false } );
            });

    }

    render() { 
        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({ 
                id: key,
                config: this.state.orderForm[key]});
        }

        let allValid = true;
        for(let key in this.state.orderForm) {
            allValid = allValid && this.state.orderForm[key].valid;
        }

        let form = ( <form onSubmit={this.orderHandler}>
            {formElementsArray.map(x => (
                <Input 
                    key={x.id}
                    invalid={!x.config.valid}
                    elementType={x.config.elementType} 
                    elementConfig={x.config.elementConfig}
                    shouldValidate={x.config.validation}
                    touched={x.config.touched}
                    value={x.config.value}
                    changed={ (event) => this.inputChangedHandler(event, x.id)}/>
            ))}
            <Button buttonType="Success" disabled={!allValid}>ORDER</Button>
        </form>);

        if(this.state.loading)
            form = <Spinner></Spinner>

        return (  
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }

    checkValidity(value, rules) {

        if(!rules)
            return true;

        let isValid = true;

        if(isValid && rules.required) {
            isValid = value.trim() !== '';
        }

        if(isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if(isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const formData = {...this.state.orderForm};
        const updatedElement = {...formData[inputIdentifier] };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;

        formData[inputIdentifier] = updatedElement;

        this.setState({orderForm: formData});
    }

}

export default ContactData;