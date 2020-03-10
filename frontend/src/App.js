import React, { Component } from 'react';
import Query from './Query';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

class App extends Component {
  state = {
    number: '',
    result: '',
    response: '',
    responseToPost: ''
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/history');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    const items = body.response.map((query) => <Query query={query}/>);

    return items;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: this.state.number }),
    });
    const body = await response.json();
    
    this.setState({ responseToPost: body.result });
  };
  
render() {
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
                value={this.state.number}
                onChange={e => this.setState({ number: e.target.value })}
                placeholder="enter index number"
              />
              <button type="submit">Calculate</button>
            </form>
            <p>Output: {this.state.responseToPost}</p>
          </Route>
          <Route path="/history">
            <p>
              <strong>History of Queries:</strong>
            </p>
            {this.state.response}
          </Route>
        </Switch>
        </Router>
        </header>
      </div>
    );
  }
}

export default App;
