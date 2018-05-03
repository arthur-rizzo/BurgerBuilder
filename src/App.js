import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/orders" component={Order}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" component={BurgerBuilder}></Route>
      </Switch>
    );

    if(!this.props.isAuthenticated) {

      routes = (
        <Switch>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
