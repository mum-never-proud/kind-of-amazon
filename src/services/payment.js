const fetchPaymentToken = (paymentData) => new Promise((resolve, reject) => {
  /* kinda lazy to add environment check
   * if you wanna test out serverless function, use http://localhost:8888
   * instead of https://amz-clone.netlify.app
   */
  fetch('https://amz-clone.netlify.app/.netlify/functions/app/create/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  })
    .then((res) => resolve(res.json()))
    .catch(() => reject(new Error('Error fetching payment token')));
});

export default fetchPaymentToken;
