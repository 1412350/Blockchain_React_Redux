import * as React from 'react';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import SignOut from '../components/signout';
import * as actionCreators from '../actions/authaction';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import PropTypes from 'prop-types'

class MainContainer extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.updateToken();
  }

  render() {
    const SignInComponent = () => {
      if (this.props.auth_token != "" && this.props.auth_token != null) {
        window.location.hash = '/';
        return null;
      }
      else {
        return (
          <SignIn signinUser={this.props.actions.signinUser(this.props.wallet_id, this.props.password)}
          updatePassword={this.props.actions.updatePassword}/>
        );
      }
    }

    const SignUpComponent = () => {
      if (this.props.auth_token != "" && this.props.auth_token != null) {
        window.location.hash = '/';
        return null;
      }
      else {
        return (
          <SignUp />
        );
      }
    }
    const SignOutComponent = () => {
      if (this.props.auth_token != "") {
        this.props.actions.logoutAndRedirect(this.props.wallet_id);  
        return (
          <SignOut/>
        );
      }
      return null;
    }
    return (
      <HashRouter>
        <Switch>
          <Route path='/users/sign_in' component={ SignInComponent }/>                    
          <Route path='/users/sign_up' component={ SignUpComponent }/>
          <Route path='/users/sign_out' component={ SignOutComponent }/>                  
          <Route path='/' component={ SignInComponent }/>                               
        </Switch>
      </HashRouter>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet_id   : state.reducer.wallet_id,
  auth_token  : state.reducer.auth_token,
  error       : state.reducer.error,
  password    : state.reducer.password,
  cf_password : state.reducer.cf_password,  
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
