import * as React from 'react';
import { Input, Label, Button, FormGroup, Container, Form } from 'reactstrap';
import SigninContainer from '../containers/SigninContainer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent } from 'react';
import * as actionCreators from '../actions/authaction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignUp extends React.Component {
  constructor() {
    super();
    this.updateCfPassword = this.updateCfPassword.bind(this);        
    this.updateEmail = this.updateEmail.bind(this);   
    this.updatePassword = this.updatePassword.bind(this);        
  }

  updateEmail(email) {
    this.props.actions.updateEmail(email);
  }
  updateCfPassword(cf_password) {
    this.props.actions.updateCfPassword(cf_password);
  }
  updatePassword(password) {
    this.props.actions.updatePassword(password);
  }
  handleAddRecord(e) {
    e.preventDefault();
    this.props.actions.signupUser(this.props.email, this.props.password, this.props.cf_password);    
  }

  render() {
    return(
      <SigninContainer title="Create your Wallet" description="Sign up for a free wallet below">
        <Form action="/users" method="post" onSubmit={this.handleAddRecord.bind(this)}>
         <FormGroup>
           <div id='login-alert'>
             { this.props.error != '' ? <p>{this.props.error}</p> : <span></span> }
           </div>
           <Label className="login-label">Email</Label>
           <Input type="text" name="email" 
                  onChange={(e) => this.updateEmail(e.target.value)}/>
         </FormGroup>
         <FormGroup>
           <Label className="login-label">Password</Label>
           <Input type="password" name="password" 
           onChange={(e) => this.updatePassword(e.target.value)}/>
         </FormGroup>
         <FormGroup>
           <Label className="login-label">Confirm Password</Label>
           <Input type="password" name="cfpassword" 
           onChange={(e) => this.updateCfPassword(e.target.value)}/>
         </FormGroup>
         <Button type="submit" className="btn btn-login" block={true}>Sign up</Button>
        </Form>
        <Link to="/users/sign_in" className="link">Sign In</Link>
      </SigninContainer>
    )
  }
}
const mapStateToProps = (state) => ({
  wallet_id   : state.reducer.wallet_id,
  email       : state.reducer.email,  
  password    : state.reducer.password,  
  cf_password : state.reducer.cf_password,    
  error       : state.reducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
