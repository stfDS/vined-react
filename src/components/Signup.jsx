/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [preview, setPreview] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", avatar);
    formData.append("newsletter", newsletter);
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/signup`,
        formData,
        {
          withCredentials: false,
        }
      );
      toast.success("création de compte terminé", {
        style: {
          border: "1px solid #2baeb7",
          padding: "10px",
          color: "#2baeb7",
        },
        iconTheme: {
          primary: "#2baeb7",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section className="sign-form container">
        <form>
          <div className="input-form">
            <label className="avatar-label" htmlFor="avatar">
              Choisissez une photo de profil
            </label>
            {!preview ? (
              <div className="input-form">
                <p>Aucun fichier sélectionné pour le moment</p>
              </div>
            ) : (
              <div className="input-form-avatar">
                <img src={preview} alt="pré-visualisation" />
              </div>
            )}
            <input
              id="avatar"
              type="file"
              name="avatar"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
                setPreview(URL.createObjectURL(event.target.files[0]));
              }}
            />
          </div>

          <div className="input-form">
            <input
              id="username"
              type="text"
              placeholder="Nom d'utilisateur"
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="input-form">
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
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
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="newsletter">
            <input
              type="checkbox"
              id="newsletter"
              checked={newsletter}
              name="newsletter"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <div className="submit-btn">
            <button onClick={handleSubmit}>S'inscrire</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Signup;
