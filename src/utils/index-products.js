const indexProducts = (products) => products.reduce((indexProducts, product) => {
  // eslint-disable-next-line no-param-reassign
  indexProducts[product.sku] = product;

  return indexProducts;
}, {});

export default indexProducts;
