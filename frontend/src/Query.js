import React, {Component} from 'react';

class Query extends Component {
    render() {
        return (
            <div class="query">
                <p class="alpha">IP: {this.props.query.ip}</p>
                <p class="beta">Timestamp: {this.props.query.timestamp}</p>
                <p class="gamma">Index: {this.props.query.source}</p>
                <p class="delta">Result: {this.props.query.result}</p>
            </div>
        );
    }
}

export default Query;
