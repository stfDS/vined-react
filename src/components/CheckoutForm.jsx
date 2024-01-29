/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/connect.provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// const CheckoutForm = ({ title, price }) => {
//   console.log({ title, price });

const CheckoutForm = ({ productName, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);
  const cardElementOptions = {
    hidePostalCode: true, // This will hide the postal code field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //recupère les infos dans cardElement
      const cardElement = elements.getElement(CardElement);

      //requête à stripe avc les num de la carte pour la verifier
      const stripeResponse = await stripe.createToken(cardElement, {
        name: user._id,
      });

      // requête au backend

      const responseBack = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payment`,
        {
          amount: totalPrice,
          title: productName,
          token: stripeResponse.token.id,
        },
        {
          withCredentials: true,
        }
      );

      if (responseBack.data) {
        toast.success("Payement reussi", {
          style: {
            border: "1px solid #2baeb7",
            padding: "10px",
            color: "#2baeb7",
          },
          iconTheme: {
            primary: "#2baeb7",
          },
        });
        setPaid(true);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !paid ? (
    <div className="payment-form">
      <ul>
        <li>Numéro de carte test : 4242 4242 4242 4242</li>
        <li>Date : 0424</li>
        <li>CVC : 242 </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <CardElement options={cardElementOptions} />
        <div className="payment-form-btn">
          <button type="submit" disabled={!stripe}>
            Payer
          </button>
        </div>
      </form>
    </div>
  ) : (
    <p>Merci pour votre achat.</p>
  );
};

export default CheckoutForm;
