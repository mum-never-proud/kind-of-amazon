export default {
  ratings: (ratings, product) => product.rating >= ratings,
  // eslint-disable-next-line max-len
  price: ({ lowerBound, upperBound }, product) => product.price > lowerBound && product.price < upperBound,
  prime: (isPrimeChecked, product) => product.isPrimeAvailable === isPrimeChecked,
};
