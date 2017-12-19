import {SEND_BITCOIN_FAILER, GET_ALL_USER_SUCCESS, 
    UPDATE_TRANSACTIONS_TYPE, UPDATE_SELECTED_VALUE, 
    GET_USER_WALLET_SUCCESS, UPDATE_MODAL,
    GET_RECENT_TRANSACTIONS_SUCCESS, 
    GET_RECENT_TRANSACTIONS_FAILER, 
    GET_TRANSACTIONS_SUCCESS, SEND_BITCOIN_SUCCESS,
    GET_TRANSACTIONS_FAILER,
    ONCHANGE_RECIPIENT,
    ONCHANGE_AMOUNT,
    ONCHANGE_DESCRIPTION} from '../constants/constants'
import {createReducer} from '../utils';

const initialState = {
  wallet_id: "",
  modal: false,
  balance: 1000, 
  email: "",
  alert: "",
  error: "",
  transactions: [],
  users: [],
  selectedvalue: "",
  type: "RECENT ACTIVITY",
  recipient_wallet_id: "",
  amount: "",
  description: ""
}

export default createReducer(initialState, {
    [UPDATE_TRANSACTIONS_TYPE]: (state, payload) => {
        return Object.assign({}, state, {
            'type': payload.type,
        });
    },
    [UPDATE_SELECTED_VALUE]: (state, payload) => {
        return Object.assign({}, state, {
            'selectedvalue': payload.selectedValue,
        });
    },
    [GET_USER_WALLET_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'balance': payload.balance,
            'email'  :  payload.email,
            'wallet_id': payload.wallet_id
        });
    },
    [GET_RECENT_TRANSACTIONS_SUCCESS]: (state, payload) => {       
        return Object.assign({}, state, {
            'transactions': payload.transactions,
        });
    },
    [GET_RECENT_TRANSACTIONS_FAILER]: (state, payload) => {
      return Object.assign({}, state, {
          'alert' : payload.alert
      });
    },
    [GET_TRANSACTIONS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
          'transactions': payload.transactions,

        });
    },
    [GET_TRANSACTIONS_FAILER]: (state, payload) => {
        return Object.assign({}, state, {
          'alert' : payload.alert
        });
    },
    [GET_ALL_USER_SUCCESS]: (state, payload) => {
        console.log(payload.users)
        return Object.assign({}, state, {
          'users': payload.users,
          'selectedvalue' : payload.users[0].wallet_id
        });
    },
    [SEND_BITCOIN_FAILER]: (state, payload) => {
      console.log(payload.users)
      return Object.assign({}, state, {
        'error': payload.error,
      });
    },
    [SEND_BITCOIN_SUCCESS]: (state, payload) => {
        console.log(payload.users)
        return Object.assign({}, state, {
          'modal': payload.modal,
        });
    },
    [ONCHANGE_RECIPIENT]: (state, payload) => {
        console.log(payload.users)
        return Object.assign({}, state, {
          'recipient_wallet_id': payload.recipient,
        });
    },
    [ONCHANGE_AMOUNT]: (state, payload) => {
        console.log(payload.users)
        return Object.assign({}, state, {
          'amount': payload.amount,
          'error': ""
        });
    },
    [ONCHANGE_DESCRIPTION]: (state, payload) => {
        console.log(payload.users)
        return Object.assign({}, state, {
          'description': payload.description,
        });
    },
    [UPDATE_MODAL]: (state, payload) => {
        return Object.assign({}, state, {
          'modal': payload.modal,
          'error': ""
        });
    },
});
