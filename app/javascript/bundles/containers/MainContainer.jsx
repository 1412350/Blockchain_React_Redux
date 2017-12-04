import * as React from 'react';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import SignOut from '../components/signout';
import DashboardContainer from './DashboardContainer';
import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import PropTypes from 'prop-types'

export default class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      auth_token: "",
      wallet_id: ""
    }
  }
  static propTypes = {
    auth_token: PropTypes.string, // this is passed from the Rails view
    wallet_id: PropTypes.string
  };

  componentWillMount() {
    this.updateToken();
  }

  updateToken() {
    this.setState({
      auth_token: window.localStorage.getItem('auth_token')
    })
  }

  updateWallet(id) {
    this.setState({
      wallet_id: id
    })
  }


  render() {
    const SignInComponent = () => {
      if (this.state.auth_token != "" && this.state.auth_token != null) {
        window.location.hash = '/';
        return null;
      }
      else {
        return (
          <SignIn updateToken={this.updateToken.bind(this)} updateWallet={this.updateWallet.bind(this)} wallet_id={this.state.wallet_id}/>
        );
      }
    }

    const SignUpComponent = () => {
      if (this.state.auth_token != "" && this.state.auth_token != null) {
        window.location.hash = '/';
        return null;
      }
      else {
        return (
          <SignUp updateWallet={this.updateWallet.bind(this)}/>
        );
      }
    }
    const SignOutComponent = () => {
      if (this.state.auth_token != "") {
        this.setState({
          auth_token: ""
        });      
        return (
          <SignOut/>
        );
      }
      return null;
    }
    const HomeComponent = () => {
      if (this.state.auth_token != "" && this.state.auth_token != null) {
        window.location.hash = '/';
        return (
          <DashboardContainer/>
        );
      }
      else {
        return (
          <SignIn updateToken={this.updateToken.bind(this)} updateWallet={this.updateWallet.bind(this)} wallet_id={this.state.wallet_id}/>          
        );
      }
    }
    return (
      <HashRouter>
        <Switch>
          <Route path='/users/sign_in' component={ SignInComponent }/>                    
          <Route path='/users/sign_up' component={ SignUpComponent }/>
          <Route path='/users/sign_out' component={ SignOutComponent }/>                  
          <Route path='/' component={ HomeComponent }/>              
                   
        </Switch>
      </HashRouter>
    );
  }
}