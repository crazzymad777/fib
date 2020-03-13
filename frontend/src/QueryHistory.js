import React from 'react';
import PropTypes from 'prop-types';
import Query from './Query';

const QueryHistory = ({ data }) => data.map(
  (q) => (
    <Query
      ip={q.ip}
      timestamp={new Date(q.timestamp).toLocaleString()}
      source={q.source}
      result={q.result}
    />
  ),
);

QueryHistory.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default QueryHistory;
