import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/connect.provider";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsAuthenticated, isAuthenticated } =
    useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(!isAuthenticated);
      setUser(response.data);
      toast.success(`Bonjour ${response.data.account.username}`, {
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
    <main>
      <section className="sign-form container">
        <form>
          <div className="input-form">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="input-form">
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="submit-btn">
            <button onClick={handleSubmit}>Se connecter </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
