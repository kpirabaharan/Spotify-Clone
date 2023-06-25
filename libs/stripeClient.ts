import { loadStripe, Stripe } from '@stripe/stripe-js';

/*
 * loadStripe = This function returns a Promise that resolves with a newly
 * created Stripe object once Stripe.js has loaded
 */

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
    );
  }

  return stripePromise;
};
