import React from 'react';
import PropTypes from 'prop-types';
import { RiStarFill, RiStarHalfFill } from 'react-icons/ri';

// eslint-disable-next-line max-len
const Ratings = ({ rating }) => Array.from({ length: rating }, (_, index) => <RiStarFill key={index} />)
  .concat(Number.isInteger(rating) ? [] : [<RiStarHalfFill key={rating + 1} />]);

Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Ratings;
