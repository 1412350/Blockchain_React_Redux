
import * as React from 'react';
import { Row, Col, Button, Card, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import TransactionTable from './transactionsTable'
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor() {
    super();
  }
  updateTitle(title)
  {
    this.props.updateType(title);    
  }
  render() {
    return(
      <Row>
        <Col sm="12" md="5">
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
        <Col sm="12" md="7">
          <div className="wallet-card">
            <Card className="card-balance">
              <CardTitle>GET USER WALLET</CardTitle>
              <p className="description">Choose a user with user's email to show that user's wallet id <br></br>(This is a help for send BTC transactions)</p>              
              <hr/>
              <p className="description">User's Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select onChange={(e) => this.props.handleChange(this.props.users[e.target.value].wallet_id)} id="soflow-color">
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
              <CardTitle>{this.props.type}</CardTitle>
              <ul className="card-filters">
                <li className={(this.props.type === "ALL ACTIVITY") ? "active" : ""} onClick={(e) => this.updateTitle("ALL ACTIVITY")}><a>All</a></li>
                <li className={(this.props.type === "RECENT ACTIVITY") ? "active" : ""} onClick={(e) => this.updateTitle("RECENT ACTIVITY")}><a>Recent activity</a></li>
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