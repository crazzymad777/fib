import React, { Component } from 'react';

class Query extends Component {
  render() {
    return (
      <div className="query">
        <p className="alpha">
IP:
          {this.props.query.ip}
        </p>
        <p className="beta">
Timestamp:
          {this.props.query.timestamp}
        </p>
        <p className="gamma">
Index:
          {this.props.query.source}
        </p>
        <p className="delta">
Result:
          {this.props.query.result}
        </p>
      </div>
    );
  }
}

export default Query;
