
import * as React from 'react';

import PropTypes from 'prop-types'

export default class SigninContainer extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string, // this is passed from the Rails view
  };
  render() {
    return(
      <div className="login-pg">
        <h2 className="banner">BLOCKCHAIN</h2>
        <div className="login-box">
          <div className="row justify-content-between">
            <div className="col-md-4">
            <h3 className="title">{this.props.title}</h3>
            </div>
          </div>
        <p className="description">{this.props.description}</p>
        <hr></hr>
        {this.props.children}
        </div>
      </div>
    );
  }
}