import PropTypes from "prop-types";
const ProductPayment = ({
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}) => {
  return (
    <div className="payment-card">
      <div>
        <h2>Résumé de la commande</h2>
      </div>
      <div>
        <ul>
          <li>
            Commande <span>{price} €</span>
          </li>
          <li>
            Frais protection acheteurs <span>{protectionFees} €</span>
          </li>
          <li>
            Frais de port <span>{shippingFees} €</span>
          </li>
        </ul>
      </div>
      <div className="divider" />
      <div className="content">
        <ul>
          <li>
            Total <span>{totalPrice} €</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductPayment;

ProductPayment.propTypes = {
  price: PropTypes.number.isRequired,
  protectionFees: PropTypes.number.isRequired,
  shippingFees: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
