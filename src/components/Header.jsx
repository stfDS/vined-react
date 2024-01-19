/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link } from "react-router-dom";

import ModalLogin from "./ModalLogin";
import ModalSigup from "./ModalSignup";
import Logout from "./Logout";
import { AuthContext } from "../context/connect.provider";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

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
          <input type="text" placeholder="Recherche des articles" />
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
