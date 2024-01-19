import { useEffect, useState } from "react";
import axios from "axios";
import HomeOffers from "../components/HomeOffers";

import HomeHero from "../components/HomeHero";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/offers`,
          {
            withCredentials: false,
          }
        );
        console.log(response);
        setData(response.data);
        setIsLoading(!isLoading);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <h1>Is Loading</h1>
  ) : (
    <main>
      <section className="home-hero">
        <HomeHero />
      </section>
      <section className="container home-offer-container">
        <HomeOffers data={data} />
      </section>
    </main>
  );
};

export default Home;
