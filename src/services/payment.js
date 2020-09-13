const fetchPaymentToken = () => new Promise((resolve, reject) => {
  fetch('https://amz-clone.netlify.app/.netlify/functions/app/create/payment')
    .then((res) => resolve(res.json()))
    .catch(() => reject(new Error('Error fetching payment token')));
});

export default fetchPaymentToken;
