
import * as React from 'react';

import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Container, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Button} from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Dashboard from '../components/dashboard'
import SendForm from '../components/sendbox'
export default class DashboardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      wallet_id: "",
      email: "",
      balance: 1000, 
      alert: "",
      transactions: [],
      users: [],
      selectedvalue: "",
      type: "RECENT ACTIVITY"
    }
    this.handleChange = this.handleChange.bind(this)

  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleChange(value) {
    this.setState({selectedvalue: this.state.users[value].wallet_id})
  }
  getRecentTransactions() {
    axios.get('/recent_transactions')
    .then(response => {
      this.setState({
        transactions: response.data
      })
      window.location.hash = '/';
    })
    .catch(error => {
      this.setState({
        alert: response.data
      })
    })
  }
  getUsers() {
    axios.get('/users')
    .then(response => {
      this.setState({
        users: response.data,
        selectedvalue: response.data[0].wallet_id     
      })
    })
    .catch(error => {
    })
  }
  getTransactionsList() {
    axios.get('/transactions')
    .then(response => {
      this.setState({
        transactions: response.data
      })
      window.location.hash = '/';
    })
    .catch(error => {
      this.setState({
        alert: response.data
      })
    })
  }
  handleGetUserWallet() {
    const auth_token = window.localStorage.getItem('auth_token');
    axios.get(`/users/${auth_token}`)
    .then(response => {
      this.setState({
        wallet_id: response.data.wallet_id,
        balance: response.data.account_balance,
        email: response.data.email
      })
      window.location.hash = '/';
    })
    .catch(error => {
    })
  }
  componentWillMount() {
    this.handleGetUserWallet();
    this.getRecentTransactions();    
    this.getUsers();
  }
  updateType(type)
  {
    this.setState({
      type: type
    })
  }
  updateState(type)
  {
    this.toggleModal();    
    this.handleGetUserWallet();
    if (type == "ALL ACTIVITY")
      this.getTransactionsList();
    else
      this.getRecentTransactions();
  }
  render() {
    return(
      <div>
        <Navbar className="nav-header" expand="md">
          <NavbarBrand className="banner">BLOCKCHAIN</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/#/users/sign_out">SIGN OUT</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="wallet-container">
          <div className="wallet-info">
            <h3 className="wallet-header">BE YOUR OWN BANK.
              <span className="wallet-copyright">®</span>
            </h3>
            <Button className="btn-wallet" onClick={this.toggleModal.bind(this)}>
              <i className="send-icon fa fa-paper-plane"></i>
              Send
            </Button>
            <hr/>
            <Dashboard balance = {this.state.balance} email = {this.state.email} 
              wallet_id = {this.state.wallet_id} transactions = {this.state.transactions}
              getRecentTransactions={this.getRecentTransactions.bind(this)}
                getTransactionsList={this.getTransactionsList.bind(this)}
                updateType={this.updateType.bind(this)}
                users = {this.state.users}
                selectedvalue= {this.state.selectedvalue}
                handleChange = {this.handleChange.bind(this)}/>             
          </div>
          <br></br>
          <Modal isOpen={this.state.modal}>
            <ModalHeader >
            <i className="send-icon fa fa-paper-plane">Send Bitcoin</i>    
            <Button onClick={this.toggleModal.bind(this)} className="btn btn-close">
              X
            </Button>
            </ModalHeader>
            <hr/>
            <ModalBody>
              <SendForm wallet_id={this.state.wallet_id} 
                          updateState={this.updateState.bind(this)}></SendForm>
            </ModalBody>
        </Modal>
        </div>
      </div>
    );
  }
}