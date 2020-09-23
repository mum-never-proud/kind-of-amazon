import React, { useContext } from 'react';
import { ShopContext } from 'contexts/Shop';
import ProductFilter from 'components/ProductFilter';
import ProductList from 'components/ProductList';
import './style.css';

const Home = () => {
  const [{ availableProducts, selectedProducts, filteredProductIds }] = useContext(ShopContext);

  return (
    <div className="home">
      <div className="pr-3 border-right amz-text-sm">
        <ProductFilter />
      </div>
      <div>
        <h3 className="mb-3">Featured Products</h3>
        <ProductList
          availableProducts={filteredProductIds.map((id) => availableProducts[id])}
          selectedProducts={selectedProducts}
        />
      </div>
    </div>
  );
};

export default Home;
