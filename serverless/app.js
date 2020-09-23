require('dotenv').config();

const Express = require('express');

const serverless = require('serverless-http');

const bodyParser = require('body-parser');

const boom = require('express-boom');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  // to avoid giving up for intermittent connectivity issues with stripe servers
  maxNetworkRetries: 2,
});

const cors = require('cors');

const app = new Express();

const createPaymentValidator = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.boom.badRequest();
  }

  return next();
};

app.use(cors());
app.use(boom());
app.use(bodyParser.json());

app.post('/.netlify/functions/app/create/payment', createPaymentValidator, (req, res) => {
  const { name, price } = req.body;

  stripe.paymentIntents.create({
    description: 'Amazon Clone service',
    shipping: {
      name,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: Math.floor(price * 100),
    currency: 'usd',
    payment_method_types: ['card'],
  })
    .then((secret) => res.status(200).json(secret))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);

      res.boom.badImplementation(e);
    });
});
app.use((_, res) => res.boom.notFound());

module.exports = app;
module.exports.handler = serverless(app);
