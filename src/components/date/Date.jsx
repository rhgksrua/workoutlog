import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Date extends Component {
  render() {
    const { year, month, date } = this.props;
    return (
      <div className={'column'}>
        <p>{year} {month + 1} {date}</p>
      </div>
    );
  }
}

Date.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  date: PropTypes.number
};

export default Date;
