import React from 'react';
import PropTypes from 'prop-types';

const CurrencyFormatter = ({ currency, price }) => {
  const [integer, decimal] = price.split('.');

  return (
    <>
      {currency}
      {integer}
      {+decimal !== 0 && (<sup>{decimal}</sup>)}
    </>
  );
};

CurrencyFormatter.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default CurrencyFormatter;
