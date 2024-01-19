import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/connect.provider";

const Logout = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/logout`,
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      setUser(null);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn-modal" onClick={handleLogout}>
      Déconnection
    </button>
  );
};

export default Logout;
