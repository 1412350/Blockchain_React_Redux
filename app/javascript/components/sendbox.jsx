
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
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSendBitcoin(this.props.recipient_wallet_id, this.props.wallet_id, this.props.amount, this.props.description, this.props.type);  
  }

  render() {
    return(
      <Form className="send-form" onSubmit={this.handleSubmit.bind(this)}>
       <FormGroup>
         <div id='login-alert'>
           { this.props.error != '' ? <p>{this.props.error}</p> : ""}
         </div>
         <Label className="form-label">To: </Label>
         <Input className="description" type="text" name="recipient_wallet_id" placeholder="Paste a wallet id of Recipient"
                onChange={(e) => this.props.onChangeRecipient(e.target.value)} required="true"/>
       </FormGroup>
       <FormGroup>
         <Label className="form-label">Amount: </Label>
         <InputGroup>
          <Input className="description" type="text" name="amount" placeholder="0" required="true"
          onChange={(e) => this.props.onChangeAmount(e.target.value)}/>
          <InputGroupAddon>BTC</InputGroupAddon>
         </InputGroup>
       </FormGroup>
       <FormGroup>
         <Label className="form-label">Description</Label>
         <Input className="description" type="textarea" name="description" placeholder="Description of this transaction" required="true"
         onChange={(e) => this.props.onChangeDescription(e.target.value)}/>
       </FormGroup>
       <Button type="submit" className="btn btn-send" block={true}>Send</Button>
      </Form>
    )
  }
}
