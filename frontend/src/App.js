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

import axios from './axios-settings';

/**
 * class App represents frontend.
 * @component
 */

class App extends Component {
  /**
   * App constructor
   * @param {object} props - properties of react component
   */
  constructor(props) {
    super(props);
    /**
     * @property {number} state.number - entered number
     * @property {number} state.responseToPost - calculated number
     * @property {string} state.alert - error message which will show
     * @property {Array.<{ip, timestamp, source, result}>} state.data - array of queries
     * @property {number} state.offset - pagination offset
     * @property {number} state.limit - total number of queries in one page
     * @property {number} state.pageCount - total number of pages for queries
     * @property {boolean} state.showingAlert - show or hide alert block
     * @property {number} state.timeoutId - ID of timer which hide alert message
     */
    this.state = {
      number: 0, responseToPost: 0, alert: '', data: [], offset: 0, limit: 10, pageCount: 0, showingAlert: false, timeoutId: 0,
    };
  }

  /**
   * Called when component did mount. Loads history and updates states.
   */
  componentDidMount() {
    const { offset, limit } = this.state;
    this.loadHistoryAndChangeState(offset, limit);
  }

  /**
     * Call loadHistory and changes count and data states.
     * @param {number} offset
     * @param {number} limit
     */
  loadHistoryAndChangeState = (offset, limit) => {
    this.loadHistory(offset, limit).then((response) => this.setState({
      pageCount: Math.ceil(response.count / limit),
      data: response.rows,
    }));
  };

  /**
   * Loads queries with given offset and limit.
   * @param {number} offset - query offset
   * @param {number} limit - query limit
   * @returns {{count: number,
   * rows: Array.<{ip, timestamp, source, result}>}}
   * object containing count and rows which is array of queries.
   */
  loadHistory = async (offset, limit) => axios.get('/history', { params: { offset, limit } }).then((response) => {
    const body = response.data;
    if (response.status !== 200) throw Error(body.message);

    return body.response;
  });

  /**
     * Handle click on pagination item
     * @param data
     */
  handlePageClick = (data) => {
    const { limit } = this.state;
    const { selected } = data;
    const offset = Math.ceil(selected * limit);

    // Reload history
    this.setState({ offset }, () => {
      this.loadHistoryAndChangeState(offset, limit);
    });
  };

  /**
   * Requires backend to calculate fibonacci number.
   * @param number
   * @returns {Promise<*>} Content of response.
   */
  calculate = async (number) => axios.get('/calculate', { params: { number } }).then((response) => (
    response.data
  ));

  /**
     * Handle click on calculate button
     * @param {event} e - Event object
     */
  handleSubmit = async (e) => {
    e.preventDefault();
    // Send query to backend and wait response.
    const { number } = this.state;
    const body = await this.calculate(number);

    if (Object.prototype.hasOwnProperty.call(body, 'error')) {
      // Something went wrong on server side
      if (Object.prototype.hasOwnProperty.call(body.error, 'message')) {
        // Show message. It will be hidden it after 2 seconds. Clear Timer to avoid repeats.
        const { timeoutId } = this.state;
        clearTimeout(timeoutId);
        this.setState({
          alert: body.error.message,
          showingAlert: true,
          timeoutId: setTimeout(() => {
            this.setState({
              showingAlert: false,
            });
          }, 2000),
        });
      } else {
        // Oops! There is no message even.
        throw body;
      }
      return;
    }

    // Clear alert. Set result field.
    this.setState({ responseToPost: body.result, alert: '' });
  };

  /**
   * Rend App component
   * @returns {*} rendered App component
   */
  render() {
    const {
      number, data, responseToPost, alert, pageCount, showingAlert,
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
            <div className={`alert ${showingAlert ? 'alert-shown' : 'alert-hidden'}`}>
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
