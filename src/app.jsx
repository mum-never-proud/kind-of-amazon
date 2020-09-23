import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { UserContext } from 'contexts/User';
import { getCurrentUser } from 'services/user';
import { authenticateUserSuccess } from 'actionCreators/user';
import SignIn from 'components/Signin';
import SignUp from 'components/Signup';
import Home from 'components/Home';
import Cart from 'components/Cart';
import Checkout from 'components/Checkout';
import Orders from 'components/Orders';
import ShopProvider from 'contexts/Shop';
import DefaultLayout from 'layouts/DefaultLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(authenticateUserSuccess(user));
        }
      });
  }, []);

  return (
    <Router>
      <Switch>
        <DefaultLayout path="/" exact component={Home} context={ShopProvider} />
        <DefaultLayout path="/cart" exact component={Cart} context={ShopProvider} />
        <DefaultLayout path="/checkout" exact component={Checkout} context={ShopProvider} />
        <DefaultLayout path="/orders" exact component={Orders} context={ShopProvider} />
        <Route
          path="/sign-in"
          exact
          render={(props) => {
            const { location: { state: routeState } } = props;

            // eslint-disable-next-line react/jsx-props-no-spreading
            return state.user ? <Redirect to={routeState ? routeState.from : '/'} /> : <SignIn {...routeState} />;
          }}
        />
        <Route
          path="/sign-up"
          exact
          render={(props) => {
            const { location: { state: routeState } } = props;

            // eslint-disable-next-line react/jsx-props-no-spreading
            return state.user ? <Redirect to={routeState ? routeState.from : '/'} /> : <SignUp {...routeState} />;
          }}
        />
      </Switch>
    </Router>
  );
};

App.defaultProps = {
  location: undefined,
};
App.propTypes = {
  location: PropTypes.string,
};

export default App;
