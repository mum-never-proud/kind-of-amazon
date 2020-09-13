require('dotenv').config();

const Express = require('express');

const serverless = require('serverless-http');

const boom = require('express-boom');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cors = require('cors');

const app = new Express();

app.use(cors());
app.use(boom());

app.get('/.netlify/functions/app/create/payment', (req, res) => {
  stripe.paymentIntents.create({
    description: 'Amazon Clone service',
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
  })
    .then((secret) => res.status(200).json(secret))
    .catch((e) => res.boom.badImplementation(e));
});
app.use((_, res) => res.boom.notFound());

module.exports = app;
module.exports.handler = serverless(app);
