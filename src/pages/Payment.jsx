/* eslint-disable react/no-unescaped-entities */
import { Elements } from "@stripe/react-stripe-js";

import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import ProductPayment from "../components/ProductPayement";

const Payment = () => {
  const location = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51OCPH5IMJdB7H12yLYJMMdw3Gkh4v6L2mBdwroQEMfxpLU7cXqFAtFkr6djCEp0lftD1CUUE28kvavwgHvjLaCaG00WWYmQ1WE"
  );

  const {
    productName,
    totalPrice,
    protectionFees,
    shippingFees,
    price,
    username,
  } = location.state;

  return (
    <div className="container">
      <div className="payment-container">
        <ProductPayment
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
          username={username}
        />
        <div className="payment-card">
          <div className="payment-card-content">
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir
              {productName} Vous allez payer {totalPrice} € (frais de protection
              et frais de port inclus).
            </p>

            <div className="payment-input" />
            <Elements stripe={stripePromise}>
              <CheckoutForm productName={productName} totalPrice={totalPrice} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
