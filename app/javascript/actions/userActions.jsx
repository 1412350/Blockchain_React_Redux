import axios from 'axios';
import {SEND_BITCOIN_SUCCESS, SEND_BITCOIN_FAILER, UPDATE_TRANSACTIONS_TYPE, UPDATE_SELECTED_VALUE, GET_ALL_USER_SUCCESS, GET_USER_WALLET_SUCCESS, GET_RECENT_TRANSACTIONS_SUCCESS, GET_RECENT_TRANSACTIONS_FAILER, GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_FAILER, ONCHANGE_RECIPIENT,
  ONCHANGE_AMOUNT,
  ONCHANGE_DESCRIPTION} from '../constants/constants'
export function getAllUserSuccess(users) { 
  return {
    type: GET_ALL_USER_SUCCESS,
    payload: {
      users: users,
    }
  }
}
export function getAllUser() {
  return dispatch => {
    return axios.get('/users')
    .then(response => {
      dispatch(getAllUserSuccess(response.data))
    })
  }
}
export function getRecentTransactionsSuccess(transactions) {
  return {
    type: GET_RECENT_TRANSACTIONS_SUCCESS,
    payload: {
      transactions: transactions,
    }
  }
}
export function getRecentTransactionsFailer(alert) {
  return {
    type: GET_RECENT_TRANSACTIONS_FAILER,
    payload: {
      alert: alert,
    }
  }
}
export function getRecentTransactions(){
  return dispatch => {
    return axios.get('/recent_transactions')
    .then(response => {
      dispatch(getRecentTransactionsSuccess(response.data))
    })
    .catch(error => {
      dispatch(getRecentTransactionsFailer(response.data))
    })
  }
}
export function getTransactionsSuccess(transactions) {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    payload: {
      transactions: transactions,
    }
  }
}
export function getTransactionsFailer(alert) {
  return {
    type: GET_TRANSACTIONS_FAILER,
    payload: {
      alert: alert,
    }
  }
}
export function getTransactionsList(){
  return dispatch => {
    return axios.get('/transactions')
    .then(response => {
      dispatch(getTransactionsSuccess(response.data))
    })
    .catch(error => {
      dispatch(getTransactionsFailer(response.data))
    })
  }
}
export function GetUserWalletSuccess(balance, email, wallet_id){
  return {
    type: GET_USER_WALLET_SUCCESS,
    payload: {
      balance: balance,
      email: email,
      wallet_id: wallet_id
    }
  }
}
export function UpdateSelectedValue(selectedValue){
  return {
    type: UPDATE_SELECTED_VALUE,
    payload: {
      selectedValue: selectedValue
    }
  }
}
export function UpdateTransactionType(type){
  return {
    type: UPDATE_TRANSACTIONS_TYPE,
    payload: {
      type: type
    }
  }
}
export function GetUserWallet(){
  const auth_token = window.localStorage.getItem('auth_token');
  return dispatch => {
    return axios.get(`/users/${auth_token}`)
    .then(response => {
      dispatch(GetUserWalletSuccess(
      response.data.account_balance,
      response.data.email,
      response.data.wallet_id
      ))
    })
  }
}
export function SendBitcoinFailer(error) {
  return {
    type: SEND_BITCOIN_FAILER,
    payload: {
      error: error,
    }
  }
}
export function SendBitcoinSuccess(modal) {
  return {
    type: SEND_BITCOIN_SUCCESS,
    payload: {
      modal: modal,
    }
  }
}
export function SendBitcoin(recipient, wallet_id, amount, description, type){
  console.log("hellolllollo")
  console.log(description)
  return dispatch => {
    return axios.post('/transactions', {transaction: {  
      recipient_wallet_id: recipient,
      sender_wallet_id: wallet_id,      
      amount: parseFloat(amount),
      description: description}
      })
      .then(response => {
        if (type === "ALL ACTIVITY")
        dispatch(getTransactionsList());
        else
        dispatch(getRecentTransactions());
        dispatch(GetUserWallet());
        dispatch(SendBitcoinSuccess(false))
      })
      .catch(error => {
        dispatch(SendBitcoinFailer(error.response.data))
      })
  }
}
export function onChangeRecipient(recipient_wallet_id) {
  return {
    type: ONCHANGE_RECIPIENT,
    payload: {
      recipient: recipient_wallet_id
    }
  }
}
export function onChangeAmount(amount) {
  return {
    type: ONCHANGE_AMOUNT,
    payload: {
      amount: amount
    }
  }
}
export function onChangeDescription(description) {
  return {
    type: ONCHANGE_DESCRIPTION,
    payload: {
      description: description
    }
  }
}