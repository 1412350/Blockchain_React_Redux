
import * as React from 'react';
import { Label} from 'reactstrap';
export default class WalletForm extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <Label className="label">User's Email:&nbsp;&nbsp;&nbsp; </Label>
        <select onChange={(e) => this.props.handleChange(e.target.value)} id="soflow-color">
          <option >
           Choose a user's email
          </option>
        {this.props.users.map((user, index) =>
          <option key={index} value={index}>
           {user.email}
          </option>
         )}
        </select>
      </div>
    )
  }
}
