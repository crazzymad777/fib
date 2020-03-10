import React, {Component} from 'react';

class Query extends Component {
    render() {
        return (
            <div class="query">
                <p>{this.props.query.ip}</p>
                <p>{this.props.query.timestamp}</p>
                <p>{this.props.query.source}</p>
                <p>{this.props.query.result}</p>
            </div>
        );
    }
}

export default Query;
