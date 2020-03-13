import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import QueryHistory from './QueryHistory';

import './App.css';

const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      number: '', responseToPost: '', alert: '', data: [], offset: 0, limit: 10, pageCount: 0,
    };
  }

  componentDidMount() {
    const { offset, limit } = this.state;
    this.loadHistoryAndChangeState(offset, limit);
  }

  loadHistoryAndChangeState = (offset, limit) => {
    this.loadHistory(offset, limit).then((response) => this.setState({
      pageCount: Math.ceil(response.count / limit),
      data: response.rows,
    }));
  };

  loadHistory = async (offset, limit) => axios.get('/history', { params: { offset, limit } }).then((response) => {
    const body = response.data;
    if (response.status !== 200) throw Error(body.message);

    return body.response;
  });

  handlePageClick = (data) => {
    const { limit } = this.state;
    const { selected } = data;
    const offset = Math.ceil(selected * limit);

    this.setState({ offset }, () => {
      this.loadHistoryAndChangeState(offset, limit);
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { number } = this.state;
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number }),
    });
    const body = await response.json();

    if (Object.prototype.hasOwnProperty.call(body, 'error')) {
      if (Object.prototype.hasOwnProperty.call(body.error, 'message')) {
        this.setState({ alert: body.error.message });
      } else {
        throw body;
      }
      return;
    }

    this.setState({ responseToPost: body.result, alert: '' });
  };

  render() {
    const {
      number, data, responseToPost, alert, pageCount,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/calculate" className="App-link">Calculate</Link>
                </li>
                <li>
                  <Link to="/history" className="App-link">History</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/calculate">
                <form onSubmit={this.handleSubmit}>
                  <p>
                    <strong>Index number:</strong>
                  </p>
                  <input
                    className="form-control"
                    type="number"
                    value={number}
                    onChange={(e) => this.setState({ number: e.target.value })}
                    placeholder="enter index number"
                  />
                  <button type="submit" className="btn btn-primary">Calculate</button>
                </form>
                <p>
                  Output:
                  { ' ' }
                  {responseToPost}
                </p>
              </Route>
              <Route path="/history">
                <p>
                  <strong>History of Queries</strong>
                </p>
              </Route>
            </Switch>
            <div className="alert">
              {alert}
            </div>
            <Route path="/history">
              <div className="wrapper">
                <QueryHistory data={data} />
              </div>
              <ReactPaginate
                previousLabel="previous"
                nextLabel="next"
                breakLabel="..."
                breakClassName="break-me"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
              />
            </Route>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
