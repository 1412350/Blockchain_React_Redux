import * as React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Container, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Button} from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Dashboard from '../components/dashboard'
import SendForm from '../components/sendbox'
import * as actionCreators from '../actions/authaction';
import * as useractions from '../actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DashboardContainer extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
    this.handleGetUserWallet = this.handleGetUserWallet.bind(this)
  }
  handleSendBitcoin(recipient, wallet_id, amount, description, type){
    this.props.user_actions.SendBitcoin(recipient, wallet_id, amount, description, type);
  }
  onChangeAmount(amount) {
    this.props.user_actions.onChangeAmount(amount);
  }
  onChangeRecipient(recipient_wallet_id) {
    this.props.user_actions.onChangeRecipient(recipient_wallet_id);
  }
  onChangeDescription(description) {
    this.props.user_actions.onChangeDescription(description);
  }
  toggleModal() {
    this.props.auth_actions.updateModal(!this.props.modal)    
  }
  handleChange(value) {
    console.log(value)
    this.props.user_actions.UpdateSelectedValue(value);
  }
  handleGetUserWallet() {
    this.props.user_actions.GetUserWallet();
  }
  getRecentTransactions() {
    this.props.user_actions.getRecentTransactions();    
  }
  getTransactionsList() {
    this.props.user_actions.getTransactionsList();    
  }
  updateType(type)
  {
    this.props.user_actions.UpdateTransactionType(type);
    if (type == "ALL ACTIVITY")
      this.getTransactionsList();
    else
      this.getRecentTransactions();
  }
  componentWillMount() {
    this.handleGetUserWallet();
    this.getRecentTransactions(); 
    this.props.user_actions.getAllUser();   
    console.log(this.props.type)
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
              <i className="fa fa-paper-plane"></i>
              Send
            </Button>
            <hr/>
            <Dashboard balance = {this.props.balance} email = {this.props.email} 
              wallet_id = {this.props.wallet_id} transactions = {this.props.transactions}
              getRecentTransactions={this.getRecentTransactions.bind(this)}
                getTransactionsList={this.getTransactionsList.bind(this)}
                updateType={this.updateType.bind(this)}
                users = {this.props.users}
                type = {this.props.type}
                selectedvalue= {this.props.selectedvalue}
                handleChange = {this.handleChange.bind(this)}
                />          
          </div>
          <br></br>
          <Modal isOpen={this.props.modal}>
            <ModalHeader >
            <i className="fa fa-paper-plane"></i><i className="send-icon">Send Bitcoin</i>    
            <Button onClick={this.toggleModal.bind(this)} className="btn btn-close">
              X
            </Button>
            </ModalHeader>
            <hr/>
            <ModalBody>
              <SendForm wallet_id={this.props.wallet_id} recipient_wallet_id={this.props.recipient_wallet_id}
                toggleModal ={this.toggleModal.bind(this)} amount = {this.props.amount}
                handleSendBitcoin = {this.handleSendBitcoin.bind(this)}
                onChangeAmount = {this.onChangeAmount.bind(this)} description = {this.props.description}
                onChangeRecipient = {this.onChangeRecipient.bind(this)}        
                onChangeDescription = {this.onChangeDescription.bind(this)}
                error={this.props.error}
                type ={this.props.type}></SendForm>
            </ModalBody>
        </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet_id   : state.transactions.wallet_id,
  users       : state.transactions.users,
  modal       : state.transactions.modal,
  balance     : state.transactions.balance,
  email       : state.transactions.email,
  transactions: state.transactions.transactions,
  type        : state.transactions.type,
  selectedvalue: state.transactions.selectedvalue,
  recipient_wallet_id   : state.transactions.recipient_wallet_id,
  amount   : state.transactions.amount,
  description   : state.transactions.description,  
  error   : state.transactions.error,    
});

const mapDispatchToProps = (dispatch) => ({
  auth_actions : bindActionCreators(actionCreators, dispatch),
  user_actions : bindActionCreators(useractions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
