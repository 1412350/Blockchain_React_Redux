
import * as React from 'react';
import { Input, Label, Button, FormGroup, Container, Form } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { render } from 'react-dom';
import SigninContainer from '../containers/SigninContainer';
import Signup from './signup';
import WalletForm from './walletform';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent } from 'react';
import * as actionCreators from '../actions/authaction';
import * as useractions from '../actions/userActions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
  constructor() {
    super();
    this.updateWallet = this.updateWallet.bind(this);   
    this.updatePassword = this.updatePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);        
  }
  updateWallet(wallet_id) {
    this.props.auth_actions.updateWallet(wallet_id);
  }
  updatePassword(password) {
    this.props.auth_actions.updatePassword(password);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.auth_actions.signinUser(this.props.wallet_id, this.props.password);     
  }
  toggleModal() {
    this.props.auth_actions.updateModal(!this.props.modal)
  }
  handleChange(value) {
    this.updateWallet(this.props.users[value].wallet_id)
    this.toggleModal();
  }
  componentWillMount() {
    this.props.user_actions.getAllUser();
    this.props.auth_actions.updateModal(false);
  }
  render() {
    return(
      <SigninContainer title="Welcome Back!" description="Sign in to your wallet below">
        <Form action="/users/sign_in" method="post" onSubmit={this.handleSubmit.bind(this)}>
         <FormGroup>
           <div id='login-alert'>
             { this.props.error != '' ? <p>{this.props.error}</p> : <span></span> }
           </div>
           <Label className="login-label">Wallet ID</Label>
           <Input type="text" name="wallet_id" value={this.props.wallet_id}
                  onChange={(e) => this.updateWallet(e.target.value)}/>
         </FormGroup>
         <FormGroup>
           <Label className="login-label">Password</Label>
           <Input type="password" name="password" value={this.props.password}
           onChange={(e) => this.updatePassword(e.target.value)}/>
         </FormGroup>
         <Button type="submit" className="btn btn-login" block={true}>Login</Button>
        </Form>
        Forgot your wallet?<span className="link-forgot" onClick={this.toggleModal.bind(this)}>Click here!</span>        
        <Link to="/users/sign_up" className="link">Sign up</Link>
        <Modal isOpen={this.props.modal}>
          <ModalHeader >
          <i className="send-icon">Get wallet id</i>    
          <Button onClick={this.toggleModal.bind(this)} className="btn btn-close">
            X
          </Button>
          </ModalHeader>
          <hr/>
          <ModalBody>
            <WalletForm users={this.props.users} 
                        handleChange={this.handleChange.bind(this)}></WalletForm>
          </ModalBody>
        </Modal>
      </SigninContainer>
    )
  }
}
const mapStateToProps = (state) => ({
  wallet_id   : state.reducer.wallet_id,
  password    : state.reducer.password, 
  error       : state.reducer.error,
  users       : state.reducer.users,
  modal       : state.reducer.modal
});

const mapDispatchToProps = (dispatch) => ({
  auth_actions : bindActionCreators(actionCreators, dispatch),
  user_actions : bindActionCreators(useractions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
