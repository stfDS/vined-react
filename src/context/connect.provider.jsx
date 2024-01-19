import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(res.data);
        setUpdate(true);
      } catch (err) {
        console.log("Error loading ,no User found");
      }
    };
    fetchuser();
  }, [update, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        user,
        setUser,
        update,
        setUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
