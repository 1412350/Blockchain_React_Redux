
import * as React from 'react';

export default class SignOut extends React.Component {  
  render() {
    window.localStorage.setItem('auth_token', '');
    window.location.hash = '/users/sign_in';
    return null;
  }
}