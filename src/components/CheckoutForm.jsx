import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

// const CheckoutForm = ({ title, price }) => {
//   console.log({ title, price });

const CheckoutForm = () => {
  // permet de recup des infos dans cardElement
  const elements = useElements();

  //permet de faire un requête à stripe avc les num de la carte
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //recup des infos dans cardElement
      const cardElement = elements.getElement(CardElement);

      //requête à stripe avc les num de la carte pour la verifier
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "itsumi mario",
      });

      const stripeToken = stripeResponse.token.id;

      // requête au backend

      const responseBack = await axios.post(
        `http://localhost:3005/payment`,
        {
          token: stripeToken,
          title: "Joker",
          amount: 2000,
        },
        {
          withCredentials: true,
        }
      );

      console.log(responseBack.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
        <h3>Résumé de la comande</h3>
        <CardElement />
        <button onClick={handleSubmit} type="submit">
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
