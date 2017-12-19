
import * as React from 'react';
import { Row, Col, Button, Card, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Moment from 'moment'
import axios from 'axios'
export default class TransactionTable extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
    }
  }
  get_time(time) {
    Moment.locale('vn') 
    const formattedDate = Moment(time).format('LT')
    const formatTime = Moment(time).format('LL')
    return formatTime + " " + formattedDate
  }
  render() {   
    return(
      <Table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Description</th>  
            <th>Send at</th>                                              
          </tr>
        </thead>
        <tbody>
          {this.props.transactions.map((e, i) => ( 
            <tr key={i}>
              <td>{e.sender_wallet}</td>
              <td>{e.recipient_wallet}</td>
              <td>{e.amount}</td>
              <td className="des">{e.description}</td>
              <td> {this.get_time(e.created_at)}</td>              
            </tr>
          ))
          }
        </tbody>
      </Table>
    )
  }
}