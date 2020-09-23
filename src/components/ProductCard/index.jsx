import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiStarFill, RiStarHalfFill, RiRocketLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import CurrencyFormatter from 'components/commons/CurrencyFormatter';
import './style.css';

const ProductCard = ({
  variant,
  product,
  selectedQuantity,
  viewOnly,
  shouldDisplayOutOfStockText,
  onAddToCart,
  onProductDecrement,
  onProductIncrement,
}) => {
  const {
    availableQuantity,
    currency,
    price,
    title,
    rating,
    imageUrl,
    isPrimeAvailable,
  } = product;
  const addToCartBtn = (availableQuantity !== 0 && selectedQuantity === 0 && (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button className="amz-button--primary amz-text-sm" onClick={onAddToCart}>
        Add to Cart
      </Button>
    </div>
  ));
  const [isImageLoading, setIsImageLoading] = useState(true);
  const counterBtn = (selectedQuantity !== 0 && (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button
        className="amz-button--primary amz-text-sm"
        onClick={onProductDecrement}
      >
        -
      </Button>
      <span className="pl-2 pr-2">{selectedQuantity}</span>
      <Button
        disabled={!availableQuantity}
        className="amz-button--primary amz-text-sm"
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
          <div className="product-card--prime-availablility d-flex align-items-center">
            <RiRocketLine />
            <span className="ml-1">Prime available</span>
          </div>
        )
      }
      <div className="product-card--price">
        <CurrencyFormatter currency={currency} price={price} />
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
      <div className="product-card--image text-center d-flex align-items-center justify-content-center">
        <Image
          className={`${isImageLoading ? 'd-none' : 'd-block'}`}
          src={imageUrl}
          alt={title}
          onLoad={() => setIsImageLoading(false)}
        />
        {isImageLoading && <Spinner animation="border" />}
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
  onAddToCart: () => {},
  onProductDecrement: () => {},
  onProductIncrement: () => {},
};

ProductCard.propTypes = {
  viewOnly: PropTypes.bool,
  shouldDisplayOutOfStockText: PropTypes.bool,
  variant: PropTypes.string,
  product: PropTypes.instanceOf(Object).isRequired,
  selectedQuantity: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func,
  onProductDecrement: PropTypes.func,
  onProductIncrement: PropTypes.func,
};

export default ProductCard;
