import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';




class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Order}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/" component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
