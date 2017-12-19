/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { initialState, reducer } from '../reducers/reducer';
import MainContainer from '../containers/MainContainer';
import configureStore from '../store/configureStore';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import SignOut from '../components/signout';
import DashboardContainer from '../containers/DashboardContainer';
import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
const store = configureStore()
const SignInComponent = () => {
  const auth_token = window.localStorage.getItem('auth_token'); 
  if (auth_token != "" && auth_token != null) {
  return null;
  }
  else {
    return (
      <SignIn/>
    );
  }
}
const SignUpComponent = () => {
  const auth_token = window.localStorage.getItem('auth_token');
  if (auth_token != "" && auth_token != null) {
    window.location.hash = '/home';
    return null;
  }
  else {
    window.location.hash = '/users/sign_up';    
    return (
      <SignUp/>
    );
  }
}
const HomeComponent = () => {
  const auth_token = window.localStorage.getItem('auth_token');
  console.log(auth_token)
  console.log("ddk")  
  if (auth_token != "" && auth_token != null) {
    window.location.hash = '/home';
  console.log("ddk")      
    return (
      <DashboardContainer/>
    );
  }
  else {
  console.log("adadd")      
    
    window.location.hash = '/users/sign_in';
    return (
      <SignIn/>          
    );
  }
}
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    <Switch>
      <Route path='/users/sign_in' component={ SignIn }/>                    
      <Route path='/users/sign_up' component={ SignUp}/>
      <Route path='/users/sign_out' component={ SignOut}/>      
      <Route path='/' component={ DashboardContainer}/>                               
    </Switch>
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);


