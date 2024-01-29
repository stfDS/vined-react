import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/connect.provider";
import toast from "react-hot-toast";

const Logout = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/logout`,
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      setUser(null);
      toast.success("A bientôt ✌🏼", {
        style: {
          border: "1px solid #2baeb7",
          padding: "10px",
          color: "#2baeb7",
        },
        iconTheme: {
          primary: "#2baeb7",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn-modal" onClick={handleLogout}>
      Déconnexion
    </button>
  );
};

export default Logout;
