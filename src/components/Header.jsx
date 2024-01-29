/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link } from "react-router-dom";

import ModalLogin from "./ModalLogin";
import ModalSigup from "./ModalSignup";
import Logout from "./Logout";
import { AuthContext } from "../context/connect.provider";

const Header = () => {
  const { isAuthenticated, setSearch } = useContext(AuthContext);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      console.log(event.target.value);
    }
  };
  const handleChange = (event) => {
    if (event.target.value === "") {
      setSearch();
    }
  };

  return (
    <header>
      <div className="top container">
        <Link to="/" className="logotop">
          <img
            src="https://static.vinted.com/assets/web-logo/default/logo.svg"
            alt="logo vinted"
          />
        </Link>
        <div className="serch">
          <input
            id="searchbar"
            type="search"
            placeholder="Recherche des articles"
            onKeyDown={handleSearch}
            onChange={handleChange}
          />
        </div>
        {isAuthenticated ? (
          <div className="deco-acount">
            <Logout />
          </div>
        ) : (
          <div className="acount">
            <ModalLogin />
            <ModalSigup />
          </div>
        )}

        <Link to="/publish" className="sell">
          <button>vend tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
