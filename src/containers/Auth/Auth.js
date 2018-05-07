import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as authActions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Mail address"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
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
        
        const formData = {...this.state.controls};
        const updatedElement = {...formData[inputIdentifier] };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;

        formData[inputIdentifier] = updatedElement;

        this.setState({controls: formData});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value, 
            this.state.controls.password.value,
            this.state.isSignUp);
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath("/");
        }
    }

    render() {

        if(this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath}/>;
        }

        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({ 
                id: key,
                config: this.state.controls[key]});
        }

        let form = formElementsArray.map(x => {
            return (
                <Input 
                key={x.id}
                invalid={!x.config.valid}
                elementType={x.config.elementType} 
                elementConfig={x.config.elementConfig}
                shouldValidate={x.config.validation}
                touched={x.config.touched}
                value={x.config.value}
                changed={ (event) => this.inputChangedHandler(event, x.id)}/>
            );
        });

        if(this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                   {form}
                   <Button buttonType="Success">SUBMIT</Button>
                </form>
                <Button 
                    buttonType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP" }
                </Button>
            </div>
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prev => {
            return { isSignUp: !prev.isSignUp }
        });
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);