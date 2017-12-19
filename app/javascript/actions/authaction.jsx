import axios from 'axios';
import {UPDATE_MODAL, UPDATE_TOKEN, UPDATE_EMAIL, UPDATE_WALLET, UPDATE_PASSWORD, UPDATE_CFPASSWORD, SIGNIN_USER_FAILURE, SIGNIN_USER_SUCCESS, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS, SIGNOUT_USER} from '../constants/constants';

export function signinUserSuccess(auth_token, wallet_id) {
  window.localStorage.setItem('auth_token', auth_token);
  window.location.hash = '/';    
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: {
      auth_token: auth_token,
      wallet_id: wallet_id
    }
  }
}

export function signinUserFailure(error) {
  window.localStorage.removeItem('auth_token');
  return {
    type: SIGNIN_USER_FAILURE,
    payload: {
      error: error.response.data
    }
  }
}

export function signupUserSuccess(wallet_id) {
  window.location.hash = '/users/sign_in';    
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: {
      wallet_id: wallet_id
    }
  }
}

export function signupUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: {
      error: error.response.data[0]
    }
  }
}

export function signout(wallet_id) {
    window.localStorage.removeItem('auth_token');
    window.location.hash = '/users/sign_in';        
    return {
        type: SIGNOUT_USER,
        payload: {
          wallet_id: wallet_id
        }
    }
}
export function signoutAndRedirect(wallet_id) {
    return (dispatch, state) => {
        dispatch(signout(wallet_id));
    }
}

export function signinUser(wallet_id, password) {
    return dispatch => {
          return axios.post('/users/sign_in', {user: {  
          password: password,      
          wallet_id: wallet_id}
          })
          .then(response => {
            dispatch(signinUserSuccess(response.data.auth_token, wallet_id));            
          })
          .catch(error => {     
            dispatch(signinUserFailure(error));
          })
        }

}
export function signupUser(email, password, cf_password) {
  return dispatch => {
        return axios.post('/users', {user: {  
        password: password,      
        email: email,
        password_confirmation: cf_password}
        })
        .then(response => {
          dispatch(signupUserSuccess(response.data.wallet_id));            
        })
        .catch(error => {     
          dispatch(signupUserFailure(error));
        })
      }

}
export function updateWallet(wallet_id) {
  return {
    type: UPDATE_WALLET,
    payload: {
      wallet_id: wallet_id
    }
  }
}
export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD,
    payload: {
      password: password
    }
  }
}
export function updateCfPassword(cf_password) {
  return {
    type: UPDATE_CFPASSWORD,
    payload: {
      cf_password: cf_password
    }
  }
}
export function updateToken(auth_token) {
  return {
    type: UPDATE_TOKEN,
    payload: {
      auth_token: auth_token
    }
  }
}
export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    payload: {
      email: email
    }
  }
}
export function updateModal(modal) {
  return {
    type: UPDATE_MODAL,
    payload: {
      modal: modal
    }
  }
}