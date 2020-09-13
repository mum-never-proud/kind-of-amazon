import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { RiStarFill, RiStarHalfFill, RiRocketLine } from 'react-icons/ri';
import './style.css';

const ProductCard = ({
  variant,
  product,
  availableQuantity,
  selectedQuantity,
  viewOnly,
  shouldDisplayOutOfStockText,
  onAddToCart,
  onProductDecrement,
  onProductIncrement,
}) => {
  const {
    currency,
    price,
    title,
    rating,
    imageUrl,
    isPrimeAvailable,
  } = product;
  const addToCartBtn = (availableQuantity !== 0 && selectedQuantity === 0 && (
    <div className="text-center">
      <Button className="mt-3 amz-button-primary amz-text-xs" onClick={onAddToCart}>
        Add to Cart
      </Button>
    </div>
  ));
  const [dollar, cents] = String(price).split('.');
  const counterBtn = (selectedQuantity !== 0 && (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button
        className="amz-button-primary amz-text-xs"
        onClick={onProductDecrement}
      >
        -
      </Button>
      <span className="pl-2 pr-2">{selectedQuantity}</span>
      <Button
        disabled={!availableQuantity}
        className="amz-button-primary amz-text-xs"
        onClick={onProductIncrement}
      >
        +
      </Button>
    </div>
  ));
  let availablilityWarning = '';

  if (shouldDisplayOutOfStockText) {
    if (availableQuantity <= 0) {
      availablilityWarning = 'Out of Stock';
    } else if (availableQuantity < 5) {
      availablilityWarning = `Only ${availableQuantity} left`;
    }
  }

  return (
    <div className={`product-card ${variant === 'primary' ? '' : 'product-card--secondary'}`}>
      <div className="product-card--title">
        {title}
      </div>
      {
        isPrimeAvailable && (
          <div className="product-card--prime-availablility">
            <RiRocketLine />
            {' '}
            Prime available
          </div>
        )
      }
      <div className="product-card--price">
        {currency}
        {dollar}
        <sup>{cents}</sup>
        {availablilityWarning && (
          <span className="text-danger">
            {' '}
            {availablilityWarning}
          </span>
        )}
      </div>
      <div className="product-card--rating">
        {
          Array.from({ length: rating }, (_, index) => <RiStarFill key={index} />)
            .concat(Number.isInteger(rating) ? [] : [<RiStarHalfFill key={rating + 1} />])
        }
        {' '}
      </div>
      {
        viewOnly && (
          <div className="product-card--quantity">
            Qty:
            {' '}
            {selectedQuantity}
          </div>
        )
      }
      <div className="product-card--image text-center">
        <Image src={imageUrl} />
      </div>
      {
        !viewOnly && (addToCartBtn || counterBtn)
      }
    </div>
  );
};

ProductCard.defaultProps = {
  variant: 'primary',
  viewOnly: false,
  shouldDisplayOutOfStockText: true,
  availableQuantity: null,
  onAddToCart: () => {},
  onProductDecrement: () => {},
  onProductIncrement: () => {},
};

ProductCard.propTypes = {
  viewOnly: PropTypes.bool,
  shouldDisplayOutOfStockText: PropTypes.bool,
  variant: PropTypes.string,
  product: PropTypes.instanceOf(Object).isRequired,
  availableQuantity: PropTypes.number,
  selectedQuantity: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func,
  onProductDecrement: PropTypes.func,
  onProductIncrement: PropTypes.func,
};

export default ProductCard;
