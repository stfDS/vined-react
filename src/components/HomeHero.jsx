import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <div className="home-in-hero">
      <div>
        <h1>Prêts à faire du tri dans vos placards ?</h1>
      </div>

      <Link to="/publish" className="in-hero-btn">
        <button>Commencer à vendre</button>
      </Link>
    </div>
  );
};

export default HomeHero;
