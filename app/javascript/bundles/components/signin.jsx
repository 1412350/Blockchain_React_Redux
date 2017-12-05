
import * as React from 'react';
import { Input, Label, Button, FormGroup, Container, Form } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { render } from 'react-dom';
import SigninContainer from '../containers/SigninContainer';
import Signup from './signup';
import WalletForm from './walletform';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent } from 'react';
export default class SignIn extends React.Component {
  constructor() {
    super();
    this.defaultRecord("");
    this.updateInput = this.updateInput.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  
  componentWillMount() {
    this.setState({wallet_id: this.props.wallet_id})
    this.getUsers()
  }

  updateWallet(id)
  {
    this.setState({wallet_id: id});
  }

  updateInput(name, value) {
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/users/sign_in', {user: {  
    password: this.state["password"],      
    cf_password: this.state["cfpassword"],
    wallet_id: this.state["wallet_id"]}
    })
    .then(response => {
      window.localStorage.setItem('auth_token', response.data.auth_token);
      this.props.updateToken();
      window.location.hash = '/';
    })
    .catch(error => {
      this.setState({
        error: error.response.data
      });
    })
    this.defaultRecord(this.state.error);    
  }

  defaultRecord(error) {
    this.state = {wallet_id: "", password: "", error: error, cfpassword: "", modal: false, users: []}
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange(value) {
    this.setState({wallet_id: this.state.users[value].wallet_id})
    this.toggleModal()
  }

  getUsers() {
    axios.get('/users')
    .then(response => {
      this.setState({
        users: response.data,
      })
    })
    .catch(error => {
    })
  }
  render() {
    return(
      <SigninContainer title="Welcome Back!" description="Sign in to your wallet below">
        <Form action="/users/sign_in" method="post" onSubmit={this.handleSubmit.bind(this)}>
         <FormGroup>
           <div id='login-alert'>
             { this.state.error != '' ? <p>{this.state.error}</p> : <span></span> }
           </div>
           <Label className="login-label">Wallet ID</Label>
           <Input type="text" name="wallet_id" value={this.state.wallet_id}
                  onChange={(e) => this.updateInput(e.target.name, e.target.value)}/>
         </FormGroup>
         <FormGroup>
           <Label className="login-label">Password</Label>
           <Input type="password" name="password" 
           onChange={(e) => this.updateInput(e.target.name, e.target.value)}/>
         </FormGroup>
         <Button type="submit" className="btn btn-login" block={true}>Login</Button>
        </Form>
        Forgot your wallet?<span className="link-forgot" onClick={this.toggleModal.bind(this)}>Click here!</span>        
        <Link to="/users/sign_up" className="link">Sign up</Link>
        <Modal isOpen={this.state.modal}>
          <ModalHeader >
          <i className="send-icon">Get wallet id</i>    
          <Button onClick={this.toggleModal.bind(this)} className="btn btn-close">
            X
          </Button>
          </ModalHeader>
          <hr/>
          <ModalBody>
            <WalletForm users={this.state.users} 
                        handleChange={this.handleChange.bind(this)}></WalletForm>
          </ModalBody>
        </Modal>
      </SigninContainer>
    )
  }
}
