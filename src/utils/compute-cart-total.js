const computeCartTotal = (selectedProducts, availableProducts) => Object.keys(selectedProducts)
  .reduce((total, sku) => total + selectedProducts[sku] * availableProducts[sku].price, 0);

export default computeCartTotal;
