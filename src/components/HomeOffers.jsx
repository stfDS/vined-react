import { Link } from "react-router-dom";
const HomeOffers = ({ data }) => {
  return data.offers.map((offer) => {
    return (
      <Link to={`/offer/${offer._id}`} key={offer._id} className="home-offer">
        <article>
          <div className="home-avatar-pic" key={offer.owner.account.username}>
            {offer.owner.account.avatar && (
              <img src={offer.owner.account.avatar} alt="" />
            )}
            <span>{offer.owner.account.username}</span>
          </div>
          <div
            className="home-offer-pic"
            key={offer.product_pictures[0].asset_id}
          >
            {offer.product_pictures[0].secure_url && (
              <img src={offer.product_pictures[0].secure_url} alt="" />
            )}
          </div>
          <div className="home-product-price">
            <span>{offer.product_price} €</span>
            <span>{offer.product_details[1].TAILLE}</span>
            <span>{offer.product_details[0].MARQUE}</span>
          </div>
        </article>
      </Link>
    );
  });
};

export default HomeOffers;
