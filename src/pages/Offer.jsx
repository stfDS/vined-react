import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ModalLogin from "../components/ModalLogin";
import { AuthContext } from "../context/connect.provider";

const Offer = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [dataOffer, setDataOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/offer/${id}`,
          {
            withCredentials: false,
          }
        );
        setDataOffer(response.data);
        setTitle(response.data.product_name);
        setPrice(response.data.product_price);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <h1>Is Loading</h1>
  ) : (
    <main className="offer-page">
      <section className="offer-page-container container">
        <div className="offer-page-pic-1">
          <img src={dataOffer.product_image.secure_url} alt="" />
        </div>
        <div className="offer-page-info">
          <div>
            <p>{dataOffer.product_price} €</p>
            {dataOffer.product_details.map((detail) => {
              const keysToFind = Object.keys(detail);
              // console.log(keysToFind);
              const key = keysToFind[0];
              return (
                <ul key={key}>
                  <li>
                    <span className="span-left">{key}</span>
                    <span className="span-right">{detail[key]}</span>
                  </li>
                </ul>
              );
            })}
          </div>
          {/* <div><p>avatar a ajouter</p></div> */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/payment", {
                  state: {
                    productName: title,
                    totalPrice: total,
                    protectionFees: protectionFees,
                    shippingFees: shippingFees,
                    price: price,
                  },
                });
              }}
            >
              Acheter
            </button>
          ) : (
            <ModalLogin />
          )}
        </div>
      </section>
    </main>
  );
};

export default Offer;
