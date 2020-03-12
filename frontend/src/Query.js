import React from 'react';
import PropTypes from 'prop-types';

const Query = ({
  ip, timestamp, source, result,
}) => (
  <div className="query">
    <p className="alpha">
            IP:
      {ip}
    </p>
    <p className="beta">
            Timestamp:
      {timestamp}
    </p>
    <p className="gamma">
            Index:
      {source}
    </p>
    <p className="delta">
            Result:
      {result}
    </p>
  </div>
);


Query.propTypes = {
  ip: PropTypes.string,
  timestamp: PropTypes.string,
  source: PropTypes.number,
  result: PropTypes.number,
};

Query.defaultProps = {
  ip: '::1',
  timestamp: '1970-01-01',
  source: 1,
  result: 1,
};

export default Query;
