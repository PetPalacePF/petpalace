const stripe = require('stripe')('sk_test_51P0rxH2NIYOIQA82xsJIavzHOKKcNHqT3fSJx4NYk5MlMvMfAu47zCpZNwVxMhYeqCsv930ezx5uPmzZmDlFPetW00891Fpxv3');


const getWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_K2KA8t8UhWhZKgWMO2VA9tVXUrb2FYVQ"
    );
    // res.status(200).json({test: "test payment"});
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // event.account is undefined since this is an event from a direct webhook endpoint.
    fulfillOrder(paymentIntent);
  }

  res.json({received: true});
};

module.exports = getWebhooks;
