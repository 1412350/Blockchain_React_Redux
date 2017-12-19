import {UPDATE_TOKEN, UPDATE_MODAL, UPDATE_EMAIL, UPDATE_WALLET, UPDATE_PASSWORD, UPDATE_CFPASSWORD, SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS, SIGNIN_USER_FAILURE, SIGNOUT_USER, GET_ALL_USER_SUCCESS} from '../constants/constants';
import {createReducer} from '../utils';

const initialState = {
  wallet_id: "", 
  password: "",
  cf_password: "", 
  email: "",
  error: "", 
  modal: false, 
  users: [],
  auth_token: ""
};

export default createReducer(initialState, {
    [SIGNIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'wallet_id': payload.wallet_id,
            'error': "",
            'auth_token': payload.auth_token
        });
    },
    [SIGNIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'wallet_id': "",
            'error': payload.error,
            'auth_token': "", 
            'password': ""
        });
    },
    [SIGNUP_USER_SUCCESS]: (state, payload) => {
      return Object.assign({}, state, {
          'wallet_id': payload.wallet_id,
          'error': "",
          'auth_token': ""
      });
    },
    [SIGNUP_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'wallet_id': "",
            'error': payload.error,
            'auth_token': "",
            'password': "",
            'cf_password': ""

        });
    },
    [SIGNOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
          'wallet_id': payload.wallet_id,
          'error': "",
          'auth_token': ""
        });
    },
    [UPDATE_WALLET]: (state, payload) => {
      return Object.assign({}, state, {
        'wallet_id': payload.wallet_id,
      });
    },
    [UPDATE_PASSWORD]: (state, payload) => {
      return Object.assign({}, state, {
        'password': payload.password,
      });
    },
    [UPDATE_CFPASSWORD]: (state, payload) => {
      return Object.assign({}, state, {
        'cf_password': payload.cf_password,
      });
    },
    [UPDATE_TOKEN]: (state, payload) => {
      return Object.assign({}, state, {
        'auth_token': payload.token,
      });
    },
    [UPDATE_EMAIL]: (state, payload) => {
      return Object.assign({}, state, {
        'email': payload.email,
      });
    },
    [UPDATE_MODAL]: (state, payload) => {
      return Object.assign({}, state, {
        'modal': payload.modal,
      });
    },
    [GET_ALL_USER_SUCCESS]: (state, payload) => {
      return Object.assign({}, state, {
        'users': payload.users,
      });
    }
});
