
import * as React from 'react';
import { Row, Col, Button, Card, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import TransactionTable from './transactionsTable'
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      transaction_title: "RECENT ACTIVITY"
    }
  }
  updateTitle(title, type)
  {
    if (type == 1)
     this.props.updateType("ALL ACTIVITY");    
    else
      this.props.updateType("RECENT ACTIVITY");
    this.setState({
      transaction_title: title 
    })
    if (type == 1)
      this.props.getTransactionsList();    
    else
      this.props.getRecentTransactions();    
  }
  render() {
    return(
      <Row>
        <Col sm="12" md="4">
          <div className="wallet-card">
            <Card className="card-balance">
              <CardTitle>YOUR BALANCES</CardTitle>
              <CardText>${this.props.balance}</CardText>
              <hr/>
              <p> Your email: {this.props.email}</p>
              <p> Your wallet id: {this.props.wallet_id}</p>               
            </Card>
          </div>
        </Col>
        <Col sm="12" md="8">
          <div className="wallet-card">
            <Card className="card-balance">
              <CardTitle>GET USER WALLET</CardTitle>
              <p className="description">Choose a user with user's email to show that user's wallet id <br></br>(This is a help for send BTC transactions)</p>              
              <hr/>
              <p className="description">User's Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select onChange={(e) => this.props.handleChange(e.target.value)} id="soflow-color">
              {this.props.users.map((user, index) =>
                <option key={index} value={index}>
                 {user.email}
                </option>
               )}
              </select>       </p>
              <p>User's Wallet id: {this.props.selectedvalue}</p>        
            </Card>
          </div>
        </Col>
        <Col sm="12" md="12">
          <div className="wallet-card">
            <Card className="card-transactions">
              <CardTitle>{this.state.transaction_title}</CardTitle>
              <ul className="card-filters">
                <li className={(this.state.transaction_title === "ALL ACTIVITY") ? "active" : ""} onClick={(e) => this.updateTitle("ALL ACTIVITY", 1)}><a>All</a></li>
                <li className={(this.state.transaction_title === "RECENT ACTIVITY") ? "active" : ""} onClick={(e) => this.updateTitle("RECENT ACTIVITY", 2)}><a>Recent activity</a></li>
              </ul>  
              <hr/>
              { this.props.transactions == "There's no transaction yet!" ? <span><p>{this.props.transactions}</p></span> : <TransactionTable transactions={this.props.transactions} 
                updateTitle = {this.updateTitle.bind(this)}/>}                       
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}