import { useContext, useEffect, useState } from "react";
import axios from "axios";
import HomeOffers from "../components/HomeOffers";

import HomeHero from "../components/HomeHero";
import { AuthContext } from "../context/connect.provider";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${
              import.meta.env.VITE_APP_BASE_URL
            }/offers?title=${search}&skip=${skip}`,
            {
              withCredentials: false,
            }
          );
          setCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/offers?skip=${skip}`,
            {
              withCredentials: false,
            }
          );
          setCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [search, skip]);

  const handleNextClick = () => {
    if (skip + 10 < count) {
      setSkip(skip + 10);
    }
  };

  const handlePreviousClick = () => {
    if (skip > 0) {
      setSkip(Math.max(0, skip - 10));
    }
  };

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
      <div className="paging">
        {skip > 0 && (
          <button onClick={handlePreviousClick}>Page précédente</button>
        )}
        {skip + 10 < count && (
          <button onClick={handleNextClick}>Page Suivante</button>
        )}
      </div>
    </main>
  );
};

export default Home;
