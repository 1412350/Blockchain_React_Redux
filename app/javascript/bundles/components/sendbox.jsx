
import * as React from 'react';
import { Input, InputGroup, InputGroupAddon, Label, Button, FormGroup, Container, Form } from 'reactstrap';
import { render } from 'react-dom';
import SigninContainer from '../containers/SigninContainer';
import Signup from './signup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent } from 'react';
export default class SendForm extends React.Component {
  constructor() {
    super();
    this.defaultRecord("");
    this.onChange = this.onChange.bind(this);
  }


  onChange(name, value) {
    this.setState({[name]: value});
  }
  handleSubmit(e) {
    const mn = this.state["amount"];
    e.preventDefault();
    axios.post('/transactions', {transaction: {  
    recipient_wallet_id: this.state["recipient_wallet_id"],
    sender_wallet_id: this.props.wallet_id,      
    amount: parseFloat(this.state["amount"]),
    description: this.state["description"]}
    })
    .then(response => {
      this.props.updateState();
    })
    .catch(error => {
      console.log(error)
      this.setState({
        error: error.response.data
      });
    })
    this.defaultRecord(this.state.error);    
  }

  defaultRecord(error) {
    this.state = {recipient_wallet_id: "", amount: "", description: "", error: error}
  }

  render() {
    return(
      <Form className="send-form" onSubmit={this.handleSubmit.bind(this)}>
       <FormGroup>
         <div id='login-alert'>
           { this.state.error != '' ? <p>{this.state.error}</p> : <span></span> }
         </div>
         <Label className="form-label">To: </Label>
         <Input className="description" type="text" name="recipient_wallet_id" placeholder="Paste a wallet id of Recipient" value={this.state.wallet_id}
                onChange={(e) => this.onChange(e.target.name, e.target.value)} required="true"/>
       </FormGroup>
       <FormGroup>
         <Label className="form-label">Amount: </Label>
         <InputGroup>
          <Input className="description" type="text" name="amount" placeholder="0" required="true"
          onChange={(e) => this.onChange(e.target.name, e.target.value)}/>
          <InputGroupAddon>BTC</InputGroupAddon>
         </InputGroup>
       </FormGroup>
       <FormGroup>
         <Label className="form-label">Description</Label>
         <Input className="description" type="textarea" name="description" placeholder="Description of this transaction" required="true"
         onChange={(e) => this.onChange(e.target.name, e.target.value)}/>
       </FormGroup>
       <Button type="submit" className="btn btn-send" block={true}>Send</Button>
      </Form>
    )
  }
}
