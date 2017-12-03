
import * as React from 'react';
import { Input, Label, Button, FormGroup, Container, Form } from 'reactstrap';
import { render } from 'react-dom';
import SigninContainer from '../containers/SigninContainer';
import Signup from './signup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent } from 'react';
export default class SignIn extends React.Component {
  constructor() {
    super();
    this.defaultRecord("");
    this.updateInput = this.updateInput.bind(this);
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
      console.log(this.props.state);
      window.location.hash = '/';
    })
    .catch(error => {
      console.log(error.response)
      this.setState({
        error: error.response.data
      });
    })
    this.defaultRecord(this.state.error);    
  }

  defaultRecord(error) {
    this.state = {wallet_id: "", password: "", cfpassword: "", error: error}
  }

  render() {
    return(
      <SigninContainer title="Sign in" description="Sign in to your wallet">
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
        <Link to="/users/sign_up" className="link">Sign up</Link>
      </SigninContainer>
    )
  }
}
