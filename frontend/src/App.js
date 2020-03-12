import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Query from './Query';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { number: '', response: '', responseToPost: '' };
  }

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res }));
  }

  callApi = async () => {
    const response = await fetch('/history');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body.response.map(
      (q) => <Query ip={q.ip} timestamp={q.timestamp} source={q.source} result={q.result} />,
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { source } = this.state;
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: source.number }),
    });
    const body = await response.json();

    this.setState({ responseToPost: body.result });
  };

  render() {
    const { number, response, responseToPost } = this.state;
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
                    type="number"
                    value={number}
                    onChange={(e) => this.setState({ number: e.target.value })}
                    placeholder="enter index number"
                  />
                  <button type="submit">Calculate</button>
                </form>
                <p>
Output:
                  {responseToPost}
                </p>
              </Route>
              <Route path="/history">
                <p>
                  <strong>History of Queries</strong>
                </p>
                <div className="wrapper">
                  {response}
                </div>
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
