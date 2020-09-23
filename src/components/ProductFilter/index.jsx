import React, { useContext } from 'react';
import { ShopContext } from 'contexts/Shop';
import { addFilter, clearFilter } from 'actions/shop';
import Button from 'react-bootstrap/Button';
import Ratings from 'components/commons/Ratings';
import priceFilter from 'constants/price-filter';
import './style.css';

const ProductFilter = () => {
  const [{ filters }, dispatch] = useContext(ShopContext);
  const clearFilterHandler = (filterName) => clearFilter(dispatch)(filterName);
  const primeHandler = (e) => {
    if (e.target.checked) {
      addFilter(dispatch)({ prime: e.target.checked });
    } else {
      clearFilterHandler('prime');
    }
  };

  return (
    <>
      <div>
        <div className="font-weight-bold d-flex justify-content-between align-items-center">
          <span>Ratings</span>
          {
            filters.ratings
            && (
            <Button
              variant="link amz-text-xs p-0"
              onClick={() => clearFilterHandler('ratings')}
            >
              Clear
            </Button>
            )
          }
        </div>
        <ul className="list-unstyled ratings d-flex flex-column-reverse">
          {
            Array.from({ length: 4 }, (_, index) => (
              <li
                key={index}
                onClick={() => addFilter(dispatch)({ ratings: index + 1 })}
                className={`${filters.ratings - 1 === index ? 'active' : ''}`}
                role="presentation"
              >
                <Ratings rating={index + 1} />
                {' '}
                <span>& Up</span>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="mt-3">
        <div className="font-weight-bold d-flex justify-content-between align-items-center">
          <span>Price</span>
          {
            filters.price
            && (
            <Button
              variant="link amz-text-xs p-0"
              onClick={() => clearFilterHandler('price')}
            >
              Clear
            </Button>
            )
          }
        </div>
        <ul className="list-unstyled price">
          {
            priceFilter.map((price) => (
              <li
                key={price.id}
                onClick={() => addFilter(dispatch)({ price })}
                className={`${filters.price?.id === price.id ? 'active' : ''}`}
                role="presentation"
              >
                {price.displayName}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="mt-3">
        <div className="font-weight-bold d-flex justify-content-between align-items-center">
          <span>Amazon prime</span>
          {
            filters.prime !== undefined
            && (
            <Button
              variant="link amz-text-xs p-0"
              onClick={() => clearFilterHandler('prime')}
            >
              Clear
            </Button>
            )
          }
        </div>
        <input
          type="checkbox"
          className="align-middle"
          checked={filters.prime || false}
          onChange={primeHandler}
        />
        {' '}
        <span className="ml-1">Prime</span>
      </div>
    </>
  );
};

export default ProductFilter;
