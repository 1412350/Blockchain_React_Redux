import * as React from 'react';
import { Input, Label, Button, FormGroup, Container, Form } from 'reactstrap';
import SigninContainer from '../containers/SigninContainer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent } from 'react';
export default class SignUp extends React.Component {
  constructor() {
    super();
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(name, value) {
    this.setState({[name]: value});
  }
  handleAddRecord(e) {
    e.preventDefault();
    axios.post('/users', {user: {
      password: this.state["password"],      
      cf_password: this.state["cfpassword"],
      email: this.state["email"],
    }
    })
    .then(response => {
      console.log(response.data)      
      this.props.updateWallet(response.data.wallet_id);
      window.location.hash = '/users/sign_in';  
    })
    .catch(error => {     
      this.setState({
        error: error.response.data[0]
      });
    })
    this.defaultRecord(this.state.error);    
  }

  render() {
    return(
      <SigninContainer title="Create your Wallet" description="Sign up for a free wallet below">
        <Form action="/users" method="post" onSubmit={this.handleAddRecord.bind(this)}>
         <FormGroup>
           <div id='login-alert'>
             { this.state.error != '' ? <p>{this.state.error}</p> : <span></span> }
           </div>
           <Label className="login-label">Email</Label>
           <Input type="text" name="email" value={this.state.email}
                  onChange={(e) => this.updateInput(e.target.name, e.target.value)}/>
         </FormGroup>
         <FormGroup>
           <Label className="login-label">Password</Label>
           <Input type="password" name="password" 
           onChange={(e) => this.updateInput(e.target.name, e.target.value)}/>
         </FormGroup>
         <FormGroup>
           <Label className="login-label">Confirm Password</Label>
           <Input type="password" name="cfpassword" 
           onChange={(e) => this.updateInput(e.target.name, e.target.value)}/>
         </FormGroup>
         <Button type="submit" className="btn btn-login" block={true}>Sign up</Button>
        </Form>
        <Link to="/users/sign_in" className="link">Sign In</Link>
      </SigninContainer>
    )
  }
}
